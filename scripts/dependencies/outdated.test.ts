/**
 * Tests of the outdated-dependencies check: the Node runtime and `@types/node` follow the project's
 * Node line, the summary is a table of the outdated ones by name, and says when there are none.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { outdatedOnNode, summarize } from './outdated.ts';

describe('summarize', () => {
	it('lists the outdated dependencies by name, with their versions and type', () => {
		const { count, markdown } = summarize({
			vitest: { current: '5.1.0', latest: '5.1.1', dependencyType: 'devDependencies' },
			'tailwind-merge': { current: '3.7.0', latest: '3.7.1', dependencyType: 'dependencies' }
		});
		expect(count).toBe(2);
		expect(markdown).toBe(
			[
				'## Outdated dependencies',
				'',
				'2 direct dependencies have a newer version:',
				'',
				'| Package | Current | Latest | Type |',
				'| --- | --- | --- | --- |',
				'| `tailwind-merge` | 3.7.0 | 3.7.1 | dependencies |',
				'| `vitest` | 5.1.0 | 5.1.1 | devDependencies |',
				''
			].join('\n')
		);
	});

	it('says so when everything is up to date', () => {
		expect(summarize({})).toEqual({
			count: 0,
			markdown: '## Outdated dependencies\n\nEvery direct dependency is up to date.\n'
		});
	});
});

describe('outdatedOnNode', () => {
	it('leaves out the Node runtime, and @types/node while it matches the Node line', () => {
		const devDependencies = 'devDependencies';
		const entries = {
			node: { current: '24.2.0', latest: '26.13.1', dependencyType: devDependencies },
			'@types/node': { current: '24.19.2', latest: '26.6.6', dependencyType: devDependencies },
			typescript: { current: '6.0.3', latest: '7.0.2', dependencyType: devDependencies }
		};
		expect(Object.keys(outdatedOnNode(entries, 24))).toEqual(['typescript']);
		// On Node 26, the 24 types are behind.
		expect(Object.keys(outdatedOnNode(entries, 26))).toEqual(['@types/node', 'typescript']);
	});
	it('reports a newer @types/node of the Node line', () => {
		const entries = {
			'@types/node': { current: '24.19.2', latest: '26.6.6', dependencyType: 'devDependencies' }
		};
		expect(outdatedOnNode(entries, 24, '24.20.0')).toEqual({
			'@types/node': { current: '24.19.2', latest: '24.20.0', dependencyType: 'devDependencies' }
		});
		expect(outdatedOnNode(entries, 24, '24.19.2')).toEqual({});
	});

	it('compares versions part by part as numbers, and refuses anything else', () => {
		const entries = {
			'@types/node': { current: '24.9.1', latest: '26.6.6', dependencyType: 'devDependencies' }
		};
		// As text, 24.10.0 would sort before 24.9.1.
		expect(Object.keys(outdatedOnNode(entries, 24, '24.10.0'))).toEqual(['@types/node']);
		expect(() => outdatedOnNode(entries, 24, '{"error":{"code":"ERR_PNPM_FETCH_404"}}')).toThrow(
			'Not a release version'
		);
	});
});
