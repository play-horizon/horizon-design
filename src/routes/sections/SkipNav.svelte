<!--
@component
Docs: SkipNav. A playground over the link's text and target: it stays hidden until it has the
keyboard focus, then shows at the top left of the box it is placed in.
-->
<script lang="ts">
	import { SkipNav } from '#lib/components/skip-nav/index.js';
	import Playground from '../playground/Playground.svelte';
	import { choice, text } from '../playground/controls';
</script>

<div class="grid gap-4">
	<Playground
		description="Press Tab until the link has the focus; Enter skips to its target."
		controls={{
			label: text('Skip to content'),
			href: choice(['#skip-nav-target', '#main-content'] as const)
		}}
	>
		{#snippet example(values)}
			<div class="relative grid min-h-28 w-full place-items-center rounded-md bg-sunken p-4">
				<SkipNav href={values.href}>{values.label}</SkipNav>
				<p id="skip-nav-target" tabindex="-1" class="text-sm text-muted outline-none">
					The page's main content starts here.
				</p>
			</div>
		{/snippet}
	</Playground>
</div>
