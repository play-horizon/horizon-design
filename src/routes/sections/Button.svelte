<script lang="ts">
	import { Button } from '$lib/components/button';
	import { Card } from '$lib/components/card';
	import { Separator } from '$lib/components/separator';
	import MingcuteAddLine from '~icons/mingcute/add-line';
	import MingcuteAlertLine from '~icons/mingcute/alert-line';
	import MingcuteBellRingingLine from '~icons/mingcute/bell-ringing-line';
	import MingcuteCheckCircleLine from '~icons/mingcute/check-circle-line';
	import MingcuteCloseCircleLine from '~icons/mingcute/close-circle-line';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteMore1Line from '~icons/mingcute/more-1-line';
	import MingcuteNotificationLine from '~icons/mingcute/notification-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import MingcuteSettings2Line from '~icons/mingcute/settings-2-line';

	let isLoading = $state(false);

	function triggerLoading() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	}
</script>

<section id="button">
	<p class="section-tag">Actions</p>
	<h2 class="mb-6 text-2xl font-bold">Button</h2>
	<Card>
		<div class="space-y-6">
			<div>
				<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
					Variants
				</p>
				<div class="flex flex-wrap gap-3">
					<Button variant="default">Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="link">Link</Button>
				</div>
			</div>
			<Separator />
			<div>
				<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
					Semantic colors
				</p>
				<div class="flex flex-wrap gap-3">
					<Button variant="success">
						<MingcuteCheckCircleLine class="size-4" />
						Success
					</Button>
					<Button variant="warning">
						<MingcuteAlertLine class="size-4" />
						Warning
					</Button>
					<Button variant="info">
						<MingcuteInformationLine class="size-4" />
						Info
					</Button>
					<Button variant="destructive">
						<MingcuteCloseCircleLine class="size-4" />
						Destructive
					</Button>
				</div>
			</div>
			<Separator />
			<div>
				<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
					Sizes
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
					<Button size="xl">Extra Large</Button>
				</div>
			</div>
			<Separator />
			<div>
				<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
					Icon buttons
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<Button size="icon-md" variant="ghost" aria-label="Search">
						<MingcuteSearchLine class="size-4" />
					</Button>
					<Button size="icon-md" variant="ghost" aria-label="Settings">
						<MingcuteSettings2Line class="size-4" />
					</Button>
					<Button size="icon-md" variant="ghost" aria-label="Notifications">
						<MingcuteNotificationLine class="size-4" />
					</Button>
					<Button size="icon-md" variant="outline" aria-label="Alerts">
						<MingcuteBellRingingLine class="size-4" />
					</Button>
					<Button size="icon-md" variant="secondary" aria-label="Add">
						<MingcuteAddLine class="size-4" />
					</Button>
					<Button size="icon-md" variant="ghost" aria-label="More">
						<MingcuteMore1Line class="size-4" />
					</Button>
				</div>
			</div>
			<Separator />
			<div>
				<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
					States
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<Button pill>Pill Shape</Button>
					<Button {isLoading} onclick={triggerLoading}>
						{isLoading ? 'Loading…' : 'Click to Load'}
					</Button>
					<Button disabled>Disabled</Button>
				</div>
			</div>
		</div>
	</Card>
</section>
