/**
 * The daily outdated-dependencies check (`.github/workflows/outdated.yml`): reads the JSON of
 * `pnpm outdated --format json` (the direct dependencies, and the pnpm version of `packageManager`)
 * from standard input, writes a Markdown summary to the file named by `GITHUB_STEP_SUMMARY` (or to
 * standard output without it), and exits with 1 when the check fails, 0 when it passes.
 *
 * A dependency with a newer version fails the check, unless `held-back.json` holds it back: each
 * entry names a package, why it stays on its version (`reason`) and the day to look at it again
 * (`recheck`, `YYYY-MM-DD`). A held-back package passes and is listed in the summary; its entry
 * fails the check once its recheck day has passed, so it is revisited, or once the package is up to
 * date, so no stale entry stays. A hold keeps a package off its next breaking release only: a newer
 * release semver keeps compatible with its version (`^current`, its line: the same major, or the
 * same minor below 1.0; looked up with `pnpm view`, whatever range `package.json` gives it) still
 * fails the check.
 *
 * Two entries follow the Node line CI runs (`.node-version`) rather than the newest release: `node`
 * itself (pnpm reports `devEngines`' minimum, which every Node release outdates), and `@types/node`,
 * outdated when its major isn't that line's, or when a newer release of that line exists.
 *
 * Run with Node's type stripping, pnpm on the path:
 * `pnpm outdated --format json | node scripts/dependencies/outdated.ts`.
 * @module
 */
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';

/** One entry of `pnpm outdated --format json`: the installed version and the newest release. */
export interface OutdatedEntry {
	current: string;
	latest: string;
	dependencyType: string;
}

/**
 * The entries of `pnpm outdated --format json` output (`text`; empty when nothing is outdated),
 * checked: each package has a `current` and a `latest` version.
 *
 * @throws When the text isn't such an object, as when pnpm writes its own failure as JSON.
 */
export function parseOutdated(text: string): Record<string, OutdatedEntry> {
	if (text.trim() === '') return {};
	const json: unknown = JSON.parse(text);
	if (typeof json !== 'object' || json === null || Array.isArray(json)) {
		throw new Error(`pnpm outdated wrote no list of packages: ${text}`);
	}
	for (const [name, entry] of Object.entries(json)) {
		const { current, latest } = (entry ?? {}) as Partial<OutdatedEntry>;
		if (typeof current !== 'string' || typeof latest !== 'string') {
			throw new Error(`pnpm outdated wrote no versions for ${name}: ${text}`);
		}
	}
	return json as Record<string, OutdatedEntry>;
}

/** The major version of a version string, such as 24 for `24.19.2`. */
function major(version: string): number {
	return Number.parseInt(version, 10);
}

/**
 * The newest release in the output of `pnpm view <package>@<range> version --json` (`text`): the
 * one version pnpm gives for a range (a list is read as releases in order, its last the newest).
 *
 * @throws When it holds no `major.minor.patch` version, as when pnpm writes its own failure as JSON.
 */
export function newestRelease(text: string): string {
	const json: unknown = text.trim() === '' ? undefined : JSON.parse(text);
	const newest = [json].flat().at(-1);
	if (typeof newest !== 'string' || !/^\d+\.\d+\.\d+$/.test(newest)) {
		throw new Error(`pnpm view wrote no version: ${text}`);
	}
	return newest;
}

/**
 * The newest release of `name` in the semver `range` (such as `^6.0.3`), from the registry.
 *
 * @throws When pnpm fails, or writes no version.
 */
const newestInRange: NewestInRange = (name, range) =>
	newestRelease(
		execFileSync('pnpm', ['view', `${name}@${range}`, 'version', '--json'], { encoding: 'utf8' })
	);

/**
 * Whether release `a` (`major.minor.patch`) comes after release `b`, part by part as numbers.
 *
 * @throws When either isn't a `major.minor.patch` version, so a bad input never reads as "not newer".
 */
function isNewer(a: string, b: string): boolean {
	const [left, right] = [a, b].map((version) => {
		if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`Not a release version: ${version}`);
		return version.split('.').map(Number);
	});
	for (let part = 0; part < 3; part++) {
		if (left[part] !== right[part]) return left[part] > right[part];
	}
	return false;
}

/**
 * The entries of `outdated` that are really outdated for a project on Node `nodeMajor`: without
 * `node` (the runtime is `.node-version`'s, not a dependency), and with `@types/node` when its
 * major isn't `nodeMajor` (its newer majors describe a Node the project doesn't run), or when
 * `typesNodeLineLatest`, the newest release of that major, is newer than the locked one.
 *
 * @throws When `typesNodeLineLatest`, or the locked `@types/node` of the Node line, isn't a
 * `major.minor.patch` version.
 */
