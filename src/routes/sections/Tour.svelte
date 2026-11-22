<!--
@component
Docs: Tour. A playground over the tour's props (the progress line and the close button, whose
tooltip names it, what closes the tour, keyboard navigation, blocking the page, the spotlight)
and its steps (pointing at elements of a toolbar, on a side, or shown as dialogs), then a tour
made only of dialogs.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import { Tour } from '#lib/components/tour/index.js';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number } from '../playground/controls';

	type Placement = 'top' | 'bottom' | 'left' | 'right';

	const progressText = ({ current, total }: { current: number; total: number }) =>
		`${current + 1} of ${total}`;

	function element(id: string) {
		return () => document.getElementById(id);
	}

	function toolbarSteps(pointAtTargets: boolean, placement: Placement) {
		const type = pointAtTargets ? ('tooltip' as const) : ('dialog' as const);
		return [
			{
				id: 'welcome',
				type: 'dialog' as const,
				title: 'Welcome',
				description: 'A short tour of the toolbar.',
				actions: [{ label: 'Next', action: 'next' as const }]
			},
			{
				id: 'search',
				type,
				target: pointAtTargets ? element('tour-search') : undefined,
				placement,
				title: 'Search',
				description: 'Find any game by its name or its creator.',
				actions: [
					{ label: 'Back', action: 'prev' as const },
					{ label: 'Next', action: 'next' as const }
				]
			},
			{
				id: 'create',
				type,
				target: pointAtTargets ? element('tour-create') : undefined,
				placement,
				title: 'New game',
				description: 'Start a game from a template.',
				actions: [
					{ label: 'Back', action: 'prev' as const },
					{ label: 'Finish', action: 'dismiss' as const }
				]
			}
		];
	}

	const dialogSteps = [
		{
			id: 'hello',
			type: 'dialog' as const,
			title: 'Welcome',
			description: 'This is the first step of the tour.',
			actions: [{ label: 'Next', action: 'next' as const }]
		},
		{
			id: 'middle',
			type: 'dialog' as const,
			title: 'Step 2',
			description: 'Back and Next move between the steps.',
			actions: [
				{ label: 'Back', action: 'prev' as const },
				{ label: 'Next', action: 'next' as const }
			]
		},
		{
			id: 'done',
			type: 'dialog' as const,
			title: 'Done',
			description: 'You have completed the tour.',
			actions: [{ label: 'Finish', action: 'dismiss' as const }]
		}
	];
</script>

{#snippet startButton(start: () => void)}
	<Button variant="primary" onclick={start}>Start the tour</Button>
{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			pointAtTargets: boolean(true),
			placement: choice(['bottom', 'top', 'left', 'right'] as const),
			showProgress: boolean(true),
			showClose: boolean(true),
			closeOnInteractOutside: boolean(true),
			closeOnEscape: boolean(true),
			keyboardNavigation: boolean(true),
			preventInteraction: boolean(),
			spotlightRadius: number(4, { min: 0, max: 24 })
		}}
	>
		{#snippet example(values)}
			<div class="flex w-full flex-col items-center gap-6">
				<div class="flex items-center gap-2 rounded-lg border border-border bg-sunken p-1">
					<!-- The steps' targets: the tooltips own their buttons' ids. -->
					<span id="tour-search" class="flex">
						<IconButton label="Search"><MingcuteSearchLine aria-hidden="true" /></IconButton>
					</span>
					<span id="tour-create" class="flex">
						<IconButton label="New game"><MingcuteAddLine aria-hidden="true" /></IconButton>
					</span>
				</div>
				<Tour
					closeLabel="Close the tour"
					{progressText}
					trigger={startButton}
					steps={toolbarSteps(values.pointAtTargets, values.placement)}
					showProgress={values.showProgress}
					showClose={values.showClose}
					closeOnInteractOutside={values.closeOnInteractOutside}
					closeOnEscape={values.closeOnEscape}
					keyboardNavigation={values.keyboardNavigation}
					preventInteraction={values.preventInteraction}
					spotlightRadius={values.spotlightRadius}
				/>
			</div>
		{/snippet}
	</Playground>
	<Card title="Dialogs" description="A tour whose steps all show in the middle of the window.">
		<Tour closeLabel="Close the tour" {progressText} trigger={startButton} steps={dialogSteps} />
	</Card>
</div>
