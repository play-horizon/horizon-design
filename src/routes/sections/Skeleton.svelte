<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Skeleton } from '$lib/components/skeleton';
</script>

<section id="skeleton">
	<p class="section-tag">Display</p>
	<h2 class="mb-6 text-2xl font-bold">Skeleton</h2>
	<Card>
		<div>
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="flex items-start gap-4">
					<Skeleton class="size-12 shrink-0 rounded-full" />
					<div class="flex-1 space-y-2.5 pt-1">
						<Skeleton class="h-3.5 w-2/5" />
						<Skeleton class="h-3 w-3/4" />
						<Skeleton class="h-3 w-1/2" />
					</div>
				</div>
				<div class="space-y-2.5">
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-full" />
					<Skeleton class="h-4 w-4/5" />
					<Skeleton class="h-4 w-2/3" />
				</div>
			</div>
			<div class="mt-6 grid gap-3 sm:grid-cols-3">
				<Skeleton class="h-24 rounded-xl" />
				<Skeleton class="h-24 rounded-xl" />
				<Skeleton class="h-24 rounded-xl" />
			</div>
		</div>
	</Card>
</section>
