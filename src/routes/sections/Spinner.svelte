<!--
@component
Docs: Spinner. Live examples of the Spinner component.
-->
<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Separator } from '$lib/components/separator';
	import { Spinner } from '$lib/components/spinner';
</script>

<section id="spinner">
	<Card>
		<div>
			<div class="flex items-center gap-4">
				<Spinner class="size-3 text-muted" />
				<Spinner class="size-4 text-primary" />
				<Spinner class="size-5 text-success" />
				<Spinner class="size-6 text-warning" />
				<Spinner class="size-8 text-danger" />
			</div>
			<Separator class="my-5" />
			<p class="mb-3 text-xs font-semibold tracking-widest text-muted uppercase">With label</p>
			<div class="flex flex-wrap items-center gap-5 text-sm">
				<Spinner class="text-muted" label="Loading…" />
				<Spinner class="text-primary" label="Fetching data…" />
				<Spinner class="text-success" label="Saving changes…" />
				<Spinner class="text-warning" label="Syncing…" />
				<Spinner class="text-danger" label="Retrying…" />
			</div>
		</div>
	</Card>
</section>
