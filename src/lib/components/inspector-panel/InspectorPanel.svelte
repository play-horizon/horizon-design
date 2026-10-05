<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	type InspectorCard = {
		id: string;
		title: string;
		subtitle?: string;
		[key: string]: unknown;
	};

	let {
		class: className = '',
		cards = $bindable<InspectorCard[]>([]),
		expandedIds = $bindable<string[]>([]),
		content,
		onCardsChange,
		onExpandedChange
	}: {
		class?: string;
		cards?: InspectorCard[];
		expandedIds?: string[];
		content?: Snippet<[InspectorCard]>;
		onCardsChange?: (cards: InspectorCard[]) => void;
		onExpandedChange?: (expandedIds: string[]) => void;
	} = $props();

	let containerEl = $state<HTMLElement | null>(null);
	let cursorId = $state<string | null>(null);
	let isKeyboardMode = $state(false);

	let isDragging = $state(false);
	let draggingId = $state<string | null>(null);
	let dragOverIndex = $state<number | null>(null);
	let ghostPos = $state({ x: 0, y: 0 });

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	function toggleExpanded(id: string) {
		const next = expandedIds.includes(id)
			? expandedIds.filter((v) => v !== id)
			: [...expandedIds, id];
		expandedIds = next;
		onExpandedChange?.(next);
	}

	function moveCard(id: string, delta: number) {
		const idx = cards.findIndex((c) => c.id === id);
		const toIdx = idx + delta;
		if (toIdx < 0 || toIdx >= cards.length) return;
		const next = [...cards];
		[next[idx], next[toIdx]] = [next[toIdx], next[idx]];
		cards = next;
		onCardsChange?.(next);
	}

	function handleKeyDown(e: KeyboardEvent) {
		// If a child element (card content) has focus, only handle Escape to return to the panel
		if (e.target !== containerEl) {
			if (e.key === 'Escape') {
				e.preventDefault();
				containerEl?.focus();
			}
			return;
		}

		isKeyboardMode = true;
		const ids = cards.map((c) => c.id);
		const idx = cursorId ? ids.indexOf(cursorId) : -1;

		if (e.shiftKey && cursorId) {
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				moveCard(cursorId, -1);
				return;
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				moveCard(cursorId, 1);
				return;
			}
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			cursorId = idx < ids.length - 1 ? ids[idx + 1] : ids[0];
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			cursorId = idx > 0 ? ids[idx - 1] : ids[ids.length - 1];
		} else if (e.key === 'Enter' || e.key === ' ') {
			if (!cursorId) return;
			e.preventDefault();
			toggleExpanded(cursorId);
		} else if (e.key === 'Home') {
			e.preventDefault();
			cursorId = ids[0] ?? null;
		} else if (e.key === 'End') {
			e.preventDefault();
			cursorId = ids[ids.length - 1] ?? null;
		} else if (e.key === 'Escape') {
			cursorId = null;
			isKeyboardMode = false;
		}
	}

	function startDrag(e: PointerEvent, id: string) {
		e.preventDefault();
		isDragging = true;
		draggingId = id;
		ghostPos = { x: e.clientX + 12, y: e.clientY - 8 };
		window.addEventListener('pointermove', onDragMove);
		window.addEventListener('pointerup', onDragEnd);
		window.addEventListener('pointercancel', onDragEnd);
	}

	function onDragMove(e: PointerEvent) {
		ghostPos = { x: e.clientX + 12, y: e.clientY - 8 };
		if (!containerEl) return;
		const rows = Array.from(containerEl.querySelectorAll<HTMLElement>('[data-inspector-row]'));
		let found = rows.length;
		for (let i = 0; i < rows.length; i++) {
			const rect = rows[i].getBoundingClientRect();
			if (e.clientY < rect.top + rect.height / 2) {
				found = i;
				break;
			}
		}
		dragOverIndex = found;
	}

	function onDragEnd() {
		window.removeEventListener('pointermove', onDragMove);
		window.removeEventListener('pointerup', onDragEnd);
		window.removeEventListener('pointercancel', onDragEnd);

		if (draggingId !== null && dragOverIndex !== null) {
			const fromIndex = cards.findIndex((c) => c.id === draggingId);
			if (fromIndex !== -1) {
				const next = [...cards];
				const [item] = next.splice(fromIndex, 1);
				const insertAt = dragOverIndex > fromIndex ? dragOverIndex - 1 : dragOverIndex;
				next.splice(insertAt, 0, item);
				cards = next;
				onCardsChange?.(next);
			}
		}

		isDragging = false;
		draggingId = null;
		dragOverIndex = null;
	}

	$effect(() => {
		if (!isDragging) return;
		document.body.style.cursor = 'grabbing';
		return () => {
			document.body.style.cursor = '';
		};
	});

	$effect(() => {
		const ids = new Set(cards.map((c) => c.id));

		const prunedExpanded = expandedIds.filter((id) => ids.has(id));
		if (prunedExpanded.length !== expandedIds.length) {
			expandedIds = prunedExpanded;
			onExpandedChange?.(prunedExpanded);
		}

		if (cursorId && !ids.has(cursorId)) {
			cursorId = null;
		}
	});
