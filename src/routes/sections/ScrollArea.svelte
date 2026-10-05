<script lang="ts">
	import { Card } from '$lib/components/card';
	import { ScrollArea } from '$lib/components/scroll-area';

	const scrollItems = Array.from({ length: 20 }, (_, i) => ({
		id: i + 1,
		text: `Item ${i + 1} — lorem ipsum dolor sit amet consectetur`
	}));
</script>

<section id="scroll-area">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Scroll Area</h2>
	<Card>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
					Overflowing — scrollbar visible
				</p>
				<ScrollArea class="border-border h-52 rounded-lg border p-4">
					<div class="space-y-3">
						{#each scrollItems as item (item.id)}
							<div
								class="hover:bg-accent-hover group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
							>
								<div
									class="bg-primary-subtle-bg text-primary group-hover:bg-primary-glow flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
								>
									{item.id}
								</div>
								<p
									class="text-muted-foreground group-hover:text-foreground text-sm transition-colors"
								>
									{item.text}
								</p>
							</div>
						{/each}
					</div>
				</ScrollArea>
			</div>
			<div class="space-y-2">
				<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
					Fits — no scrollbar
				</p>
				<ScrollArea class="border-border h-52 rounded-lg border p-4">
					<div class="space-y-3">
						{#each scrollItems.slice(0, 2) as item (item.id)}
							<div
								class="hover:bg-accent-hover group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
							>
								<div
									class="bg-primary-subtle-bg text-primary group-hover:bg-primary-glow flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
								>
									{item.id}
								</div>
								<p
									class="text-muted-foreground group-hover:text-foreground text-sm transition-colors"
								>
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
			<p class="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
				Resizable — drag the corner
			</p>
			<div
				class="border-border min-h-24 w-full resize-y overflow-hidden rounded-lg border"
				style="height: 80px;"
			>
				<ScrollArea class="size-full p-4">
					<div class="space-y-3">
						{#each scrollItems.slice(0, 6) as item (item.id)}
							<div
								class="hover:bg-accent-hover group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
							>
								<div
									class="bg-primary-subtle-bg text-primary group-hover:bg-primary-glow flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors"
								>
									{item.id}
								</div>
								<p
									class="text-muted-foreground group-hover:text-foreground text-sm transition-colors"
								>
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
