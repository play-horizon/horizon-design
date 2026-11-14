<!--
@component
A text field that filters a list of options to choose from (Ark Combobox): typing keeps the
options whose label contains the text, ignoring case and accents, and `emptyText` shows when none
does. `label`, required, names the field, and Ark `translations` name the open button
(`triggerLabel`). Ark announces the number of matching options to screen readers only when
`translations` gives the messages (`resultsCount`, `noResults`, `loading`): it has no English of its
own to fall back on here.
-->
<script lang="ts">
	import {
		Combobox,
		createListCollection,
		useFilter,
		type ComboboxInputValueChangeDetails,
		type ComboboxRootProps
	} from '@ark-ui/svelte';
	import { Portal } from '@ark-ui/svelte/portal';
	import { cn } from '$lib/utils';
	import MingcuteSelectorVerticalLine from '~icons/mingcute/selector-vertical-line';
	import MingcuteCheckLine from '~icons/mingcute/check-line';

	type ArkTranslations = NonNullable<
		ComboboxRootProps<{ label: string; value: string }>['translations']
	>;

	let {
		items = [],
		label,
		placeholder = '',
		emptyText,
		onInputValueChange,
		translations,
		class: className = '',
		...rest
	}: {
		/** The options: the text shown and the value chosen, unique. */
		items?: Array<{ label: string; value: string }>;
		/** The field's visible label, which names it, such as "Framework". */
		label: string;
		/** The field's placeholder, such as "Search…". */
		placeholder?: string;
		/** Shown when no option matches, such as "No results found." */
		emptyText: string;
		/** Called with the field's text when it changes. */
		onInputValueChange?: (details: ComboboxInputValueChangeDetails) => void;
		/**
		 * `triggerLabel` names the button that opens the options; `resultsCount`, `noResults` and
		 * `loading`, when given, are announced to screen readers as the options settle.
		 */
		translations: Required<Pick<ArkTranslations, 'triggerLabel'>> &
			Pick<ArkTranslations, 'resultsCount' | 'noResults' | 'loading'>;
		/** Classes merged onto the root. */
		class?: string;
		/** Other props of Ark's `Combobox.Root`, such as `value`, `onValueChange` and `multiple`. */
		[key: string]: unknown;
	} = $props();

	// Ark's announcements default to English: silent unless `translations` gives them.
	const silentAnnouncements = { resultsCount: () => '', noResults: '', loading: '' };

	const filters = useFilter({ sensitivity: 'base' });
	let query = $state('');
	const matches = $derived(items.filter((item) => filters().contains(item.label, query)));
	const collection = $derived(createListCollection({ items: matches }));

	function changeInput(details: ComboboxInputValueChangeDetails) {
		// Choosing an option writes its label into the field: only typing filters, so the list
		// opens whole again after a choice.
		query = details.reason === 'input-change' ? details.inputValue : '';
		onInputValueChange?.(details);
	}
</script>

<Combobox.Root
	{collection}
	onInputValueChange={changeInput}
	translations={{ ...silentAnnouncements, ...translations }}
	class={cn('flex flex-col gap-1.5', className)}
	data-slot="combobox"
	{...rest}
>
	<Combobox.Label class="mb-1 block text-sm font-medium text-fg" data-slot="combobox-label">
		{label}
	</Combobox.Label>
	<Combobox.Control class="relative">
		<Combobox.Input
			{placeholder}
			class="flex h-8 w-full rounded-lg border border-border bg-sunken px-3 py-1 text-sm text-fg shadow-sm outline-none placeholder:text-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
			data-slot="combobox-input"
		/>
		<Combobox.Trigger class="absolute top-1/2 right-2 -translate-y-1/2 text-muted">
			<MingcuteSelectorVerticalLine class="size-4" aria-hidden="true" />
		</Combobox.Trigger>
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner>
			<Combobox.Content
				class="z-50 min-w-32 overflow-hidden rounded-xl border border-border bg-raised p-1 text-fg shadow-lg outline-none data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in"
				data-slot="combobox-content"
			>
				<Combobox.Empty class="px-2.5 py-4 text-center text-sm text-muted">
					{emptyText}
				</Combobox.Empty>
				{#each matches as item (item.value)}
					<Combobox.Item
						{item}
						class="relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-hover data-highlighted:bg-hover data-highlighted:text-fg data-[state=checked]:bg-hover"
						data-slot="combobox-item"
					>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator class="ml-auto">
							<MingcuteCheckLine class="size-4" aria-hidden="true" />
						</Combobox.ItemIndicator>
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox.Root>
