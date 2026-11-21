<!--
@component
Docs: Swap. A playground over `swap` and the mounting props, then icon buttons that swap their
icon as they are pressed, each named by a tooltip, and a swap between two words.
-->
<script lang="ts">
	import { Button } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import { Swap } from '#lib/components/swap/index.js';
	import MingcuteMoonLine from '~icons/mingcute/moon-line';
	import MingcutePauseLine from '~icons/mingcute/pause-line';
	import MingcutePlayLine from '~icons/mingcute/play-line';
	import MingcuteSunLine from '~icons/mingcute/sun-line';
	import MingcuteVolumeLine from '~icons/mingcute/volume-line';
	import MingcuteVolumeOffLine from '~icons/mingcute/volume-off-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean } from '../playground/controls';

	let light = $state(false);
	let muted = $state(false);
	let playing = $state(false);
	let saved = $state(false);
</script>

{#snippet sun()}<MingcuteSunLine class="size-6" aria-hidden="true" />{/snippet}
{#snippet moon()}<MingcuteMoonLine class="size-6" aria-hidden="true" />{/snippet}
{#snippet volumeOn()}<MingcuteVolumeLine class="size-5" aria-hidden="true" />{/snippet}
{#snippet volumeOff()}<MingcuteVolumeOffLine class="size-5" aria-hidden="true" />{/snippet}
{#snippet play()}<MingcutePlayLine class="size-5" aria-hidden="true" />{/snippet}
{#snippet pause()}<MingcutePauseLine class="size-5" aria-hidden="true" />{/snippet}
{#snippet savedText()}<span>Saved</span>{/snippet}
{#snippet saveText()}<span>Save</span>{/snippet}

<div class="grid gap-4">
	<Playground
		description="lazyMount and unmountOnExit decide when each content is in the page."
		controls={{
			swap: boolean(),
			lazyMount: boolean(true),
			unmountOnExit: boolean(true)
		}}
	>
		{#snippet example(values)}
			<Swap
				swap={values.swap}
				lazyMount={values.lazyMount}
				unmountOnExit={values.unmountOnExit}
				on={sun}
				off={moon}
			/>
		{/snippet}
	</Playground>
	<Card title="Icon buttons" description="The tooltip names what pressing the button does.">
		<div class="flex items-center gap-2">
			<IconButton label={light ? 'Dark theme' : 'Light theme'} onclick={() => (light = !light)}>
				<Swap swap={light} on={moon} off={sun} />
			</IconButton>
			<IconButton label={muted ? 'Unmute' : 'Mute'} onclick={() => (muted = !muted)}>
				<Swap swap={muted} on={volumeOff} off={volumeOn} />
			</IconButton>
			<IconButton label={playing ? 'Pause' : 'Play'} onclick={() => (playing = !playing)}>
				<Swap swap={playing} on={pause} off={play} />
			</IconButton>
		</div>
	</Card>
	<Card title="Text" description="Any content swaps, such as a button's label.">
		<Button onclick={() => (saved = !saved)}>
			<Swap swap={saved} on={savedText} off={saveText} />
		</Button>
	</Card>
</div>