export function outdatedOnNode(
	outdated: Record<string, OutdatedEntry>,
	nodeMajor: number,
	typesNodeLineLatest?: string
): Record<string, OutdatedEntry> {
	return Object.fromEntries(
		Object.entries(outdated).flatMap(([name, entry]): [string, OutdatedEntry][] => {
			if (name === 'node') return [];
			if (name !== '@types/node' || major(entry.current) !== nodeMajor) return [[name, entry]];
			return typesNodeLineLatest && isNewer(typesNodeLineLatest, entry.current)
				? [[name, { ...entry, latest: typesNodeLineLatest }]]
				: [];
		})
	);
}

/** Why a package stays on its version, and the day (`YYYY-MM-DD`) to look at it again. */
export interface HeldBack {
	reason: string;
	recheck: string;
}

/**
 * The entries of `held-back.json`, checked: each package names a non-empty `reason` and a real
 * `recheck` day.
 *
 * @throws When the file isn't an object of such entries.
 */
export function parseHeldBack(json: unknown): Record<string, HeldBack> {
	if (typeof json !== 'object' || json === null || Array.isArray(json)) {
		throw new Error('held-back.json is not an object of packages');
	}
	for (const [name, entry] of Object.entries(json)) {
		const { reason, recheck } = (entry ?? {}) as Partial<HeldBack>;
		if (typeof reason !== 'string' || reason.trim() === '') {
			throw new Error(`held-back.json: ${name} has no reason`);
		}
		const date = new Date(`${String(recheck)}T00:00:00Z`);
		// A real day only: an invalid date has no time, and a rolled-over one (the 31st of November)
		// reads back as another day.
		const real =
			typeof recheck === 'string' &&
			/^\d{4}-\d{2}-\d{2}$/.test(recheck) &&
			!Number.isNaN(date.getTime()) &&
			date.toISOString().slice(0, 10) === recheck;
		if (!real) throw new Error(`held-back.json: ${name} has no recheck day (YYYY-MM-DD)`);
	}
	return json as Record<string, HeldBack>;
}

/** One outdated dependency, and the entry that holds it back when there is one. */
interface Row {
	name: string;
	entry: OutdatedEntry;
	hold?: HeldBack;
}

/** What the check found: what fails it, and the packages it lets pass. */
export interface Verdict {
	/** Outdated and not held back: they fail the check. */
	outdated: Row[];
	/** Outdated and held back until a recheck day still to come: they pass. */
	heldBack: Row[];
	/** Held back, but the recheck day has passed: they fail until the entry is revisited. */
	recheckDue: Row[];
	/** Held back, but up to date: their stale entries fail until removed. */
	stale: string[];
}

/** Looks up the newest release of a package in a semver range, such as `^6.0.3`. */
export type NewestInRange = (name: string, range: string) => string;

/**
 * The newest release of each held-back package's line (`^current`, what semver keeps compatible
 * with its version: the same major, or the same minor below 1.0), by package, for the held-back
 * packages `outdated` lists.
 */
export function lineLatestOf(
	outdated: Record<string, OutdatedEntry>,
	heldBack: Record<string, HeldBack>,
	newestIn: NewestInRange
): Record<string, string> {
	return Object.fromEntries(
		Object.keys(heldBack)
			.filter((name) => Object.hasOwn(outdated, name))
			.map((name) => [name, newestIn(name, `^${outdated[name].current}`)])
	);
}

/**
 * The newest `@types/node` of Node line `nodeMajor` (`^<nodeMajor>.0.0`), when `reported` lists the
 * package on that line; nothing to look up otherwise.
 */
export function typesNodeLineLatest(
	reported: Record<string, OutdatedEntry>,
	nodeMajor: number,
	newestIn: NewestInRange
): string | undefined {
	const typesNode = Object.hasOwn(reported, '@types/node') ? reported['@types/node'] : undefined;
	return typesNode && major(typesNode.current) === nodeMajor
		? newestIn('@types/node', `^${nodeMajor}.0.0`)
		: undefined;
}

/**
 * Sorts `outdated` (`pnpm outdated`) against `heldBack` on `today` (`YYYY-MM-DD`, a UTC day): a
 * held-back package passes until the day after its recheck day, and only while the newest release
 * of its line (`lineLatest`, by package: the newest in `^current`, what semver keeps compatible)
 * isn't newer than its version: a patch of the held major (or of the held minor, below 1.0) is
 * outdated as usual.
 *
 * @throws When a held-back package's version or line release isn't a `major.minor.patch` version.
 */