</script>

{#if isDragging}
	<div
		use:portal
		style="position:fixed;z-index:9999;left:{ghostPos.x}px;top:{ghostPos.y}px;pointer-events:none"
		class="bg-background border-border text-foreground max-w-48 truncate rounded-md border px-2 py-1 text-sm shadow-lg"
	>
		{cards.find((c) => c.id === draggingId)?.title ?? ''}
	</div>
{/if}

<div
	bind:this={containerEl}
	role="tree"
	tabindex="0"
	data-slot="inspector-panel"
	class={cn('flex flex-col gap-1 text-sm outline-none select-none', className)}
	onkeydown={handleKeyDown}
	onpointerdown={() => {
		isKeyboardMode = false;
	}}
	onfocus={() => {
		if (containerEl?.matches(':focus-visible')) {
			isKeyboardMode = true;
			if (!cursorId) cursorId = cards[0]?.id ?? null;
		}
	}}
	onfocusin={(e) => {
		if (e.target !== containerEl) {
			isKeyboardMode = false;
			cursorId = null;
		}
	}}
	ondragstart={(e) => e.preventDefault()}
>
	{#each cards as card, i (card.id)}
		{@const isExpanded = expandedIds.includes(card.id)}
		{@const isCursor = cursorId === card.id && isKeyboardMode}
		{@const isDraggingThis = draggingId === card.id}
		{@const showDropAbove = isDragging && dragOverIndex === i && draggingId !== card.id}
		{@const showDropBelow =
			isDragging &&
			dragOverIndex === cards.length &&
			i === cards.length - 1 &&
			draggingId !== card.id}

		<div
			role="treeitem"
			aria-expanded={isExpanded}
			aria-selected={false}
			data-inspector-row
			data-id={card.id}
			class={cn(
				'border-border relative flex flex-col rounded-md border transition-opacity duration-150',
				isDraggingThis && 'opacity-30',
				isCursor && 'ring-primary ring-1 ring-inset'
			)}
		>
			{#if showDropAbove}
				<div
					class="bg-primary pointer-events-none absolute inset-x-1 h-px rounded-full"
					style="top: -2.5px"
				></div>
			{/if}
			{#if showDropBelow}
				<div
					class="bg-primary pointer-events-none absolute inset-x-1 h-px rounded-full"
					style="bottom: -2.5px"
				></div>
			{/if}
			<div
				role="button"
				tabindex="0"
				class="hover:bg-muted/50 flex cursor-default items-center rounded-sm px-2 py-1.5 transition-colors"
				onclick={() => {
					cursorId = card.id;
					isKeyboardMode = false;
					toggleExpanded(card.id);
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						cursorId = card.id;
						isKeyboardMode = true;
						toggleExpanded(card.id);
					}
				}}
			>
				<button
					tabindex="-1"
					aria-expanded={isExpanded}
					class="flex flex-1 items-center gap-1.5 text-left"
				>
					<MingcuteRightLine
						class={cn(
							'text-muted-foreground size-3.5 shrink-0 transition-transform duration-200',
							isExpanded && 'rotate-90'
						)}
					/>
					<span class="flex-1 leading-none font-medium">{card.title}</span>
					{#if card.subtitle}
						<span class="text-muted-foreground text-xs">{card.subtitle}</span>
					{/if}
				</button>
				<button
					tabindex="-1"
					aria-label="Drag to reorder {card.title}"
					class="text-muted-foreground hover:text-foreground ml-1 flex shrink-0 cursor-grab items-center rounded transition-colors active:cursor-grabbing"
					onpointerdown={(e) => {
						e.stopPropagation();
						startDrag(e, card.id);
					}}
					onclick={(e) => e.stopPropagation()}
				>
					<span class="grid grid-cols-2 gap-0.75 p-0.5">
						{#each [0, 1, 2, 3, 4, 5] as dot (dot)}
							<span class="size-0.75 rounded-full bg-current"></span>
						{/each}
					</span>
				</button>
			</div>

			<div
				class={cn(
					'grid transition-[grid-template-rows] duration-200 ease-out',
					isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				)}
			>
				<div class="overflow-hidden">
					<div class="border-border border-t px-3 py-2.5">
						{#if content}
							{@render content(card)}
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
