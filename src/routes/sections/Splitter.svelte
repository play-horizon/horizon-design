<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Splitter, SplitterPanel, SplitterResizeTrigger } from '$lib/components/splitter';

	const splitterPanels = [{ id: 'a' }, { id: 'b' }];
</script>

<section id="splitter">
	<p class="section-tag">Layout</p>
	<h2 class="mb-6 text-2xl font-bold">Splitter</h2>
	<Card>
		<div>
			<div class="border-border h-40 overflow-hidden rounded-lg border">
				<Splitter panels={splitterPanels}>
					<SplitterPanel id="a">
						<div class="text-muted-foreground flex h-full items-center justify-center p-4 text-sm">
							Panel A
						</div>
					</SplitterPanel>
					<SplitterResizeTrigger id="a:b" />
					<SplitterPanel id="b">
						<div class="text-muted-foreground flex h-full items-center justify-center p-4 text-sm">
							Panel B
						</div>
					</SplitterPanel>
				</Splitter>
			</div>
		</div>
	</Card>
</section>
