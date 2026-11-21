<!--
@component
A guided tour of the interface, step by step (Ark Tour): each step's title, description, progress
and action buttons, over a scrim with the step's target spotlit. The app passes the steps and
their action labels translated, `closeLabel` for the close button (its tooltip and its
accessible name) and `progressText` for the progress line; each action button is named by its label. Every other prop of Ark's `useTour`
(`onStatusChange`, `onStepChange`, `closeOnInteractOutside`, `keyboardNavigation`…) configures the
tour.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tour, Portal, useTour, type TourStepDetails, type UseTourProps } from '@ark-ui/svelte';
	import { cn } from '#lib/utils.js';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
	import Tooltip from '../tooltip/Tooltip.svelte';

	let {
		steps = [],
		trigger,
		showProgress = true,
		showClose = true,
		closeLabel,
		progressText,
		lazyMount = true,
		unmountOnExit = true,
		...tourProps
	}: Omit<UseTourProps, 'steps' | 'translations'> & {
		/** The steps, in order, with their texts and action labels translated. */
		steps?: TourStepDetails[];
		/** What starts the tour, such as a button; it receives the function that starts it. */
		trigger?: Snippet<[start: () => void]>;
		/** Shows the progress line, such as "2 of 3". */
		showProgress?: boolean;
		/** Shows the close button. */
		showClose?: boolean;
		/** The close button's tooltip and accessible name, such as "Close". */
		closeLabel: string;
		/** The progress line, translated, from the current step's index (from 0) and the count. */
		progressText: (details: Tour.ProgressTextDetails) => string;
		/** Renders the tour only once it first opens. */
		lazyMount?: boolean;
		/** Removes the tour from the page once it closes. */
		unmountOnExit?: boolean;
	} = $props();

	const tour = useTour(() => ({
		...tourProps,
		steps,
		translations: { close: closeLabel, progressText }
	}));

	function handleStart() {
		tour().start();
	}
</script>

<Tour.Root {lazyMount} {tour} {unmountOnExit}>
	{#if trigger}
		{@render trigger(handleStart)}
	{/if}
	<Portal>
		<Tour.Backdrop
			class="fixed inset-0 z-90 bg-scrim data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
			data-slot="tour-overlay"
		/>
		<!-- A tooltip step's positioner gets Ark's inline `z-index: var(--z-index)`, which stays
		     unset: the important z-index keeps the step above the backdrop. -->
		<Tour.Positioner
			class="z-90! flex items-center justify-center data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=tooltip]:absolute"
			data-slot="tour-positioner"
		>
			<Tour.Content
				class={cn(
					'relative z-90 w-full max-w-md',
					'flex flex-col gap-4',
					'rounded-lg border bg-background shadow-lg',
					'focus:ring-0 focus:outline-none',
					'data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in'
				)}
				data-slot="tour-content"
			>
				{#if showClose}
					<Tooltip content={closeLabel}>
						{#snippet trigger(props)}
							<Tour.CloseTrigger
								{...props}
								class="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-lg border-none text-muted opacity-70 transition-all hover:bg-hover hover:opacity-100"
								aria-label={closeLabel}
								data-slot="tour-close-trigger"
							>
								<MingcuteCloseLine class="size-4" aria-hidden="true" />
							</Tour.CloseTrigger>
						{/snippet}
					</Tooltip>
				{/if}

				<Tour.Context>
					{#snippet render(ctx)}
						{@const api = ctx()}
						<div class="flex flex-col gap-1.5 px-6 pt-6" data-slot="tour-header">
							<Tour.Title
								class="text-base leading-none font-semibold tracking-tight"
								data-slot="tour-title"
							>
								{api.step?.title}
							</Tour.Title>
							<Tour.Description class="text-sm text-muted" data-slot="tour-description">
								{api.step?.description}
							</Tour.Description>
						</div>
						<div class="px-6" data-slot="tour-body">
							{#if showProgress}
								<Tour.ProgressText class="text-sm text-muted" data-slot="tour-progress-text" />
							{/if}
						</div>
						{#if (api.step?.actions ?? []).length > 0}
							<div
								class="flex items-center justify-between gap-2 px-6 pt-2 pb-6"
								data-slot="tour-footer"
							>
								<div class="flex flex-wrap gap-2" data-slot="tour-actions">
									{#each api.step?.actions ?? [] as action (action.label)}
										<Tour.ActionTrigger
											{action}
											aria-label={action.label}
											class={cn(
												'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors',
												action.action === 'dismiss' || action.action === 'prev'
													? 'border border-border bg-transparent hover:bg-hover hover:text-fg'
													: 'bg-primary text-on-primary hover:bg-primary/90'
											)}
											data-slot="tour-action-trigger"
										>
											{#if action.action === 'prev'}
												<MingcuteLeftLine class="size-3.5" aria-hidden="true" />
											{/if}
											{action.label}
											{#if action.action === 'next'}
												<MingcuteRightLine class="size-3.5" aria-hidden="true" />
											{/if}
										</Tour.ActionTrigger>
									{/each}
								</div>
							</div>
						{/if}
					{/snippet}
				</Tour.Context>
			</Tour.Content>
		</Tour.Positioner>
		<Tour.Spotlight class="z-90 border-2 border-primary" data-slot="tour-spotlight" />
	</Portal>
</Tour.Root>
