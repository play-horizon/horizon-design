<!--
@component
Docs: Splitter. Live examples of the Splitter component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Splitter, SplitterPanel, SplitterResizeTrigger } from '$lib/components/splitter';

	const splitterPanels = [{ id: 'a' }, { id: 'b' }];
</script>

<section id="splitter">
	<Card>
		<div>
			<div class="h-40 overflow-hidden rounded-lg border border-border">
				<Splitter panels={splitterPanels}>
					<SplitterPanel id="a">
						<div class="flex h-full items-center justify-center p-4 text-sm text-muted">
							Panel A
						</div>
					</SplitterPanel>
					<SplitterResizeTrigger id="a:b" />
					<SplitterPanel id="b">
						<div class="flex h-full items-center justify-center p-4 text-sm text-muted">
							Panel B
						</div>
					</SplitterPanel>
				</Splitter>
			</div>
		</div>
	</Card>
</section>
