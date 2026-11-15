/**
 * Tests of `FileUpload`: the dropzone is a button named by its prompt rather than Ark's English
 * default.
 * @module
 */
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import FileUpload from './FileUpload.svelte';

describe('FileUpload', () => {
	it('names the dropzone by its prompt', () => {
		const { getByRole } = render(FileUpload, {
			prompt: 'Drop images here or browse',
			hint: 'PNG or WebP'
		});
		expect(getByRole('button', { name: 'Drop images here or browse' })).toBeTruthy();
	});
});
