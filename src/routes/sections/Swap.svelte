<!--
@component
Docs: Swap. Live examples of the Swap component.
-->
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
	<Card>
		<div>
			<p class="mb-4 text-sm text-muted">Toggle between two states with animated transitions.</p>
			<div class="flex items-center gap-6">
				{#snippet swapSun()}<MingcuteSunLine class="size-6" />{/snippet}
				{#snippet swapMoon()}<MingcuteMoonLine class="size-6" />{/snippet}
				{#snippet swapVolOn()}<MingcuteVolumeLine class="size-6" />{/snippet}
				{#snippet swapVolOff()}<MingcuteVolumeOffLine class="size-6" />{/snippet}
				{#snippet swapPlayIcon()}<MingcutePlayLine class="size-6" />{/snippet}
				{#snippet swapPauseIcon()}<MingcutePauseLine class="size-6" />{/snippet}
				<button onclick={() => (swapOn = !swapOn)} class="rounded-lg p-2 hover:bg-hover">
					<Swap swap={swapOn} on={swapSun} off={swapMoon} />
				</button>
				<button onclick={() => (swapVolume = !swapVolume)} class="rounded-lg p-2 hover:bg-hover">
					<Swap swap={swapVolume} on={swapVolOn} off={swapVolOff} />
				</button>
				<button onclick={() => (swapPlay = !swapPlay)} class="rounded-lg p-2 hover:bg-hover">
					<Swap swap={swapPlay} on={swapPlayIcon} off={swapPauseIcon} />
				</button>
			</div>
		</div>
	</Card>
</section>
