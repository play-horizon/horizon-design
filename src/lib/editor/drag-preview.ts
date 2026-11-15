/**
 * The drag preview of the Editor's drag and drop (`HierarchyView`'s objects, `InspectorPanel`'s
 * cards): a label, such as the dragged object's name, drawn beside the pointer as the browser's
 * native drag image, through pragmatic-drag-and-drop.
 * @module
 */
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';

/**
 * Makes `text` the drag image of the drag starting: call it from a draggable's
 * `onGenerateDragPreview`, with the `nativeSetDragImage` it receives.
 *
 * @example
 * draggable({ element, onGenerateDragPreview: ({ nativeSetDragImage }) => setTextDragPreview(nativeSetDragImage, 'Player') });
 */
export function setTextDragPreview(
	nativeSetDragImage: DataTransfer['setDragImage'] | null,
	text: string
): void {
	setCustomNativeDragPreview({
		nativeSetDragImage,
		getOffset: pointerOutsideOfPreview({ x: '12px', y: '8px' }),
		render: ({ container }) => {
			const label = document.createElement('div');
			label.className =
				'max-w-48 truncate rounded-md border border-border bg-raised px-2 py-1 text-sm text-fg shadow-md';
			label.textContent = text;
			container.append(label);
		}
	});
}
