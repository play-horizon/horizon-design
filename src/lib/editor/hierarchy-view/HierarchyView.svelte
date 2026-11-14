<!--
@component
The Editor's hierarchy of a scene's objects: a tree with keyboard navigation, multiple selection,
renaming, and drag and drop to reparent and reorder.
-->
<script lang="ts">
	import { untrack } from 'svelte';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import MingcuteFileLine from '~icons/mingcute/file-line';
	import { SvelteSet } from 'svelte/reactivity';
	import type { AnyNode } from '.';

	type DropTarget = { value: string; position: 'before' | 'inside' | 'after' } | null;

	let {
		class: className = '',
		data,
		nodeToValue = (n: AnyNode) => (n.id ?? n.name ?? '') as string,
		nodeToString = (n: AnyNode) => (n.name ?? n.label ?? '') as string,
		icon,
		dragLabel,
		selectedValue = $bindable<string[]>([]),
		expandedValue = $bindable<string[]>([]),
		onSelectionChange,
		onExpandedChange,
		onDataChange
	}: {
		class?: string;
		data: AnyNode[];
		nodeToValue?: (node: AnyNode) => string;
		nodeToString?: (node: AnyNode) => string;
		icon?: Snippet<[AnyNode]>;
		/** The drag ghost's text while several objects are dragged, such as `${count} objects`. */
		dragLabel: (count: number) => string;
		selectedValue?: string[];
		expandedValue?: string[];
		onSelectionChange?: (details: { selectedValue: string[] }) => void;
		onExpandedChange?: (details: { expandedValue: string[] }) => void;
		onDataChange?: (data: AnyNode[]) => void;
	} = $props();

	let treeData = $state<AnyNode>(untrack(() => ({ children: structuredClone(data) })));
	let pivot = $state<string | null>(null);
	let containerEl = $state<HTMLElement | null>(null);

	let isDragging = $state(false);
	let dragValues = $state<string[]>([]);
	let ghostPos = $state({ x: 0, y: 0 });
	let dropTarget = $state<DropTarget>(null);
	let justFinishedDrag = false;
	let longPressTimer: ReturnType<typeof setTimeout> | null = null;
	let pressStart: { x: number; y: number } | null = null;
	let isOverInvalidTarget = false;

	let renamingValue = $state<string | null>(null);
	let renameText = $state('');

	let cursorValue = $state<string | null>(null);
	let isKeyboardMode = $state(false);
	let justMovedValue = $state<string | null>(null);
	let justMovedTimer: ReturnType<typeof setTimeout> | null = null;

	// Tracks the last children reference we sent via onDataChange so we can
	// distinguish an external data update from the parent echoing our own change back.
	let _sentDataRef: AnyNode[] = untrack(() => data);

	function emitDataChange() {
		_sentDataRef = treeData.children ?? [];
		onDataChange?.(_sentDataRef);
	}

	$effect(() => {
		const snapshot = data;
		untrack(() => {
			if (isDragging || renamingValue !== null) return;
			if (snapshot === _sentDataRef) return;
			treeData = { children: structuredClone(snapshot) };
		});
	});

	/** Moves the drag ghost to the end of <body>, so no ancestor clips or transforms it. */
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return () => node.remove();
	}

	function getValue(node: AnyNode): string {
		return nodeToValue(node);
	}

	function findNodes(root: AnyNode, values: Set<string>, found: AnyNode[] = []): AnyNode[] {
		if (values.has(getValue(root))) found.push(root);
		for (const c of root.children ?? []) findNodes(c, values, found);
		return found;
	}

	function findNodeLabel(value: string): string {
		function find(node: AnyNode): string | null {
			if (getValue(node) === value) return nodeToString(node);
			for (const c of node.children ?? []) {
				const r = find(c);
				if (r !== null) return r;
			}
			return null;
		}
		return find(treeData) ?? value;
	}

	function removeNodes(node: AnyNode, vals: Set<string>): AnyNode {
		return {
			...node,
			children: (node.children ?? [])
				.filter((c) => !vals.has(getValue(c)))
				.map((c) => removeNodes(c, vals))
		};
	}

	function insertAt(
		root: AnyNode,
		targetValue: string,
		nodesToInsert: AnyNode[],
		position: 'before' | 'inside' | 'after'
	): AnyNode {
		if (position === 'inside' && getValue(root) === targetValue) {
			return { ...root, children: [...(root.children ?? []), ...nodesToInsert] };
		}
		if (!root.children?.length) return root;
		const newChildren: AnyNode[] = [];
		for (const child of root.children) {
			const cv = getValue(child);
			if (position === 'before' && cv === targetValue) newChildren.push(...nodesToInsert);
			newChildren.push(insertAt(child, targetValue, nodesToInsert, position));
			if (position === 'after' && cv === targetValue) newChildren.push(...nodesToInsert);
		}
		return { ...root, children: newChildren };
	}

	function isDescendantOrSelf(root: AnyNode, ancestorValue: string, targetValue: string): boolean {
		function search(node: AnyNode, inSubtree: boolean): boolean {
			const v = getValue(node);
			const entering = inSubtree || v === ancestorValue;
			if (entering && v === targetValue) return true;
			return (node.children ?? []).some((c) => search(c, entering));
		}
		return search(root, false);
	}

	function renameNodeInTree(root: AnyNode, targetValue: string, newName: string): AnyNode {
		if (getValue(root) === targetValue) {
			const updated = { ...root };
			if ('name' in root) updated.name = newName;
			if ('label' in root) updated.label = newName;
			return updated;
		}
		return {
			...root,
			children: root.children?.map((c) => renameNodeInTree(c, targetValue, newName))
		};
	}

	function collectSubtreeValues(root: AnyNode, targetValue: string): Set<string> {
		const result = new SvelteSet<string>();
		function collect(node: AnyNode, inSubtree: boolean) {
			const v = getValue(node);
			const entering = inSubtree || v === targetValue;
			if (entering) result.add(v);
			for (const c of node.children ?? []) collect(c, entering);
		}
		collect(root, false);
		return result;
	}

	function findParentAndIndex(
		root: AnyNode,
		targetValue: string
	): { parent: AnyNode; index: number } | null {
		for (let i = 0; i < (root.children?.length ?? 0); i++) {
			if (getValue(root.children![i]) === targetValue) return { parent: root, index: i };
			const found = findParentAndIndex(root.children![i], targetValue);
			if (found) return found;
		}
		return null;
	}

	function replaceChildren(root: AnyNode, parentValue: string, newChildren: AnyNode[]): AnyNode {
		if (getValue(root) === parentValue) return { ...root, children: newChildren };
		if (!root.children?.length) return root;
		return {
			...root,
			children: root.children.map((c) => replaceChildren(c, parentValue, newChildren))
		};
	}

	function findNode(root: AnyNode, targetValue: string): AnyNode | null {
		if (getValue(root) === targetValue) return root;
		for (const c of root.children ?? []) {
			const found = findNode(c, targetValue);
			if (found) return found;
		}
		return null;
	}

	function findParent(root: AnyNode, targetValue: string): AnyNode | null {
		for (const c of root.children ?? []) {
			if (getValue(c) === targetValue) return root;
			const found = findParent(c, targetValue);
			if (found) return found;
		}
		return null;
	}

	function getVisibleValues(): string[] {
		const result: string[] = [];
		function traverse(nodes: AnyNode[]) {
			for (const node of nodes) {
				const value = getValue(node);
				result.push(value);
				if (node.children?.length && expandedValue.includes(value)) traverse(node.children);
			}
		}
		traverse((treeData.children ?? []) as AnyNode[]);
		return result;
	}

	function moveCursor(value: string) {
		cursorValue = value;
	}

	function flashMoved(value: string) {
		if (justMovedTimer) clearTimeout(justMovedTimer);
		justMovedValue = value;
		justMovedTimer = setTimeout(() => {
			justMovedValue = null;
		}, 350);
	}

	function moveNodeUp(targetValue: string) {
		const info = findParentAndIndex(treeData, targetValue);
		if (!info || info.index === 0) return;
		const siblings = [...info.parent.children!];
		[siblings[info.index - 1], siblings[info.index]] = [
			siblings[info.index],
			siblings[info.index - 1]
		];
		treeData = replaceChildren(treeData, getValue(info.parent), siblings);
		emitDataChange();
		flashMoved(targetValue);
	}

	function moveNodeDown(targetValue: string) {
		const info = findParentAndIndex(treeData, targetValue);
		if (!info || info.index >= (info.parent.children?.length ?? 0) - 1) return;
		const siblings = [...info.parent.children!];
		[siblings[info.index], siblings[info.index + 1]] = [
			siblings[info.index + 1],
			siblings[info.index]
		];
		treeData = replaceChildren(treeData, getValue(info.parent), siblings);
		emitDataChange();
		flashMoved(targetValue);
	}

	function indentNode(targetValue: string) {
		const info = findParentAndIndex(treeData, targetValue);
		if (!info || info.index === 0) return;

		const node = info.parent.children![info.index];
		const prevSibling = info.parent.children![info.index - 1];

		const newParentChildren = info.parent.children!.filter((_, i) => i !== info.index);

		newParentChildren[info.index - 1] = {
			...prevSibling,
			children: [...(prevSibling.children ?? []), node]
		};

		treeData = replaceChildren(treeData, getValue(info.parent), newParentChildren);

		if (!expandedValue.includes(getValue(prevSibling))) {
			expandedValue = [...expandedValue, getValue(prevSibling)];
			onExpandedChange?.({ expandedValue });
		}

		emitDataChange();
		flashMoved(targetValue);
	}

	function outdentNode(targetValue: string) {
		const info = findParentAndIndex(treeData, targetValue);
		if (!info || getValue(info.parent) === getValue(treeData)) return;

		const grandInfo = findParentAndIndex(treeData, getValue(info.parent));
		if (!grandInfo) return;

		const node = info.parent.children![info.index];

		const newParentChildren = info.parent.children!.filter((_, i) => i !== info.index);

		const newGrandChildren = [...grandInfo.parent.children!];

		newGrandChildren[grandInfo.index] = {
			...info.parent,
			children: newParentChildren
		};

		newGrandChildren.splice(grandInfo.index + 1, 0, node);

		treeData = replaceChildren(treeData, getValue(grandInfo.parent), newGrandChildren);

		emitDataChange();
		flashMoved(targetValue);
	}

	function toggleExpand(value: string) {
		const next = expandedValue.includes(value)
			? expandedValue.filter((v) => v !== value)
			: [...expandedValue, value];
		expandedValue = next;
		onExpandedChange?.({ expandedValue: next });
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement) return;
		isKeyboardMode = true;

		if (e.shiftKey && cursorValue) {
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				moveNodeUp(cursorValue);
				return;
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				moveNodeDown(cursorValue);
				return;
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				outdentNode(cursorValue);
				return;
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				indentNode(cursorValue);
				return;
			}
		}

		const visible = getVisibleValues();
		if (visible.length === 0) return;
		const idx = cursorValue ? visible.indexOf(cursorValue) : -1;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			moveCursor(idx < visible.length - 1 ? visible[idx + 1] : visible[0]);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			moveCursor(idx > 0 ? visible[idx - 1] : visible[visible.length - 1]);
		} else if (e.key === 'ArrowRight') {
			if (!cursorValue) return;
			e.preventDefault();
			const node = findNode(treeData, cursorValue);
			if (!node) return;
			const hasBranch = (node.children?.length ?? 0) > 0;
			if (hasBranch && !expandedValue.includes(cursorValue)) {
				toggleExpand(cursorValue);
			} else if (hasBranch && expandedValue.includes(cursorValue)) {
				moveCursor(getValue(node.children![0]));
			}
		} else if (e.key === 'ArrowLeft') {
			if (!cursorValue) return;
			e.preventDefault();
			if (expandedValue.includes(cursorValue)) {
				toggleExpand(cursorValue);
			} else {
				const parent = findParent(treeData, cursorValue);
				if (parent && getValue(parent) !== getValue(treeData)) {
					moveCursor(getValue(parent));
				}
			}
		} else if (e.key === 'Home') {
			e.preventDefault();
			moveCursor(visible[0]);
		} else if (e.key === 'End') {
			e.preventDefault();
			moveCursor(visible[visible.length - 1]);
		} else if (e.key === 'Enter' || e.key === ' ') {
			if (!cursorValue) return;
			e.preventDefault();
			const isSelected = selectedValue.includes(cursorValue);
			if (isSelected) {
				const next = selectedValue.filter((v) => v !== cursorValue);
				selectedValue = next;
				if (next.length === 0) pivot = null;
				onSelectionChange?.({ selectedValue: next });
			} else {
				selectedValue = [...selectedValue, cursorValue];
				pivot = cursorValue;
				onSelectionChange?.({ selectedValue });
			}
		} else if (e.key === 'F2') {
			if (!cursorValue) return;
			e.preventDefault();
			renamingValue = cursorValue;
			renameText = findNodeLabel(cursorValue);
		} else if (e.key === 'Delete' || e.key === 'Backspace') {
			if (!cursorValue) return;
			e.preventDefault();
			const deleted = collectSubtreeValues(treeData, cursorValue);
			const before = visible.slice(0, idx).filter((v) => !deleted.has(v));
			const after = visible.slice(idx + 1).filter((v) => !deleted.has(v));
			cursorValue = after[0] ?? before[before.length - 1] ?? null;
			treeData = removeNodes(treeData, deleted);
			selectedValue = selectedValue.filter((v) => !deleted.has(v));
			pivot = pivot && !deleted.has(pivot) ? pivot : null;
			onSelectionChange?.({ selectedValue });
			emitDataChange();
		} else if (e.key === 'Escape') {
			selectedValue = [];
			pivot = null;
			cursorValue = null;
			onSelectionChange?.({ selectedValue: [] });
		}
	}

	function handlePointerDown(e: PointerEvent) {
		isKeyboardMode = false;
		const target = e.target as Element;
		if (target.closest('input') || target.closest('[data-part="trigger"]')) return;
		const rowEl = target.closest('[data-part="row"]') as HTMLElement | null;
		if (!rowEl) return;
		const value = rowEl.getAttribute('data-value');
		if (!value) return;

		pressStart = { x: e.clientX, y: e.clientY };

		longPressTimer = setTimeout(() => {
			if (!pressStart) return;
			const valuesToDrag = selectedValue.includes(value) ? [...selectedValue] : [value];
			isDragging = true;
			dragValues = valuesToDrag;
			ghostPos = { x: e.clientX + 14, y: e.clientY - 12 };
			window.addEventListener('mousemove', onDragMove);
			window.addEventListener('mouseup', onDragEnd);
			window.addEventListener('pointercancel', onDragEnd);
		}, 320);
	}

	function cancelPress() {
		if (longPressTimer) {
			clearTimeout(longPressTimer);
			longPressTimer = null;
		}
		pressStart = null;
	}

	function onDragMove(e: MouseEvent) {
		if (e.buttons === 0) {
			onDragEnd();
			return;
		}
		ghostPos = { x: e.clientX + 14, y: e.clientY - 12 };
		computeDropTarget(e.clientX, e.clientY);
	}

	function computeDropTarget(x: number, y: number) {
		const ghostEl = document.querySelector('[data-drag-ghost]') as HTMLElement | null;
		if (ghostEl) ghostEl.style.pointerEvents = 'none';
		const els = document.elementsFromPoint(x, y);
		if (ghostEl) ghostEl.style.pointerEvents = '';

		let found: DropTarget = null;
		isOverInvalidTarget = false;
		for (const el of els) {
			const rowEl = el.closest('[data-part="row"]') as HTMLElement | null;
			if (!rowEl) continue;
			const value = rowEl.getAttribute('data-value');
			if (!value || dragValues.includes(value)) continue;
			if (dragValues.some((dv) => isDescendantOrSelf(treeData, dv, value))) {
				isOverInvalidTarget = true;
				break;
			}
			const rect = rowEl.getBoundingClientRect();
			const relY = (y - rect.top) / rect.height;
			found = {
				value,
				position: relY < 0.25 ? 'before' : relY > 0.75 ? 'after' : 'inside'
			};
			break;
		}
		dropTarget = found;
	}

	function onDragEnd() {
		window.removeEventListener('mousemove', onDragMove);
		window.removeEventListener('mouseup', onDragEnd);
		window.removeEventListener('pointercancel', onDragEnd);
		if (dropTarget) {
			executeDrop(dropTarget);
		} else if (!isOverInvalidTarget) {
			const vals = new Set(dragValues);
			const nodesToInsert = findNodes(treeData, vals);
			const newTree = removeNodes(treeData, vals);
			treeData = { ...newTree, children: [...(newTree.children ?? []), ...nodesToInsert] };
			emitDataChange();
		}
		isDragging = false;
		dragValues = [];
		dropTarget = null;
		pressStart = null;
		justFinishedDrag = true;
		setTimeout(() => {
			justFinishedDrag = false;
		}, 60);
		selectedValue = [];
		pivot = null;
		cursorValue = null;
		onSelectionChange?.({ selectedValue: [] });
	}

	function executeDrop(target: NonNullable<DropTarget>) {
		const vals = new Set(dragValues);
		const nodesToInsert = findNodes(treeData, vals);
		let newTree = removeNodes(treeData, vals);
		newTree = insertAt(newTree, target.value, nodesToInsert, target.position);
		treeData = newTree;
		emitDataChange();
		if (target.position === 'inside' && !expandedValue.includes(target.value)) {
			expandedValue = [...expandedValue, target.value];
			onExpandedChange?.({ expandedValue });
		}
	}

	function handleClick(e: MouseEvent) {
		if (isDragging || justFinishedDrag) return;
		const target = e.target as Element;
		if (target.closest('[data-part="trigger"]') || target.closest('input')) return;
		const rowEl = target.closest('[data-part="row"]');
		if (!rowEl) {
			selectedValue = [];
			pivot = null;
			cursorValue = null;
			onSelectionChange?.({ selectedValue: [] });
			return;
		}
		const value = rowEl.getAttribute('data-value');
		if (!value) return;
		e.stopPropagation();
		cursorValue = value;
		const isSelected = selectedValue.includes(value);
		if (isSelected && !e.shiftKey) {
			const next = selectedValue.filter((v) => v !== value);
			selectedValue = next;
			if (next.length === 0) pivot = null;
			onSelectionChange?.({ selectedValue: next });
			return;
		}
		if (e.shiftKey && pivot) {
			const visible = getVisibleValues();
			const pivotIdx = visible.indexOf(pivot);
			const currIdx = visible.indexOf(value);
			if (pivotIdx !== -1 && currIdx !== -1) {
				const [start, end] = pivotIdx < currIdx ? [pivotIdx, currIdx] : [currIdx, pivotIdx];
				selectedValue = visible.slice(start, end + 1);
				onSelectionChange?.({ selectedValue });
				return;
			}
		}
		selectedValue = [...selectedValue, value];
		pivot = value;
		onSelectionChange?.({ selectedValue });
	}

	function handleDblClick(e: MouseEvent) {
		if (isDragging) return;
		const target = e.target as Element;
		if (target.closest('[data-part="trigger"]') || target.closest('input')) return;
		const rowEl = target.closest('[data-part="row"]');
		const value = rowEl?.getAttribute('data-value');
		if (!value) return;
		e.stopPropagation();
		renamingValue = value;
		renameText = findNodeLabel(value);
	}

	function commitRename() {
		if (!renamingValue) return;
		if (renameText.trim()) {
			treeData = renameNodeInTree(treeData, renamingValue, renameText.trim());
			emitDataChange();
		}
		renamingValue = null;
		renameText = '';
		containerEl?.focus();
	}

	function cancelRename() {
		renamingValue = null;
		renameText = '';
		containerEl?.focus();
	}

	function handleRenameKeydown(e: KeyboardEvent) {
		e.stopPropagation();
		if (e.key === 'Enter') {
			e.preventDefault();
			commitRename();
		} else if (e.key === 'Escape') {
			cancelRename();
		}
	}

	$effect(() => {
		if (!isDragging) return;
		document.body.style.cursor = 'grabbing';
		return () => {
			document.body.style.cursor = '';
		};
	});

	/** Focuses the rename field and selects its text when it appears. */
	function focusRename(input: HTMLInputElement) {
		input.focus();
		input.select();
	}

	function cancelIfNotDragging() {
		if (!isDragging) cancelPress();
	}
