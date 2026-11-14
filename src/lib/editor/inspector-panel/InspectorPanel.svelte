<!--
@component
The Editor's inspector: a column of collapsible cards (a component each) that can be reordered by
drag or keyboard.

Each card's header is a button that opens and closes it. On a header, the up and down arrows move
the focus to the card above or below, Home and End to the first and the last, and Shift+up and
Shift+down move the card itself. With the pointer, a card is dragged by its handle, which assistive
technologies don't see (the header's Shift+arrows are their way to reorder), and dropped on the
upper or lower half of another card to go before or after it.
-->
<script module lang="ts">
	/** A card of the inspector: one component of the selected object. */
	export type InspectorCard = {
		/** Unique among the cards. */
		id: string;
		/** The card's heading, such as the component's name. */
		title: string;
		/** A short summary shown after the title, such as the component's main value. */
		subtitle?: string;
		/** The app's own data for the card's body (`content`), such as the component's fields. */
		[key: string]: unknown;
	};
</script>

<script lang="ts">
	import { tick, type Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import {
		draggable,
		dropTargetForElements,
		monitorForElements
	} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
	import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
	import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge/attach-closest-edge';
	import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge/extract-closest-edge';
	import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
	import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
	import { cn } from '$lib/utils';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import MingcuteDotsVerticalLine from '~icons/mingcute/dots-vertical-line';
	import { setTextDragPreview } from '../drag-preview';

	let {
		class: className = '',
		cards = $bindable<InspectorCard[]>([]),
		expandedIds = $bindable<string[]>([]),
		content,
		onCardsChange,
		onExpandedChange
	}: {
		/** Classes added to the column's element. */
		class?: string;
		/** The cards, top to bottom. */
		cards?: InspectorCard[];
		/** The ids of the open cards. */
		expandedIds?: string[];
		/** A card's body, shown while it is open. */
		content?: Snippet<[InspectorCard]>;
		/** Called with the cards in their new order after the user moves one. */
		onCardsChange?: (cards: InspectorCard[]) => void;
		/** Called with the ids of the open cards after the user opens or closes one. */
		onExpandedChange?: (expandedIds: string[]) => void;
	} = $props();

	const uid = $props.id();
	/** Tags this panel's drags: its cards take nothing else, and other views ignore them. */
	const dragType = `${uid}-card`;

	let draggingId = $state<string | null>(null);
	/** Where the dragged card would land: above or below the card under the pointer. */
	let dropTarget = $state.raw<{ id: string; edge: Edge } | null>(null);

	function headerId(id: string): string {
		return `${uid}-header-${encodeURIComponent(id)}`;
	}

	function bodyId(id: string): string {
		return `${uid}-body-${encodeURIComponent(id)}`;
	}

	function focusHeader(id: string | undefined) {
		if (id !== undefined) document.getElementById(headerId(id))?.focus();
	}

	/** Opens or closes a card; the reported ids leave out those of cards no longer shown. */
	function toggleExpanded(id: string) {
		const shown = expandedIds.filter((v) => cards.some((c) => c.id === v));
		const next = shown.includes(id) ? shown.filter((v) => v !== id) : [...shown, id];
		expandedIds = next;
		onExpandedChange?.(next);
	}

	function setCards(next: InspectorCard[]) {
		cards = next;
		onCardsChange?.(next);
	}

	async function moveCard(index: number, delta: -1 | 1) {
		const to = index + delta;
		if (to < 0 || to >= cards.length) return;
		const next = [...cards];
		[next[index], next[to]] = [next[to], next[index]];
		setCards(next);
		// Reordering moves the header's element, which loses the focus in some browsers.
		await tick();
		focusHeader(next[to].id);
	}

	function handleHeaderKeydown(e: KeyboardEvent, index: number) {
		const last = cards.length - 1;
		if (e.shiftKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
			e.preventDefault();
			void moveCard(index, e.key === 'ArrowUp' ? -1 : 1);
			return;
		}
		const targets: Record<string, number> = {
			ArrowUp: index > 0 ? index - 1 : last,
			ArrowDown: index < last ? index + 1 : 0,
			Home: 0,
			End: last
		};
		const target = targets[e.key];
		if (target === undefined) return;
		e.preventDefault();
		focusHeader(cards[target]?.id);
	}

	function isOwnDrag(data: Record<string | symbol, unknown>): boolean {
		return data.type === dragType;
	}

	/** A card's handle drags the card, shown by its title beside the pointer. */
	function handleDrag(card: InspectorCard): Attachment<HTMLElement> {
		return (element) =>
			draggable({
				element,
				getInitialData: () => ({ type: dragType, id: card.id }),
				onGenerateDragPreview: ({ nativeSetDragImage }) =>
					setTextDragPreview(nativeSetDragImage, card.title),
				onDragStart: () => (draggingId = card.id)
			});
	}

	/** A card takes the dragged card above or below it, whichever half the pointer is over. */
	function cardDrop(card: InspectorCard): Attachment<HTMLElement> {
		return (element) =>
			dropTargetForElements({
				element,
				canDrop: ({ source }) => isOwnDrag(source.data),
				// The gaps between cards keep the last card hovered, so a drop there still lands.
				getIsSticky: () => true,
				getData: ({ input, element }) =>
					attachClosestEdge({ id: card.id }, { input, element, allowedEdges: ['top', 'bottom'] }),
				onDrag: ({ self, source }) => {
					const edge = extractClosestEdge(self.data);
					const next = edge && source.data.id !== card.id ? { id: card.id, edge } : null;
					if (next?.id !== dropTarget?.id || next?.edge !== dropTarget?.edge) dropTarget = next;
				},
				onDragLeave: () => {
					if (dropTarget?.id === card.id) dropTarget = null;
				}
			});
	}

	/**
	 * Makes the panel a drop target of its own cards, so a card stays hovered only across the gaps
	 * between cards (stickiness ends where the panel does), and ends every drag of the panel,
	 * moving a card dropped on another next to it.
	 */
	function panelDrop(element: HTMLElement) {
		return combine(
			dropTargetForElements({ element, canDrop: ({ source }) => isOwnDrag(source.data) }),
			monitorForElements({
				canMonitor: ({ source }) => isOwnDrag(source.data),
				onDrop: ({ source, location }) => {
					draggingId = null;
					dropTarget = null;
					// The innermost target: a card, or the panel itself, which moves nothing.
					const target = location.current.dropTargets[0]?.data;
					if (typeof target?.id !== 'string') return;
					const startIndex = cards.findIndex((c) => c.id === source.data.id);
					const next = reorderWithEdge({
						list: cards,
						startIndex,
						indexOfTarget: cards.findIndex((c) => c.id === target.id),
						closestEdgeOfTarget: extractClosestEdge(target),
						axis: 'vertical'
					});
					if (next.some((card, i) => card !== cards[i])) setCards(next);
				}
			})
		);
	}
</script>

<div
	{@attach panelDrop}
	data-slot="inspector-panel"
	class={cn('flex flex-col gap-1 text-sm', className)}
>
	{#each cards as card, i (card.id)}
		{@const isExpanded = expandedIds.includes(card.id)}

		<div
			{@attach cardDrop(card)}
			data-slot="inspector-panel-card"
			class={cn(
				'relative flex flex-col rounded-md border border-border transition-opacity duration-150',
				draggingId === card.id && 'opacity-30'
			)}
		>
			{#if dropTarget?.id === card.id}
				<div
					class={[
						'pointer-events-none absolute inset-x-1 h-px rounded-full bg-primary',
						dropTarget.edge === 'top' ? '-top-0.75' : '-bottom-0.75'
					]}
					aria-hidden="true"
				></div>
			{/if}
			<div class="flex items-center rounded-sm pr-2 transition-colors hover:bg-hover/50">
				<button
					type="button"
					id={headerId(card.id)}
					aria-expanded={isExpanded}
					aria-controls={bodyId(card.id)}
					aria-keyshortcuts="Shift+ArrowUp Shift+ArrowDown"
					class="flex min-w-0 flex-1 cursor-default items-center gap-1.5 rounded-sm px-2 py-1.5 text-left"
					onclick={() => toggleExpanded(card.id)}
					onkeydown={(e) => handleHeaderKeydown(e, i)}
				>
					<MingcuteRightLine
						aria-hidden="true"
						class={cn(
							'size-3.5 shrink-0 text-muted transition-transform duration-200',
							isExpanded && 'rotate-90'
						)}
					/>
					<span class="flex-1 truncate leading-none font-medium">{card.title}</span>
					{#if card.subtitle}
						<span class="text-xs text-muted">{card.subtitle}</span>
					{/if}
				</button>
				<!-- Pointer only: on the keyboard, Shift+arrows on the header move the card. -->
				<div
					{@attach handleDrag(card)}
					aria-hidden="true"
					data-slot="inspector-panel-handle"
					class="ml-1 flex shrink-0 cursor-grab items-center rounded text-muted transition-colors hover:text-fg active:cursor-grabbing"
				>
					<!-- The icon's two rows of three dots, turned into the usual upright grip. -->
					<MingcuteDotsVerticalLine class="size-4 rotate-90" />
				</div>
			</div>

			<div
				id={bodyId(card.id)}
				class={cn(
					'grid transition-[grid-template-rows] duration-200 ease-out',
					isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
				)}
				inert={!isExpanded}
			>
				<div class="overflow-hidden">
					<div class="border-t border-border px-3 py-2.5">
						{#if content}
							{@render content(card)}
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
