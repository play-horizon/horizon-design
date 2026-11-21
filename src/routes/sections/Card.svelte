<!--
@component
Docs: Card. A playground over every part (the title, the description, the content, the footer),
then cards with every part, with a header and content only, with content only, and two cards
built for an app: a stat and a person.
-->
<script lang="ts">
	import { Avatar } from '#lib/components/avatar/index.js';
	import { Badge } from '#lib/components/badge/index.js';
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Progress } from '#lib/components/progress/index.js';
	import { Status } from '#lib/components/status/index.js';
	import MingcuteArrowUpLine from '~icons/mingcute/arrow-up-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, text } from '../playground/controls';
</script>

{#snippet actions()}
	<Button size="sm" variant="default">Cancel</Button>
	<Button size="sm" variant="primary">Confirm</Button>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="An empty title or description is left out."
		controls={{
			title: text('Invite a friend'),
			description: text('They join your next session.'),
			content: boolean(true),
			footer: boolean(true)
		}}
	>
		{#snippet example(values)}
			<Card
				class="w-full max-w-sm"
				title={values.title}
				description={values.description}
				footer={values.footer ? actions : undefined}
			>
				{#if values.content}
					<p class="text-sm text-muted">Invites expire after seven days.</p>
				{/if}
			</Card>
		{/snippet}
	</Playground>
	<div class="grid gap-4 md:grid-cols-3">
		<Card title="Every part" description="A title, a description, content and a footer.">
			<p class="text-sm text-muted">The footer holds the card's buttons.</p>
			{#snippet footer()}{@render actions()}{/snippet}
		</Card>
		<Card title="Header and content">
			<p class="text-sm text-muted">Without a footer.</p>
		</Card>
		<Card>
			<p class="text-sm text-muted">Content only, without a header or footer.</p>
		</Card>
		<Card title="Players" description="This week">
			<div class="space-y-3">
				<div class="text-3xl font-bold text-primary">42,890</div>
				<div class="flex items-center gap-1.5 text-xs text-success">
					<MingcuteArrowUpLine class="size-3.5" aria-hidden="true" />
					<span>+12.5% from last week</span>
				</div>
				<Progress value={72} label="Weekly goal" />
			</div>
		</Card>
		<Card title="Member">
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<div class="relative">
						<Avatar size="md" fallback="SI" alt="Sam Ito" />
						<span class="absolute right-0 bottom-0">
							<Status variant="online" class="ring-2 ring-surface" />
						</span>
					</div>
					<div>
						<p class="text-sm font-semibold">Sam Ito</p>
						<p class="text-xs text-muted">sam@example.com</p>
					</div>
				</div>
				<div class="flex gap-2">
					<Badge>Owner</Badge>
					<Badge variant="accent">Pro</Badge>
				</div>
			</div>
			{#snippet footer()}
				<Button size="sm" class="w-full">View profile</Button>
			{/snippet}
		</Card>
	</div>
</div>
