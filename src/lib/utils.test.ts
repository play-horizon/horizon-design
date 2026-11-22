/**
 * Tests of `cn`: later classes override conflicting earlier ones, horizon-design's own theme
 * values included.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
	it('keeps a text colour and a display size apart', () => {
		expect(cn('text-fg', 'text-display')).toBe('text-fg text-display');
	});

	it('lets a later control height, animation or easing override an earlier one', () => {
		expect(cn('h-control-md', 'h-8')).toBe('h-8');
		expect(cn('data-[state=open]:animate-fade-in', 'data-[state=open]:animate-zoom-in')).toBe(
			'data-[state=open]:animate-zoom-in'
		);
		expect(cn('ease-standard', 'ease-in')).toBe('ease-in');
	});

	it('keeps classes that do not conflict', () => {
		expect(cn('h-control-md text-faint', false, 'rounded-md')).toBe(
			'h-control-md text-faint rounded-md'
		);
	});
});
