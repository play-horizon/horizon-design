<script lang="ts">
	import { Card } from '$lib/components/card';
	import { BottomNavigation } from '$lib/components/bottom-navigation';
	import MingcuteHome4Line from '~icons/mingcute/home-4-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
</script>

<section id="bottom-navigation">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Bottom Navigation</h2>
	<Card>
		<div>
			<div class="border-border overflow-hidden rounded-xl border">
				<div class="bg-muted-surface-dim flex h-10 items-center justify-center">
					<span class="text-muted-foreground text-xs">App content area</span>
				</div>
				{#snippet bnHome()}<MingcuteHome4Line class="size-5" />{/snippet}
				{#snippet bnSearch()}<MingcuteSearchLine class="size-5" />{/snippet}
				{#snippet bnProfile()}<MingcuteUser1Line class="size-5" />{/snippet}
				<BottomNavigation
					class="relative top-auto right-auto bottom-auto left-auto z-0"
					items={[
						{ label: 'Home', href: '#', icon: bnHome, active: true },
						{ label: 'Search', href: '#', icon: bnSearch },
						{ label: 'Profile', href: '#', icon: bnProfile }
					]}
				/>
			</div>
		</div>
	</Card>
</section>
