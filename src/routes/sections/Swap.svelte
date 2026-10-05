<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Swap } from '$lib/components/swap';
	import MingcuteMoonLine from '~icons/mingcute/moon-line';
	import MingcutePauseLine from '~icons/mingcute/pause-line';
	import MingcutePlayLine from '~icons/mingcute/play-line';
	import MingcuteSunLine from '~icons/mingcute/sun-line';
	import MingcuteVolumeLine from '~icons/mingcute/volume-line';
	import MingcuteVolumeOffLine from '~icons/mingcute/volume-off-line';

	let swapOn = $state(false);

	let swapVolume = $state(true);

	let swapPlay = $state(false);
</script>

<section id="swap">
	<p class="section-tag">Actions</p>
	<h2 class="mb-6 text-2xl font-bold">Swap</h2>
	<Card>
		<div>
			<p class="text-muted-foreground mb-4 text-sm">
				Toggle between two states with animated transitions.
			</p>
			<div class="flex items-center gap-6">
				{#snippet swapSun()}<MingcuteSunLine class="size-6" />{/snippet}
				{#snippet swapMoon()}<MingcuteMoonLine class="size-6" />{/snippet}
				{#snippet swapVolOn()}<MingcuteVolumeLine class="size-6" />{/snippet}
				{#snippet swapVolOff()}<MingcuteVolumeOffLine class="size-6" />{/snippet}
				{#snippet swapPlayIcon()}<MingcutePlayLine class="size-6" />{/snippet}
				{#snippet swapPauseIcon()}<MingcutePauseLine class="size-6" />{/snippet}
				<button onclick={() => (swapOn = !swapOn)} class="hover:bg-accent rounded-lg p-2">
					<Swap swap={swapOn} on={swapSun} off={swapMoon} />
				</button>
				<button onclick={() => (swapVolume = !swapVolume)} class="hover:bg-accent rounded-lg p-2">
					<Swap swap={swapVolume} on={swapVolOn} off={swapVolOff} />
				</button>
				<button onclick={() => (swapPlay = !swapPlay)} class="hover:bg-accent rounded-lg p-2">
					<Swap swap={swapPlay} on={swapPlayIcon} off={swapPauseIcon} />
				</button>
			</div>
		</div>
	</Card>
</section>
