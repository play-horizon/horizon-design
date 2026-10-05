<script lang="ts">
	import { Card } from '$lib/components/card';
	import { Timer } from '$lib/components/timer';
</script>

<section id="timer">
	<p class="section-tag">Controls</p>
	<h2 class="mb-6 text-2xl font-bold">Timer</h2>
	<Card>
		<div class="flex justify-center">
			<Timer autoStart={true} />
		</div>
	</Card>
</section>
