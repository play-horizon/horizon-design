/**
 * Tests of the outdated-dependencies check: the Node runtime and `@types/node` follow the project's
 * Node line; held-back packages pass until their recheck day, and only while their line (`^current`)
 * has nothing newer, and stale or overdue entries fail; pnpm's output and `held-back.json` are
 * checked; the summary lists what fails and what is held back.
 * @module
 */
import { describe, expect, it } from 'vitest';
import {
	fails,
	judge,
	lineLatestOf,
	newestRelease,
	outdatedOnNode,
	parseHeldBack,
	parseOutdated,
	summarize,
	typesNodeLineLatest
} from './outdated.ts';

const dev = 'devDependencies';
const typescript = { current: '6.0.3', latest: '7.0.2', dependencyType: dev };
const vitest = { current: '5.1.0', latest: '5.1.1', dependencyType: dev };
const hold = { reason: 'SvelteKit needs TypeScript 6', recheck: '2026-12-21' };

describe('judge', () => {
	it('fails on an outdated package that is not held back', () => {
		const verdict = judge({ typescript, vitest }, {}, { typescript: hold }, '2026-11-21');
		expect(verdict.outdated.map((row) => row.name)).toEqual(['vitest']);
		expect(verdict.heldBack.map((row) => row.name)).toEqual(['typescript']);
		expect(fails(verdict)).toBe(true);
	});

	it('passes on a held-back package until its recheck day, included', () => {
		expect(fails(judge({ typescript }, {}, { typescript: hold }, '2026-12-21'))).toBe(false);
		const overdue = judge({ typescript }, {}, { typescript: hold }, '2026-12-22');
		expect(overdue.recheckDue.map((row) => row.name)).toEqual(['typescript']);
		expect(overdue.heldBack).toEqual([]);
		expect(fails(overdue)).toBe(true);
	});

	it('fails on a held-back entry whose package is up to date', () => {
		const verdict = judge({}, {}, { typescript: hold }, '2026-11-21');
		expect(verdict.stale).toEqual(['typescript']);
		expect(fails(verdict)).toBe(true);
	});

	it('fails on a newer release of the held line, as a patch of the held major', () => {
		const verdict = judge(
			{ typescript },
			{ typescript: '6.0.4' },
			{ typescript: hold },
			'2026-11-21'
		);
		expect(verdict.outdated).toEqual([
			{ name: 'typescript', entry: { ...typescript, latest: '6.0.4' } }
		]);
		expect(verdict.heldBack).toEqual([]);
		expect(fails(verdict)).toBe(true);
		// The line's newest release is the locked one: the hold stands.
		expect(
			fails(judge({ typescript }, { typescript: '6.0.3' }, { typescript: hold }, '2026-11-21'))
		).toBe(false);
	});

	it('holds an exactly pinned package off its next major only, too', () => {
		// "horizon-layout": "2.0.2" in package.json allows no other release, yet 2.0.3 is its line's.
		const layout = { current: '2.0.2', latest: '3.0.0', dependencyType: 'dependencies' };
		const verdict = judge(
			{ 'horizon-layout': layout },
			{ 'horizon-layout': '2.0.3' },
			{ 'horizon-layout': hold },
			'2026-11-21'
		);
		expect(verdict.outdated.map((row) => row.entry.latest)).toEqual(['2.0.3']);
		// With nothing newer on its line, the pinned package stays held.
		const held = judge(
			{ 'horizon-layout': layout },
			{ 'horizon-layout': '2.0.2' },
			{ 'horizon-layout': hold },
			'2026-11-21'
		);
		expect(held.heldBack.map((row) => row.name)).toEqual(['horizon-layout']);
		expect(fails(held)).toBe(false);
	});

	it('holds a 0.x package off its next minor, its breaking release', () => {
		// Below 1.0, ^0.3.20 is the 0.3 line: 0.4.0 breaks, 0.3.21 doesn't.
		const publint = { current: '0.3.20', latest: '0.4.0', dependencyType: dev };
		expect(fails(judge({ publint }, { publint: '0.3.20' }, { publint: hold }, '2026-11-21'))).toBe(
			false
		);
		expect(fails(judge({ publint }, { publint: '0.3.21' }, { publint: hold }, '2026-11-21'))).toBe(
			true
		);
	});

	it('reads package names as names, never as Object properties', () => {
		const constructor = { current: '1.0.0', latest: '2.0.0', dependencyType: dev };
		expect(judge({ constructor }, {}, {}, '2026-11-21').outdated.map((row) => row.name)).toEqual([
			'constructor'
		]);
		expect(judge({}, {}, { constructor: hold }, '2026-11-21').stale).toEqual(['constructor']);
	});

	it('passes when everything is up to date and nothing is held back', () => {
		expect(fails(judge({}, {}, {}, '2026-11-21'))).toBe(false);
	});
});

