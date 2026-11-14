<!--
@component
A guided tour of the interface, step by step (Ark Tour); `closeLabel` names its close button.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tour, Portal, useTour, type TourStepDetails } from '@ark-ui/svelte';
	import { cn } from '$lib/utils';
	import MingcuteCloseLine from '~icons/mingcute/close-line';
	import MingcuteLeftLine from '~icons/mingcute/left-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';

	let {
		steps = [],
		trigger,
		showProgress = true,
		showClose = true,
		closeLabel,
		lazyMount = true,
		unmountOnExit = true,
		...rest
	}: {
		steps?: TourStepDetails[];
		trigger?: Snippet<[() => void]>;
		showProgress?: boolean;
		showClose?: boolean;
		/** The close button's accessible name, such as "Close". */
		closeLabel: string;
		lazyMount?: boolean;
		unmountOnExit?: boolean;
		[key: string]: unknown;
	} = $props();

	const tour = useTour(() => ({ steps }));

	function handleStart() {
		tour().start();
	}
</script>

<Tour.Root {lazyMount} {tour} {unmountOnExit} {...rest}>
	{#if trigger}
		{@render trigger(handleStart)}
	{/if}
	<Portal>
		<Tour.Backdrop
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-90 bg-scrim"
			data-slot="tour-overlay"
		/>
		<Tour.Positioner
			class="z-90 flex items-center justify-center data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=tooltip]:absolute"
			data-slot="tour-positioner"
		>
			<Tour.Content
				class={cn(
					'relative z-90 w-full max-w-md',
					'flex flex-col gap-4',
					'rounded-lg border bg-background shadow-lg',
					'focus:ring-0 focus:outline-none',
					'data-[state=closed]:animate-out data-[state=open]:animate-in',
					'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
					'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95'
				)}
				data-slot="tour-content"
			>
				{#if showClose}
					<Tour.CloseTrigger
						class="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-lg border-none text-muted opacity-70 transition-all hover:bg-hover hover:opacity-100"
						aria-label={closeLabel}
						data-slot="tour-close-trigger"
					>
						<MingcuteCloseLine class="size-4" aria-hidden="true" />
					</Tour.CloseTrigger>
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
											class={cn(
												'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors',
												action.action === 'dismiss' || action.action === 'prev'
													? 'border border-border bg-transparent hover:bg-hover hover:text-fg'
													: 'bg-primary text-on-primary hover:bg-primary/90'
											)}
											data-slot="tour-action-trigger"
										>
											{#if action.action === 'prev'}
												<MingcuteLeftLine class="size-3.5" />
											{/if}
											{action.label}
											{#if action.action === 'next'}
												<MingcuteRightLine class="size-3.5" />
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
