<!--
@component
Docs: BottomNavigation. Live examples of the BottomNavigation component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { BottomNavigation } from '#lib/components/bottom-navigation/index.js';
	import MingcuteHome4Line from '~icons/mingcute/home-4-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import MingcuteUser1Line from '~icons/mingcute/user-1-line';
</script>

<section id="bottom-navigation">
	<Card>
		<div>
			<div class="overflow-hidden rounded-xl border border-border">
				<div class="flex h-10 items-center justify-center bg-sunken">
					<span class="text-xs text-muted">App content area</span>
				</div>
				{#snippet bnHome()}<MingcuteHome4Line class="size-5" aria-hidden="true" />{/snippet}
				{#snippet bnSearch()}<MingcuteSearchLine class="size-5" aria-hidden="true" />{/snippet}
				{#snippet bnProfile()}<MingcuteUser1Line class="size-5" aria-hidden="true" />{/snippet}
				<BottomNavigation
					label="Main"
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
