<!--
@component
Docs: Card. Live examples of the Card component.
-->
<script lang="ts">
	import { Avatar } from '$lib/components/avatar';
	import { Badge } from '$lib/components/badge';
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Progress } from '$lib/components/progress';
	import { Status } from '$lib/components/status';
	import MingcuteArrowUpLine from '~icons/mingcute/arrow-up-line';
</script>

<section id="card">
	<div class="grid gap-4 md:grid-cols-3">
		<Card title="Simple Card" description="A basic card with header and footer.">
			<p class="text-sm text-muted">Card body content renders here with full styling support.</p>
			{#snippet footer()}
				<Button size="sm" variant="default">Cancel</Button>
				<Button size="sm">Confirm</Button>
			{/snippet}
		</Card>

		<Card title="Stats Card" description="Dashboard overview">
			<div class="space-y-3">
				<div class="text-3xl font-bold text-primary">42,890</div>
				<div class="flex items-center gap-1.5 text-xs text-success">
					<MingcuteArrowUpLine class="size-3.5" aria-hidden="true" />
					<span>+12.5% from last month</span>
				</div>
				<Progress value={72} />
			</div>
		</Card>

		<Card title="User Card">
			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<div class="relative">
						<Avatar size="md" fallback="JD" />
						<span class="absolute right-0 bottom-0">
							<Status variant="online" class="ring-2 ring-background" />
						</span>
					</div>
					<div>
						<p class="text-sm font-semibold">John Doe</p>
						<p class="text-xs text-muted">john@example.com</p>
					</div>
				</div>
				<div class="flex gap-2">
					<Badge variant="neutral">Admin</Badge>
					<Badge variant="neutral">Pro</Badge>
				</div>
			</div>
			{#snippet footer()}
				<Button size="sm" class="w-full" variant="default">View Profile</Button>
			{/snippet}
		</Card>
	</div>
</section>
