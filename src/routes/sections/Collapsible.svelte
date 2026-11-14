<!--
@component
Docs: Collapsible. Live examples of the Collapsible component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Collapsible } from '$lib/components/collapsible';
	import MingcuteFolder2Line from '~icons/mingcute/folder-2-line';
	import MingcuteGitBranchLine from '~icons/mingcute/git-branch-line';
	import MingcuteRightLine from '~icons/mingcute/right-line';
</script>

<section id="collapsible">
	<Card>
		<div>
			<Collapsible>
				{#snippet trigger()}
					<MingcuteFolder2Line class="size-4 text-primary" aria-hidden="true" />
					<span>Open repositories</span>
					<MingcuteRightLine
						class="ml-auto size-4 transition-transform in-data-[state=open]:rotate-90"
						aria-hidden="true"
					/>
				{/snippet}
				<div class="mt-2 ml-4 space-y-1 border-l border-border pl-4">
					{#each ['horizon-design', 'shark-ui', 'svelte-kit-template', 'ark-ui-svelte'] as repo (repo)}
						<div
							class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-all hover:translate-x-1 hover:bg-hover hover:text-fg"
						>
							<MingcuteGitBranchLine class="size-3.5 shrink-0" aria-hidden="true" />
							<span class="font-mono">{repo}</span>
						</div>
					{/each}
				</div>
			</Collapsible>
		</div>
	</Card>
</section>
