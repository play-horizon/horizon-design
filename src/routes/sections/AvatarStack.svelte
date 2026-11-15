<!--
@component
Docs: AvatarStack. Who is editing a game, with an overflow chip.
-->
<script lang="ts">
	import { AvatarStack } from '#lib/components/avatar-stack/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { people } from '../examples';
</script>

<div class="grid gap-4">
	<Card title="Up to three, then a count" description="The app formats the overflow text.">
		<div class="flex flex-wrap items-center gap-6">
			<AvatarStack people={people.slice(0, 2)} label="Editing now" overflowText={(n) => `+${n}`} />
			<AvatarStack {people} label="Editing now" overflowText={(n) => `+${n}`} />
			<AvatarStack {people} size="md" max={4} label="Members" overflowText={(n) => `+${n}`} />
		</div>
	</Card>
</div>
