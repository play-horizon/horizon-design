/**
 * Tests of `Carousel`: one slide and one indicator per snippet, counted from `slides`, every string
 * announced coming from `translations`, and an indicator asking for its own page.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render } from '@testing-library/svelte';
import Carousel from './Carousel.svelte';

// jsdom has neither; Ark's carousel tracks the slides in view and scrolls to the chosen page.
vi.stubGlobal(
	'IntersectionObserver',
	class {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
);
Element.prototype.scrollTo = () => {};

const slide = (text: string) => createRawSnippet(() => ({ render: () => `<p>${text}</p>` }));

const translations = {
	prevTrigger: 'Back',
	nextTrigger: 'Forward',
	indicator: (index: number) => `Show ${index + 1}`,
	item: (index: number, count: number) => `Picture ${index + 1} / ${count}`,
	roleDescription: 'slideshow',
	slideRoleDescription: 'picture'
};

/** The values of `attribute` on every element of the document, in document order. */
function attributeValues(attribute: string): (string | null)[] {
	return [...document.querySelectorAll(`[${attribute}]`)].map((element) =>
		element.getAttribute(attribute)
	);
}

describe('Carousel', () => {
	it('announces only the strings of translations, one slide and indicator per snippet', () => {
		render(Carousel, {
			slides: [slide('One'), slide('Two'), slide('Three')],
			label: 'Holiday pictures',
			translations
		});
		expect(attributeValues('aria-roledescription')).toEqual([
			'slideshow',
			'picture',
			'picture',
			'picture'
		]);
		expect(attributeValues('aria-label')).toEqual([
			'Holiday pictures',
			'Picture 1 / 3',
			'Picture 2 / 3',
			'Picture 3 / 3',
			'Back',
			'Forward',
			'Show 1',
			'Show 2',
			'Show 3'
		]);
	});

	it('asks for the page of the indicator clicked', async () => {
		const onPageChange = vi.fn();
		const { getByRole } = render(Carousel, {
			slides: [slide('One'), slide('Two'), slide('Three')],
			label: 'Holiday pictures',
			translations,
			onPageChange
		});
		await fireEvent.click(getByRole('button', { name: 'Show 3' }));
		expect(onPageChange).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 }));
	});
});
