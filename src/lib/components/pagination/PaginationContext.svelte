<!--
@component
Gives a snippet the `Pagination`'s state, to build custom page controls.
-->
<script lang="ts">
	import { Pagination, type PaginationContextProps } from '@ark-ui/svelte';

	let { render }: PaginationContextProps = $props();
</script>

<Pagination.Context {render} />
