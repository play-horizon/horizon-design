/**
 * Tests of `Carousel`: one slide and one indicator per snippet, counted from `slides`, every string
 * announced coming from `translations`, an indicator asking for its own page, and the arrows and
 * dots each showing their accessible name as a tooltip while keeping the carousel's ids.
 * @module
 */
import { describe, expect, it, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
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

	it('shows the name of each arrow and dot as its tooltip', async () => {
		const { getByRole, getAllByRole } = render(Carousel, {
			slides: [slide('One'), slide('Two')],
			label: 'Holiday pictures',
			translations,
			// Looping, Back is enabled on the first page: a disabled button shows no tooltip.
			loop: true
		});
		// The carousel's ids, not the tooltips': it finds its dots by id to move the focus between them.
		const ids = ['Back', 'Forward', 'Show 2'].map((name) => getByRole('button', { name }).id);
		expect(ids.map((id) => id.split('-').slice(1).join('-'))).toEqual([
			'prev',
			'next',
			'indicator-1'
		]);
		for (const name of ['Back', 'Forward', 'Show 2']) {
			const button = getByRole('button', { name });
			await fireEvent.pointerMove(button, { pointerType: 'mouse' });
			await waitFor(() =>
				expect(
					getAllByRole('tooltip', { hidden: true })
						.filter((tooltip) => tooltip.dataset.state === 'open')
						.map((tooltip) => tooltip.textContent?.trim())
				).toEqual([name])
			);
			await fireEvent.pointerLeave(button, { pointerType: 'mouse' });
		}
	});
});
