<!--
@component
One component page of the docs site: the component's name, the entry point that exports it, and
its live examples.
-->
<script lang="ts">
	let { data } = $props();

	const importLine = $derived(
		`import { … } from '${data.kit === 'editor' ? 'horizon-design/editor' : 'horizon-design'}'`
	);
</script>

<svelte:head>
	<title>{data.label} · horizon-design</title>
</svelte:head>

<p class="section-tag">{data.group}</p>
<h1 class="text-3xl font-bold">{data.label}</h1>
<p class="mt-1 mb-6 text-sm text-muted">
	<code class="font-mono select-text">{importLine}</code>
</p>
<data.component />
