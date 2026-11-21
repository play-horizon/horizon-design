/**
 * The controls of the docs site's playgrounds: each one edits one prop of a live example. A
 * section declares its controls with the helpers below (`boolean`, `choice`, `text`, `number`),
 * and the `Playground` gives the example their current values, typed from the declaration.
 * @module
 */

/** An on/off prop, edited with a switch. */
export interface BooleanControl {
	type: 'boolean';
	value: boolean;
}

/** A prop that takes one of a few values, edited with a select. */
export interface ChoiceControl<Option extends string = string> {
	type: 'choice';
	options: readonly Option[];
	value: Option;
}

/** A text prop, edited with a text field. */
export interface TextControl {
	type: 'text';
	value: string;
}

/** A number prop, edited with a number field bounded by `min` and `max`. */
export interface NumberControl {
	type: 'number';
	value: number;
	min?: number;
	max?: number;
	step?: number;
}

/** Any control. */
export type Control = BooleanControl | ChoiceControl | TextControl | NumberControl;

/** A playground's controls, by prop name (the name is the control's label). */
export type Controls = Record<string, Control>;

/** The current value of each control: what the example reads. */
export type ControlValues<C extends Controls> = {
	[Name in keyof C]: C[Name]['value'];
};

/** An on/off control, off unless `value` is `true`. */
export function boolean(value = false): BooleanControl {
	return { type: 'boolean', value };
}

/**
 * A control that picks one of `options`, starting at `value` (the first option by default).
 *
 * @example choice(['sm', 'md', 'lg'], 'md')
 */
export function choice<const Option extends string>(
	options: readonly Option[],
	value: Option = options[0]
): ChoiceControl<Option> {
	return { type: 'choice', options, value };
}

/** A text control starting at `value`. */
export function text(value = ''): TextControl {
	return { type: 'text', value };
}

/** A number control starting at `value`, bounded by `min` and `max` when given. */
export function number(
	value: number,
	bounds: { min?: number; max?: number; step?: number } = {}
): NumberControl {
	return { type: 'number', value, ...bounds };
}

/** The starting value of every control. */
export function initialValues<C extends Controls>(controls: C): ControlValues<C> {
	return Object.fromEntries(
		Object.entries(controls).map(([name, control]) => [name, control.value])
	) as ControlValues<C>;
}