</script>

{#if isDragging}
	<div
		{@attach portal}
		data-drag-ghost
		style="position:fixed; z-index:9999; left:{ghostPos.x}px; top:{ghostPos.y}px"
		class="pointer-events-none max-w-48 truncate rounded border bg-background px-2 py-1 text-sm shadow-lg"
	>
		{#if dragValues.length === 1}
			{findNodeLabel(dragValues[0])}
		{:else}
			{dragLabel(dragValues.length)}
		{/if}
	</div>
{/if}

<div
	bind:this={containerEl}
	onclickcapture={handleClick}
	ondblclickcapture={handleDblClick}
	onpointerdowncapture={handlePointerDown}
	onpointercancelcapture={cancelIfNotDragging}
	onpointerupcapture={cancelIfNotDragging}
	role="tree"
	tabindex="0"
	data-slot="hierarchy-view"
	class={cn('flex size-full flex-col overflow-y-auto text-sm outline-none select-none', className)}
	ondragstart={(e) => e.preventDefault()}
	onkeydown={handleKeyDown}
	onfocus={() => {
		if (containerEl?.matches(':focus-visible') && !cursorValue)
			cursorValue = getVisibleValues()[0] ?? null;
	}}
>
	{#each treeData.children ?? [] as node (getValue(node))}
		{@render renderNode(node, 1)}
	{/each}
</div>

{#snippet renderNode(node: AnyNode, depth: number)}
	{@const v = getValue(node)}
	{@const hasBranch = (node.children?.length ?? 0) > 0}
	{@const isExpanded = expandedValue.includes(v)}
	{@const isSelected = selectedValue.includes(v)}
	{@const dt = dropTarget}
	{@const isDropInside = dt?.value === v && dt?.position === 'inside'}
	{@const isDropBefore = dt?.value === v && dt?.position === 'before'}
	{@const isDropAfter = dt?.value === v && dt?.position === 'after'}
	{@const isRenaming = renamingValue === v}
	{@const isCursor = cursorValue === v && isKeyboardMode}
	{@const isJustMoved = justMovedValue === v}

	<div
		role="treeitem"
		aria-level={depth}
		aria-expanded={hasBranch ? isExpanded : undefined}
		aria-selected={isSelected}
		class="flex flex-col"
	>
		<div
			data-part="row"
			data-value={v}
			data-slot="hierarchy-view-row"
			style="padding-left: calc({depth - 1} * 1rem)"
			class={cn(
				'flex w-full cursor-default items-center gap-1.5 py-1 pr-2 transition-colors hover:bg-hover',
				isSelected && 'bg-hover text-fg hover:bg-hover',
				isCursor && !isSelected && 'bg-hover',
				isCursor && 'ring-1 ring-primary ring-inset',
				isJustMoved && !isSelected && 'bg-primary-subtle',
				isDropInside && 'outline -outline-offset-2 outline-primary',
				isDropBefore && 'border-t-2 border-primary',
				isDropAfter && 'border-b-2 border-primary'
			)}
		>
			{#if hasBranch}
				<button
					data-part="trigger"
					tabindex="-1"
					class="flex shrink-0 items-center text-muted"
					onclick={(e) => {
						e.stopPropagation();
						toggleExpand(v);
					}}
				>
					<MingcuteRightLine
						class={cn('size-3.5 transition-transform', isExpanded && 'rotate-90')}
					/>
				</button>
			{:else}
				<span class="size-3.5 shrink-0"></span>
			{/if}
			{#if icon}
				{@render icon(node)}
			{:else}
				<MingcuteFileLine class="size-4 shrink-0 text-muted" />
			{/if}
			{#if isRenaming}
				<input
					{@attach focusRename}
					bind:value={renameText}
					onkeydown={handleRenameKeydown}
					onblur={commitRename}
					onclick={(e: MouseEvent) => e.stopPropagation()}
					class="min-w-0 flex-1 rounded bg-transparent px-0.5 outline outline-primary focus-visible:outline-2"
				/>
			{:else}
				<span class="truncate">{nodeToString(node)}</span>
			{/if}
		</div>
		{#if hasBranch}
			<div
				class={cn(
					'grid transition-[grid-template-rows] duration-150 ease-out',
					isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				)}
			>
				<div class="flex flex-col overflow-hidden">
					{#each node.children ?? [] as child (getValue(child))}
						{@render renderNode(child, depth + 1)}
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/snippet}
