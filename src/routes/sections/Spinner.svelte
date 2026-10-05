<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Separator } from '$lib/components/separator';
	import { Spinner } from '$lib/components/spinner';
</script>

<section id="spinner">
	<p class="section-tag">Indicators</p>
	<h2 class="mb-6 text-2xl font-bold">Spinner</h2>
	<Card>
		<div>
			<div class="flex items-center gap-4">
				<Spinner class="text-muted-foreground size-3" />
				<Spinner class="text-primary size-4" />
				<Spinner class="text-success size-5" />
				<Spinner class="text-warning size-6" />
				<Spinner class="text-destructive size-8" />
			</div>
			<Separator class="my-5" />
			<p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
				With label
			</p>
			<div class="flex flex-wrap items-center gap-5 text-sm">
				<Spinner class="text-muted-foreground" label="Loading…" />
				<Spinner class="text-primary" label="Fetching data…" />
				<Spinner class="text-success" label="Saving changes…" />
				<Spinner class="text-warning" label="Syncing…" />
				<Spinner class="text-destructive" label="Retrying…" />
			</div>
		</div>
	</Card>
</section>
