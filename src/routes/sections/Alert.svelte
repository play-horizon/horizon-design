<!--
@component
Docs: Alert. A playground over every prop (the variant, the title and description, a custom icon,
extra content), then every variant side by side, and alerts with an action, a custom icon, and
only a title or only a description. Warnings and errors are `alert`s, the others `status`es.
-->
<script lang="ts">
	import { Alert } from '#lib/components/alert/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import MingcuteTimeLine from '~icons/mingcute/time-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, text } from '../playground/controls';

	const variants = ['default', 'info', 'success', 'warning', 'error', 'destructive'] as const;
	const samples: Record<(typeof variants)[number], { title: string; description: string }> = {
		default: { title: 'Restart required', description: 'The editor restarts after the update.' },
		info: { title: 'Saving', description: 'Your changes are being saved.' },
		success: { title: 'Published', description: 'Sky Racer is live for every player.' },
		warning: { title: 'Large upload', description: 'This model has over 1 million triangles.' },
		error: { title: 'Upload failed', description: 'The file is not a valid glTF model.' },
		destructive: { title: 'Game deleted', description: 'Its places and saves are gone.' }
	};
</script>

{#snippet clock()}
	<MingcuteTimeLine class="size-4" aria-hidden="true" />
{/snippet}

<div class="grid gap-4">
	<Playground
		controls={{
			variant: choice(variants, 'info'),
			title: text('Saving'),
			description: text('Your changes are being saved.'),
			customIcon: boolean(),
			action: boolean()
		}}
	>
		{#snippet example(values)}
			<Alert
				class="w-full"
				variant={values.variant}
				title={values.title}
				description={values.description}
				icon={values.customIcon ? clock : undefined}
			>
				{#if values.action}
					<div class="mt-2"><Button size="sm">Retry</Button></div>
				{/if}
			</Alert>
		{/snippet}
	</Playground>
	<Card title="Variants" description="destructive is the same as error.">
		<div class="grid gap-3">
			{#each variants as variant (variant)}
				<Alert
					{variant}
					title={samples[variant].title}
					description={samples[variant].description}
				/>
			{/each}
		</div>
	</Card>
	<Card title="Content">
		<div class="grid gap-3">
			<Alert variant="error" title="Upload failed" description="The connection was lost.">
				<div class="mt-2 flex gap-2">
					<Button size="sm">Retry</Button>
					<Button size="sm" variant="ghost">Cancel</Button>
				</div>
			</Alert>
			<Alert title="Maintenance tonight" description="Servers restart at 02:00 UTC." icon={clock} />
			<Alert variant="success" title="Saved" />
			<Alert variant="warning" description="Only a description, without a title." />
		</div>
	</Card>
</div>
