<!--
@component
Docs: Toast. A playground over a toast (its type, title, description and duration) and the
toaster's placement, then a button per type, and a loading toast that turns into a success. Each
toast's close button carries a tooltip with its name.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Toaster, createToaster } from '#lib/components/toast/index.js';
	import MingcuteAlertLine from '~icons/mingcute/alert-line';
	import MingcuteCheckCircleLine from '~icons/mingcute/check-circle-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteLoading3Fill from '~icons/mingcute/loading-3-fill';
	import Playground from '../playground/Playground.svelte';
	import { choice, number, text } from '../playground/controls';

	const placements = [
		'bottom-end',
		'bottom',
		'bottom-start',
		'top-end',
		'top',
		'top-start'
	] as const;
	const types = ['info', 'success', 'warning', 'error', 'loading'] as const;

	// A toaster's placement is set when it is made: one toaster per placement.
	const playgroundToasters = Object.fromEntries(
		placements.map((placement) => [placement, createToaster({ placement })])
	) as Record<(typeof placements)[number], ReturnType<typeof createToaster>>;

	const toaster = createToaster({ placement: 'bottom-end' });

	const messages = {
		info: { title: 'Update available', description: 'Restart to install version 2.4.' },
		success: { title: 'Published', description: 'Your game is live.' },
		warning: { title: 'Storage almost full', description: 'You have used 90% of your space.' },
		error: { title: 'Upload failed', description: 'Check your connection and try again.' }
	};

	function showToast(type: keyof typeof messages) {
		toaster.create({ ...messages[type], type });
	}

	function showLoadingToast() {
		toaster.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
			loading: { title: 'Saving…', description: 'Your changes are being saved.' },
			success: { title: 'Saved', description: 'Your changes were saved.' },
			error: { title: 'Error', description: 'Your changes could not be saved.' }
		});
	}
</script>

<Toaster {toaster} label="Notifications" closeLabel="Close" />

<div class="grid gap-4">
	<Playground
		description="Show a toast with these values; hover it to see its close button."
		controls={{
			type: choice(types),
			title: text('Update available'),
			description: text('Restart to install version 2.4.'),
			duration: number(5000, { min: 1000, max: 30000, step: 1000 }),
			placement: choice(placements)
		}}
	>
		{#snippet example(values)}
			{@const current = playgroundToasters[values.placement]}
			<Toaster toaster={current} label="Playground notifications" closeLabel="Close" />
			<Button
				variant="primary"
				onclick={() =>
					current.create({
						type: values.type,
						title: values.title,
						description: values.description,
						duration: values.duration
					})}
			>
				Show toast
			</Button>
		{/snippet}
	</Playground>
	<Card title="Types" description="Info, success, warning and error tints.">
		<div class="flex flex-wrap gap-2">
			<Button onclick={() => showToast('info')}>
				<MingcuteInformationLine aria-hidden="true" />
				Info
			</Button>
			<Button onclick={() => showToast('success')}>
				<MingcuteCheckCircleLine aria-hidden="true" />
				Success
			</Button>
			<Button onclick={() => showToast('warning')}>
				<MingcuteAlertLine aria-hidden="true" />
				Warning
			</Button>
			<Button variant="danger" onclick={() => showToast('error')}>
				<MingcuteCloseCircleLine aria-hidden="true" />
				Error
			</Button>
		</div>
	</Card>
	<Card title="Loading" description="A loading toast that turns into a success when work ends.">
		<Button onclick={showLoadingToast}>
			<MingcuteLoading3Fill aria-hidden="true" />
			Save
		</Button>
	</Card>
</div>
