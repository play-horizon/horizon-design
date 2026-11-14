/**
 * The Monaco editor theme of horizon-design, built from the colour tokens' hex values (Monaco
 * takes no CSS variables), so code editors match the rest of the interface in either theme.
 * @module
 */
import { tokenValues, type ColorToken, type Theme } from '../generated/tokens';

/** Monaco's `IStandaloneThemeData`, without depending on Monaco's types. */
export interface MonacoThemeData {
	base: 'vs' | 'vs-dark';
	inherit: boolean;
	rules: { token: string; foreground: string; fontStyle?: string }[];
	colors: Record<string, string>;
}

/**
 * The Monaco theme for a theme of horizon-design. Define it once per theme and switch with the
 * app's resolved theme.
 *
 * @example
 * monaco.editor.defineTheme('horizon-dark', createMonacoTheme('dark'));
 * monaco.editor.defineTheme('horizon-light', createMonacoTheme('light'));
 * monaco.editor.setTheme(`horizon-${theme.resolved}`);
 */
export function createMonacoTheme(theme: Theme): MonacoThemeData {
	const t = Object.fromEntries(
		Object.entries(tokenValues[theme]).map(([name, value]) => [name, value.hex])
	) as Record<ColorToken, string>;
	// Monaco's token rules take a hex colour without the leading '#'.
	const rule = (token: string, color: string, fontStyle?: string) => ({
		token,
		foreground: color.slice(1),
		...(fontStyle ? { fontStyle } : {})
	});
	// A translucent tint of an opaque token: its hex with an alpha byte appended.
	const tint = (color: string, alphaByte: string) => `${color.slice(0, 7)}${alphaByte}`;
	return {
		base: theme === 'dark' ? 'vs-dark' : 'vs',
		inherit: false,
		rules: [
			rule('', t.fg),
			rule('comment', t['code-comment'], 'italic'),
			rule('comment.doc', t['code-comment'], 'italic'),
			rule('string', t['code-string']),
			rule('string.escape', t['code-string']),
			rule('regexp', t['code-string']),
			rule('keyword', t['code-keyword']),
			rule('keyword.control', t['code-keyword']),
			rule('tag', t['code-keyword']),
			rule('number', t['code-number']),
			rule('constant', t['code-number']),
			rule('type', t['code-type']),
			rule('class', t['code-type']),
			rule('function', t['code-function']),
			rule('key', t['code-function']),
			rule('attribute.name', t['code-attribute']),
			rule('attribute.value', t['code-string']),
			rule('variable', t.fg),
			rule('variable.predefined', t['code-attribute']),
			rule('delimiter', t.muted),
			rule('metatag', t.muted)
		],
		colors: {
			'editor.background': t.background,
			'editor.foreground': t.fg,
			'editor.selectionBackground': tint(t.primary, '4d'),
			'editor.inactiveSelectionBackground': t.active,
			'editor.lineHighlightBackground': t['code-line'],
			'editor.lineHighlightBorder': tint(t.background, '00'),
			'editorCursor.foreground': t.primary,
			'editorLineNumber.foreground': t.faint,
			'editorLineNumber.activeForeground': t['fg-2'],
			'editorIndentGuide.background1': t.border,
			'editorIndentGuide.activeBackground1': t['border-strong'],
			'editorBracketMatch.background': t['primary-subtle'],
			'editorBracketMatch.border': t['primary-border'],
			'editorGutter.background': t.background,
			'editorWidget.background': t.raised,
			'editorWidget.foreground': t.fg,
			'editorWidget.border': t['border-strong'],
			'editorSuggestWidget.background': t.raised,
			'editorSuggestWidget.border': t['border-strong'],
			'editorSuggestWidget.foreground': t.fg,
			'editorSuggestWidget.selectedBackground': t['primary-subtle'],
			'editorSuggestWidget.selectedForeground': t.fg,
			'editorSuggestWidget.highlightForeground': t.primary,
			'editorHoverWidget.background': t.raised,
			'editorHoverWidget.border': t['border-strong'],
			'editorHoverWidget.foreground': t.fg,
			'editorError.foreground': t.danger,
			'editorWarning.foreground': t.warning,
			'editorInfo.foreground': t.info,
			'input.background': t.sunken,
			'input.foreground': t.fg,
			'input.border': t.border,
			'input.placeholderForeground': t.muted,
			focusBorder: t.primary,
			'list.hoverBackground': t.hover,
			'list.hoverForeground': t.fg,
			'list.activeSelectionBackground': t['primary-subtle'],
			'list.activeSelectionForeground': t.fg,
			'list.inactiveSelectionBackground': t.active,
			'list.focusBackground': t['primary-subtle'],
			'list.focusForeground': t.fg,
			'list.highlightForeground': t.primary,
			'scrollbarSlider.background': tint(t.faint, '40'),
			'scrollbarSlider.hoverBackground': tint(t.faint, '66'),
			'scrollbarSlider.activeBackground': tint(t.faint, '80'),
			'scrollbar.shadow': tint(t.background, '00'),
			'dropdown.background': t.raised,
			'dropdown.foreground': t.fg,
			'dropdown.border': t['border-strong']
		}
	};
}
