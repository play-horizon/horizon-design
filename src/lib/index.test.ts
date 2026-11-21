/**
 * Tests of the `horizon-design` entry point: the components it exports.
 * @module
 */
import { describe, expect, it } from 'vitest';
import * as kit from './index';

describe('horizon-design', () => {
	it('has SegmentGroup for tabbed views, and no separate Tabs component', () => {
		expect(kit.SegmentGroup).toBeTypeOf('function');
		expect('Tabs' in kit).toBe(false);
	});
});
