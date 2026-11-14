<!--
@component
Docs: ScrollArea. Live examples of the ScrollArea component.
-->
<script lang="ts">
	import { Card } from '#lib/components/card/index.js';
	import { ScrollArea } from '#lib/components/scroll-area/index.js';

	const scrollItems = Array.from({ length: 20 }, (_, i) => ({
		id: i + 1,
		text: `Item ${i + 1} — lorem ipsum dolor sit amet consectetur`
	}));
</script>

<section id="scroll-area">
	<Card>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="space-y-2">
				<p class="text-xs font-semibold tracking-widest text-muted uppercase">
					Overflowing — scrollbar visible
				</p>
				<ScrollArea class="h-52 rounded-lg border border-border p-4">
					<div class="space-y-3">
						{#each scrollItems as item (item.id)}
							<div
								class="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-hover"
							>
								<div
									class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xs font-bold text-primary transition-colors group-hover:bg-primary/25"
								>
									{item.id}
								</div>
								<p class="text-sm text-muted transition-colors group-hover:text-fg">
									{item.text}
								</p>
							</div>
						{/each}
					</div>
				</ScrollArea>
			</div>
			<div class="space-y-2">
				<p class="text-xs font-semibold tracking-widest text-muted uppercase">
					Fits — no scrollbar
				</p>
				<ScrollArea class="h-52 rounded-lg border border-border p-4">
					<div class="space-y-3">
						{#each scrollItems.slice(0, 2) as item (item.id)}
							<div
								class="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-hover"
							>
								<div
									class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xs font-bold text-primary transition-colors group-hover:bg-primary/25"
								>
									{item.id}
								</div>
								<p class="text-sm text-muted transition-colors group-hover:text-fg">
									{item.text}
								</p>
							</div>
						{/each}
					</div>
				</ScrollArea>
			</div>
		</div>
	</Card>
	<Card class="mt-4">
		<div class="space-y-2">
			<p class="text-xs font-semibold tracking-widest text-muted uppercase">
				Resizable — drag the corner
			</p>
			<div
				class="min-h-24 w-full resize-y overflow-hidden rounded-lg border border-border"
				style="height: 80px;"
			>
				<ScrollArea class="size-full p-4">
					<div class="space-y-3">
						{#each scrollItems.slice(0, 6) as item (item.id)}
							<div
								class="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-hover"
							>
								<div
									class="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-xs font-bold text-primary transition-colors group-hover:bg-primary/25"
								>
									{item.id}
								</div>
								<p class="text-sm text-muted transition-colors group-hover:text-fg">
									{item.text}
								</p>
							</div>
						{/each}
					</div>
				</ScrollArea>
			</div>
		</div>
	</Card>
</section>
