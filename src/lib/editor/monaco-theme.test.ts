/**
 * Tests of `createMonacoTheme`: the base theme, the token rules' hex colours without their '#',
 * and the editor colours, tints included, for each theme. The expected values are the tokens'
 * hex values in `src/lib/generated/tokens.ts`, written out by hand.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { createMonacoTheme } from './monaco-theme';

describe('createMonacoTheme', () => {
	it('builds the dark theme from the dark tokens', () => {
		const theme = createMonacoTheme('dark');
		expect(theme.base).toBe('vs-dark');
		expect(theme.inherit).toBe(false);
		expect(theme.rules).toContainEqual({ token: '', foreground: 'f1f5f9' });
		expect(theme.rules).toContainEqual({
			token: 'comment',
			foreground: '738199',
			fontStyle: 'italic'
		});
		expect(theme.rules).toContainEqual({ token: 'keyword', foreground: 'ba93fb' });
		expect(theme.colors).toMatchObject({
			'editor.background': '#111624',
			'editor.foreground': '#f1f5f9',
			'editor.inactiveSelectionBackground': '#212c47',
			// A translucent token keeps its own alpha byte.
			'editor.lineHighlightBackground': '#ffffff09',
			'editorBracketMatch.background': '#598dff21',
			// Tints: primary at 0x4d (30 %), faint at 0x40 (25 %), background fully transparent.
			'editor.selectionBackground': '#598dff4d',
			'scrollbarSlider.background': '#5b698340',
			'scrollbarSlider.hoverBackground': '#5b698366',
			'scrollbarSlider.activeBackground': '#5b698380',
			'editor.lineHighlightBorder': '#11162400',
			'scrollbar.shadow': '#11162400'
		});
	});

	it('builds the light theme from the light tokens', () => {
		const theme = createMonacoTheme('light');
		expect(theme.base).toBe('vs');
		expect(theme.rules).toContainEqual({ token: '', foreground: '0f172a' });
		expect(theme.rules).toContainEqual({ token: 'keyword', foreground: '773ac1' });
		expect(theme.colors).toMatchObject({
			'editor.background': '#f9fafc',
			'editor.lineHighlightBackground': '#3246730a',
			'editor.selectionBackground': '#265de94d',
			'scrollbarSlider.background': '#808da240',
			'editor.lineHighlightBorder': '#f9fafc00'
		});
	});
});
