<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Collapsible } from '$lib/components/collapsible';
	import MingcuteFolder2Line from '~icons/mingcute/folder-2-line';
	import MingcuteGitBranchLine from '~icons/mingcute/git-branch-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
</script>

<section id="collapsible">
	<p class="section-tag">Navigation</p>
	<h2 class="mb-6 text-2xl font-bold">Collapsible</h2>
	<Card>
		<div>
			<Collapsible>
				{#snippet trigger()}
					<MingcuteFolder2Line class="text-primary size-4" />
					<span>Open repositories</span>
					<MingcuteRightLine
						class="ml-auto size-4 transition-transform data-[state=open]:rotate-90"
					/>
				{/snippet}
				<div class="border-border mt-2 ml-4 space-y-1 border-l pl-4">
					{#each ['horizon-design', 'shark-ui', 'svelte-kit-template', 'ark-ui-svelte'] as repo (repo)}
						<div
							class="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:translate-x-1"
						>
							<MingcuteGitBranchLine class="size-3.5 shrink-0" />
							<span class="font-mono">{repo}</span>
						</div>
					{/each}
				</div>
			</Collapsible>
		</div>
	</Card>
</section>
