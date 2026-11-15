<!--
@component
Test fixture of `Splitter.test.ts`: two panels and the named handle between them.
-->
<script lang="ts">
	import Splitter from './Splitter.svelte';
	import SplitterPanel from './SplitterPanel.svelte';
	import SplitterResizeTrigger from './SplitterResizeTrigger.svelte';
</script>

<Splitter panels={[{ id: 'a' }, { id: 'b' }]}>
	<SplitterPanel id="a">Scene</SplitterPanel>
	<SplitterResizeTrigger id="a:b" label="Resize the scene" />
	<SplitterPanel id="b">Inspector</SplitterPanel>
</Splitter>
