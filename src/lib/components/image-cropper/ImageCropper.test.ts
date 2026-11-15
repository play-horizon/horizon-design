/**
 * Tests of `ImageCropper`: the cropper and its frame are named and described by the
 * translations passed in, not by Ark's English defaults.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import ImageCropper from './ImageCropper.svelte';

const translations = {
	rootLabel: 'Avatar cropper',
	rootRoleDescription: 'cropper',
	previewLoading: 'Loading the image',
	previewDescription: () => 'Avatar preview',
	selectionLabel: () => 'Avatar frame',
	selectionRoleDescription: 'frame',
	selectionInstructions: 'Move the frame with the arrow keys.',
	selectionValueText: ({ width }: { width: number }) => `${width} pixels wide`
};

describe('ImageCropper', () => {
	it('takes its names from its translations', () => {
		const { container } = render(ImageCropper, { src: '/avatar.png', translations });
		const root = container.querySelector('[data-slot="image-cropper"]');
		const frame = container.querySelector('[data-slot="image-cropper-selection"]');
		expect(root?.getAttribute('aria-label')).toBe('Avatar cropper');
		expect(root?.getAttribute('aria-description')).toBe('Loading the image');
		expect(frame?.getAttribute('aria-label')).toBe('Avatar frame');
		expect(frame?.getAttribute('aria-description')).toBe('Move the frame with the arrow keys.');
	});
});
