/**
 * The daily outdated-dependencies check (`.github/workflows/outdated.yml`): reads the JSON of
 * `pnpm outdated --format json` (the direct dependencies, and the pnpm version of `packageManager`)
 * from standard input, writes a Markdown table of every one with a newer version to the file named
 * by `GITHUB_STEP_SUMMARY` (or to standard output without it), and exits with 1 when there is any,
 * 0 when everything is up to date. Two entries follow the Node line CI runs (`.node-version`) rather
 * than the newest release: `node` itself (pnpm reports `devEngines`' minimum, which every Node
 * release outdates), and `@types/node`, outdated when its major isn't that line's, or when a newer
 * release of that line exists: the workflow looks it up and passes it as `TYPES_NODE_LINE_LATEST`.
 * Run with Node's type stripping:
 * `pnpm outdated --format json | node scripts/dependencies/outdated.ts`.
 * @module
 */
import { appendFileSync, readFileSync } from 'node:fs';

/** One entry of `pnpm outdated --format json`. */
export interface OutdatedEntry {
	current: string;
	latest: string;
	dependencyType: string;
}

/** The major version of a version string, such as 24 for `24.19.2`. */
function major(version: string): number {
	return Number.parseInt(version, 10);
}

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

/**
 * The Markdown summary of `outdated` (package name to entry), sorted by name, and how many
 * dependencies it lists.
 *
 * @example summarize({}) // { count: 0, markdown: '…every direct dependency is up to date.\n' }
 */
export function summarize(outdated: Record<string, OutdatedEntry>): {
	count: number;
	markdown: string;
} {
	const names = Object.keys(outdated).sort();
	if (names.length === 0) {
		return {
			count: 0,
			markdown: '## Outdated dependencies\n\nEvery direct dependency is up to date.\n'
		};
	}
	const rows = names.map((name) => {
		const { current, latest, dependencyType } = outdated[name];
		return `| \`${name}\` | ${current} | ${latest} | ${dependencyType} |`;
	});
	return {
		count: names.length,
		markdown: [
			'## Outdated dependencies',
			'',
			`${names.length} direct ${names.length === 1 ? 'dependency has' : 'dependencies have'} a newer version:`,
			'',
			'| Package | Current | Latest | Type |',
			'| --- | --- | --- | --- |',
			...rows,
			''
		].join('\n')
	};
}

// Run as a script, not when the test imports it.
if (import.meta.main) {
	const input = readFileSync(0, 'utf8').trim();
	// pnpm writes nothing at all when every dependency is up to date.
	const nodeMajor = major(readFileSync(new URL('../../.node-version', import.meta.url), 'utf8'));
	const { count, markdown } = summarize(
		outdatedOnNode(input ? JSON.parse(input) : {}, nodeMajor, process.env.TYPES_NODE_LINE_LATEST)
	);
	const summaryFile = process.env.GITHUB_STEP_SUMMARY;
	if (summaryFile) appendFileSync(summaryFile, markdown);
	else process.stdout.write(markdown);
	process.exitCode = count > 0 ? 1 : 0;
}