describe('lineLatestOf', () => {
	it('looks each held-back package up in ^current, what semver keeps compatible', () => {
		const ranges: string[] = [];
		const newestIn = (name: string, range: string) => {
			ranges.push(`${name}@${range}`);
			return '1.2.3';
		};
		const outdated = {
			typescript,
			publint: { current: '0.3.20', latest: '0.4.0', dependencyType: dev },
			tiny: { current: '0.0.3', latest: '0.0.4', dependencyType: dev },
			vitest
		};
		const held = { typescript: hold, publint: hold, tiny: hold, svelte: hold };
		expect(lineLatestOf(outdated, held, newestIn)).toEqual({
			typescript: '1.2.3',
			publint: '1.2.3',
			tiny: '1.2.3'
		});
		// Not vitest (not held back), nor svelte (held back, but not outdated).
		expect(ranges).toEqual(['typescript@^6.0.3', 'publint@^0.3.20', 'tiny@^0.0.3']);
	});
});

describe('typesNodeLineLatest', () => {
	it('looks @types/node up on the Node line, only when it is on that line', () => {
		const ranges: string[] = [];
		const newestIn = (name: string, range: string) => {
			ranges.push(`${name}@${range}`);
			return '26.6.6';
		};
		const types = (current: string) => ({
			'@types/node': { current, latest: '27.0.0', dependencyType: dev }
		});
		expect(typesNodeLineLatest(types('26.0.0'), 26, newestIn)).toBe('26.6.6');
		expect(typesNodeLineLatest(types('24.19.2'), 26, newestIn)).toBeUndefined();
		expect(typesNodeLineLatest({}, 26, newestIn)).toBeUndefined();
		expect(ranges).toEqual(['@types/node@^26.0.0']);
	});
});

describe('newestRelease', () => {
	it('reads one version, or the last of a list', () => {
		expect(newestRelease('"26.6.6"')).toBe('26.6.6');
		expect(newestRelease('["6.0.2", "6.0.3", "6.0.4"]')).toBe('6.0.4');
	});

	it('refuses a failure pnpm writes as JSON, and silence', () => {
		expect(() => newestRelease('{"error": {"code": "ERR_PNPM_PACKAGE_NOT_FOUND"}}')).toThrow(
			'pnpm view wrote no version'
		);
		expect(() => newestRelease('')).toThrow('pnpm view wrote no version');
	});
});

describe('parseOutdated', () => {
	it("reads pnpm's list, and its silence when nothing is outdated", () => {
		expect(parseOutdated('')).toEqual({});
		expect(
			parseOutdated(
				'{"vitest": {"current": "5.1.0", "latest": "5.1.1", "wanted": "5.1.0", "isDeprecated": false, "dependencyType": "devDependencies"}}'
			).vitest.latest
		).toBe('5.1.1');
	});

	it('refuses a failure pnpm writes as JSON', () => {
		expect(() =>
			parseOutdated('{"error": {"code": "ERR_PNPM_FETCH_404", "message": "Not Found"}}')
		).toThrow('pnpm outdated wrote no versions for error');
		expect(() => parseOutdated('[]')).toThrow('pnpm outdated wrote no list of packages');
	});
});

