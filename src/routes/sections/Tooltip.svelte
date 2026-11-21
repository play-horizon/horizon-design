<!--
@component
Docs: Tooltip. A playground over every prop (the text, the side, the delays, staying open while
hovered, what closes it, disabled), then a tooltip on its own trigger button, on an icon button
on each side, and one whose content is a snippet with a keyboard shortcut.
-->
<script lang="ts">
	import { buttonVariants } from '#lib/components/button/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { Kbd } from '#lib/components/kbd/index.js';
	import { Tooltip } from '#lib/components/tooltip/index.js';
	import MingcuteArrowDownLine from '~icons/mingcute/arrow-down-line';
	import MingcuteArrowLeftLine from '~icons/mingcute/arrow-left-line';
	import MingcuteArrowRightLine from '~icons/mingcute/arrow-right-line';
	import MingcuteArrowUpLine from '~icons/mingcute/arrow-up-line';
	import MingcuteInformationLine from '~icons/mingcute/information-line';
	import MingcuteSearchLine from '~icons/mingcute/search-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, choice, number, text } from '../playground/controls';

	const sides = [
		{ side: 'top', label: 'Move up', Icon: MingcuteArrowUpLine },
		{ side: 'right', label: 'Move right', Icon: MingcuteArrowRightLine },
		{ side: 'bottom', label: 'Move down', Icon: MingcuteArrowDownLine },
		{ side: 'left', label: 'Move left', Icon: MingcuteArrowLeftLine }
	] as const;
</script>

{#snippet searchHint()}
	<span class="flex items-center gap-2">Open it with <Kbd>Ctrl K</Kbd></span>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="Hover the button, or focus it with the keyboard."
		controls={{
			content: text('Tooltips give a short hint about a control.'),
			placement: choice(sides.map((entry) => entry.side)),
			openDelay: number(200, { min: 0, max: 2000, step: 100 }),
			closeDelay: number(100, { min: 0, max: 2000, step: 100 }),
			interactive: boolean(),
			closeOnClick: boolean(true),
			closeOnPointerDown: boolean(true),
			closeOnEscape: boolean(true),
			disabled: boolean()
		}}
	>
		{#snippet example(values)}
			<Tooltip
				content={values.content}
				positioning={{ placement: values.placement }}
				openDelay={values.openDelay}
				closeDelay={values.closeDelay}
				interactive={values.interactive}
				closeOnClick={values.closeOnClick}
				closeOnPointerDown={values.closeOnPointerDown}
				closeOnEscape={values.closeOnEscape}
				disabled={values.disabled}
				triggerClass={buttonVariants({ variant: 'default' })}
			>
				<MingcuteInformationLine aria-hidden="true" />
				Hover me
			</Tooltip>
		{/snippet}
	</Playground>
	<Card
		title="Its own trigger"
		description="Without trigger, the tooltip wraps children in a button."
	>
		<Tooltip content="Saved games sync to every device." triggerClass={buttonVariants({})}>
			<MingcuteInformationLine aria-hidden="true" />
			Cloud saves
		</Tooltip>
	</Card>
	<Card title="On an icon button, on each side" description="Its text is the button's name.">
		<div class="flex flex-wrap items-center gap-2">
			{#each sides as entry (entry.side)}
				<Tooltip content={entry.label} positioning={{ placement: entry.side }}>
					{#snippet trigger(props)}
						<button
							{...props}
							type="button"
							aria-label={entry.label}
							class={buttonVariants({ variant: 'default', size: 'icon-md' })}
						>
							<entry.Icon aria-hidden="true" />
						</button>
					{/snippet}
				</Tooltip>
			{/each}
		</div>
	</Card>
	<Card title="Snippet content" description="The content can be a snippet, such as a shortcut.">
		<Tooltip content={searchHint} triggerClass={buttonVariants({})}>
			<MingcuteSearchLine aria-hidden="true" />
			Search
		</Tooltip>
	</Card>
</div>
