<script lang="ts">
	import { Avatar, AvatarGroup } from '$lib/components/avatar';
	import { Card } from '$lib/components/card';
	import { Separator } from '$lib/components/separator';
</script>

<section id="avatar">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Avatar</h2>
	<Card>
		<div class="space-y-6">
			<div>
				<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
					Sizes
				</p>
				<div class="flex items-end gap-4">
					<div class="flex flex-col items-center gap-2">
						<Avatar
							size="sm"
							src="https://avatars.githubusercontent.com/u/239214719"
							alt="sm"
							fallback="SM"
						/>
						<span class="text-muted-foreground text-xs">sm</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<Avatar size="md" fallback="MD" />
						<span class="text-muted-foreground text-xs">md</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<Avatar
							size="lg"
							src="https://avatars.githubusercontent.com/u/239214719"
							alt="lg"
							fallback="LG"
						/>
						<span class="text-muted-foreground text-xs">lg</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<Avatar size="xl" fallback="XL" />
						<span class="text-muted-foreground text-xs">xl</span>
					</div>
				</div>
			</div>
			<Separator />
			<div>
				<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
					Group
				</p>
				<div class="flex items-center gap-4">
					<AvatarGroup>
						{#each ['RK', 'JD', 'AM', 'SL', 'TW'] as initials (initials)}
							<Avatar
								size="sm"
								fallback={initials}
								class="ring-background ring-2 transition-transform hover:-translate-y-1"
							/>
						{/each}
					</AvatarGroup>
					<span class="text-muted-foreground text-sm">+12 more</span>
				</div>
			</div>
		</div>
	</Card>
</section>