describe('parseHeldBack', () => {
	it('takes entries with a reason and a real recheck day', () => {
		expect(parseHeldBack({ typescript: hold })).toEqual({ typescript: hold });
	});

	it('refuses anything else, naming the file and the package', () => {
		const bad: [unknown, RegExp][] = [
			[[], /held-back\.json is not an object of packages/],
			[null, /held-back\.json is not an object of packages/],
			[{ typescript: { recheck: '2026-12-21' } }, /typescript has no reason/],
			[{ typescript: { reason: ' ', recheck: '2026-12-21' } }, /typescript has no reason/],
			[{ typescript: { reason: 'why' } }, /typescript has no recheck day/],
			[{ typescript: { reason: 'why', recheck: '21/12/2026' } }, /typescript has no recheck day/],
			// No 31st of November, no 13th month, no 32nd day.
			[{ typescript: { reason: 'why', recheck: '2026-11-31' } }, /typescript has no recheck day/],
			[{ typescript: { reason: 'why', recheck: '2026-13-01' } }, /typescript has no recheck day/],
			[{ typescript: { reason: 'why', recheck: '2026-12-32' } }, /typescript has no recheck day/]
		];
		for (const [json, message] of bad) {
			expect(() => parseHeldBack(json), JSON.stringify(json)).toThrow(message);
		}
	});
});

describe('summarize', () => {
	it('lists what fails, then what is held back', () => {
		const markdown = summarize(
			judge({ typescript, vitest }, {}, { typescript: hold, svelte: hold }, '2026-11-21')
		);
		expect(markdown).toBe(
			[
				'## Outdated dependencies',
				'',
				'1 direct dependency has a newer version:',
				'',
				'| Package | Current | Latest | Type |',
				'| --- | --- | --- | --- |',
				'| `vitest` | 5.1.0 | 5.1.1 | devDependencies |',
				'',
				'Held back but up to date: remove their entries from `scripts/dependencies/held-back.json`:',
				'',
				'- `svelte`',
				'',
				'Held back on purpose:',
				'',
				'| Package | Current | Latest | Reason | Recheck |',
				'| --- | --- | --- | --- | --- |',
				'| `typescript` | 6.0.3 | 7.0.2 | SvelteKit needs TypeScript 6 | 2026-12-21 |',
				''
			].join('\n')
		);
	});

	it('names an overdue entry', () => {
		expect(summarize(judge({ typescript }, {}, { typescript: hold }, '2027-01-01'))).toContain(
			'Held back past their recheck day'
		);
	});

	it('says so when everything is up to date', () => {
		expect(summarize(judge({}, {}, {}, '2026-11-21'))).toBe(
			'## Outdated dependencies\n\nEvery direct dependency is up to date.\n'
		);
	});
});

describe('outdatedOnNode', () => {
	it('leaves out the Node runtime, and @types/node while it matches the Node line', () => {
		const devDependencies = 'devDependencies';
		const entries = {
			node: {
				current: '24.2.0',
				latest: '26.13.1',
				dependencyType: devDependencies
			},
			'@types/node': {
				current: '24.19.2',
				latest: '26.6.6',
				dependencyType: devDependencies
			},
			typescript: {
				current: '6.0.3',
				latest: '7.0.2',
				dependencyType: devDependencies
			}
		};
		expect(Object.keys(outdatedOnNode(entries, 24))).toEqual(['typescript']);
		// On Node 26, the 24 types are behind.
		expect(Object.keys(outdatedOnNode(entries, 26))).toEqual(['@types/node', 'typescript']);
	});
	it('reports a newer @types/node of the Node line', () => {
		const entries = {
			'@types/node': {
				current: '24.19.2',
				latest: '26.6.6',
				dependencyType: 'devDependencies'
			}
		};
		expect(outdatedOnNode(entries, 24, '24.20.0')).toEqual({
			'@types/node': {
				current: '24.19.2',
				latest: '24.20.0',
				dependencyType: 'devDependencies'
			}
		});
		expect(outdatedOnNode(entries, 24, '24.19.2')).toEqual({});
	});

	it('compares versions part by part as numbers, and refuses anything else', () => {
		const entries = {
			'@types/node': {
				current: '24.9.1',
				latest: '26.6.6',
				dependencyType: 'devDependencies'
			}
		};
		// As text, 24.10.0 would sort before 24.9.1.
		expect(Object.keys(outdatedOnNode(entries, 24, '24.10.0'))).toEqual(['@types/node']);
		expect(() => outdatedOnNode(entries, 24, '{"error":{"code":"ERR_PNPM_FETCH_404"}}')).toThrow(
			'Not a release version'
		);
	});
});