export function judge(
	outdated: Record<string, OutdatedEntry>,
	lineLatest: Record<string, string>,
	heldBack: Record<string, HeldBack>,
	today: string
): Verdict {
	const rows = Object.keys(outdated)
		.sort()
		.map((name): Row => {
			const entry = outdated[name];
			const hold = Object.hasOwn(heldBack, name) ? heldBack[name] : undefined;
			// The hold keeps the package off its next breaking release, not off newer ones in ^current.
			const line = Object.hasOwn(lineLatest, name) ? lineLatest[name] : undefined;
			if (hold && line && isNewer(line, entry.current)) {
				return { name, entry: { ...entry, latest: line } };
			}
			return { name, entry, hold };
		});
	return {
		outdated: rows.filter((row) => !row.hold),
		heldBack: rows.filter((row) => row.hold && row.hold.recheck >= today),
		recheckDue: rows.filter((row) => row.hold && row.hold.recheck < today),
		stale: Object.keys(heldBack)
			.filter((name) => !Object.hasOwn(outdated, name))
			.sort()
	};
}

/** Whether `verdict` fails the check. */
export function fails(verdict: Verdict): boolean {
	return verdict.outdated.length + verdict.recheckDue.length + verdict.stale.length > 0;
}

/** The Markdown table of `rows`, with each one's hold when `withHold`. */
function table(rows: Row[], withHold: boolean): string[] {
	const head = withHold
		? ['| Package | Current | Latest | Reason | Recheck |', '| --- | --- | --- | --- | --- |']
		: ['| Package | Current | Latest | Type |', '| --- | --- | --- | --- |'];
	return [
		...head,
		...rows.map(({ name, entry, hold }) =>
			withHold && hold
				? `| \`${name}\` | ${entry.current} | ${entry.latest} | ${hold.reason.replaceAll('|', '\\|').replaceAll(/\s+/g, ' ')} | ${hold.recheck} |`
				: `| \`${name}\` | ${entry.current} | ${entry.latest} | ${entry.dependencyType} |`
		)
	];
}

/**
 * The Markdown summary of `verdict`: what fails the check, then the held-back packages.
 *
 * @example summarize(judge({}, {}, {}, '2026-11-21')) // '## Outdated dependencies\n\nEvery direct dependency is up to date.\n'
 */
export function summarize(verdict: Verdict): string {
	const { outdated, heldBack, recheckDue, stale } = verdict;
	const lines = ['## Outdated dependencies', ''];
	if (!fails(verdict) && heldBack.length === 0) {
		lines.push('Every direct dependency is up to date.');
	}
	if (outdated.length > 0) {
		const count = outdated.length === 1 ? 'dependency has' : 'dependencies have';
		lines.push(
			`${outdated.length} direct ${count} a newer version:`,
			'',
			...table(outdated, false),
			''
		);
	}
	if (recheckDue.length > 0) {
		lines.push(
			'Held back past their recheck day: update them, or give a new reason and day in `scripts/dependencies/held-back.json`:',
			'',
			...table(recheckDue, true),
			''
		);
	}
	if (stale.length > 0) {
		lines.push(
			'Held back but up to date: remove their entries from `scripts/dependencies/held-back.json`:',
			'',
			...stale.map((name) => `- \`${name}\``),
			''
		);
	}
	if (heldBack.length > 0) {
		lines.push('Held back on purpose:', '', ...table(heldBack, true), '');
	}
	return `${lines.join('\n').trimEnd()}\n`;
}

// Run as a script, not when the test imports it.
if (import.meta.main) {
	const nodeMajor = major(readFileSync(new URL('../../.node-version', import.meta.url), 'utf8'));
	const reported = parseOutdated(readFileSync(0, 'utf8'));
	const outdated = outdatedOnNode(
		reported,
		nodeMajor,
		typesNodeLineLatest(reported, nodeMajor, newestInRange)
	);
	const heldBack = parseHeldBack(
		JSON.parse(readFileSync(new URL('./held-back.json', import.meta.url), 'utf8'))
	);
	const lineLatest = lineLatestOf(outdated, heldBack, newestInRange);
	const verdict = judge(outdated, lineLatest, heldBack, new Date().toISOString().slice(0, 10));
	const markdown = summarize(verdict);
	const summaryFile = process.env.GITHUB_STEP_SUMMARY;
	if (summaryFile) appendFileSync(summaryFile, markdown);
	else process.stdout.write(markdown);
	process.exitCode = fails(verdict) ? 1 : 0;
}
