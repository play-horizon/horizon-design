/**
 * Tests of `Select`: Ark's `defaultValue` chooses the first option, and the placeholder shows while
 * none is chosen.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Select from './Select.svelte';

const items = [
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'React', value: 'react' }
];

describe('Select', () => {
	it('starts from defaultValue when no value is bound', () => {
		const { getByRole } = render(Select, { items, label: 'Framework', defaultValue: ['react'] });
		expect(getByRole('combobox', { name: 'Framework' }).textContent).toContain('React');
	});

	it('shows the placeholder while nothing is chosen', () => {
		const { getByRole } = render(Select, { items, label: 'Framework', placeholder: 'Choose one' });
		expect(getByRole('combobox', { name: 'Framework' }).textContent).toContain('Choose one');
	});
});
