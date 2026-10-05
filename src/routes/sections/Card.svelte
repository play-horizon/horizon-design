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
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Card</h2>
	<div class="grid gap-4 md:grid-cols-3">
		<Card title="Simple Card" description="A basic card with header and footer.">
			<p class="text-muted-foreground text-sm">
				Card body content renders here with full styling support.
			</p>
			{#snippet footer()}
				<Button size="sm" variant="outline">Cancel</Button>
				<Button size="sm">Confirm</Button>
			{/snippet}
		</Card>

		<Card title="Stats Card" description="Dashboard overview">
			<div class="space-y-3">
				<div class="text-primary text-3xl font-bold">42,890</div>
				<div class="text-success flex items-center gap-1.5 text-xs">
					<MingcuteArrowUpLine class="size-3.5" />
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
							<Status variant="online" class="ring-background ring-2" />
						</span>
					</div>
					<div>
						<p class="text-sm font-semibold">John Doe</p>
						<p class="text-muted-foreground text-xs">john@example.com</p>
					</div>
				</div>
				<div class="flex gap-2">
					<Badge variant="secondary">Admin</Badge>
					<Badge variant="outline">Pro</Badge>
				</div>
			</div>
			{#snippet footer()}
				<Button size="sm" class="w-full" variant="outline">View Profile</Button>
			{/snippet}
		</Card>
	</div>
</section>
