<!--
@component
Docs: Table. A playground over the data (how many rows, text cells or columns rendered by their
`cell` snippet), then a table of text cells and one whose columns render a status dot, a badge
and an icon button.
-->
<script lang="ts">
	import { Badge } from '#lib/components/badge/index.js';
	import { Card } from '#lib/components/card/index.js';
	import { IconButton } from '#lib/components/icon-button/index.js';
	import { Status } from '#lib/components/status/index.js';
	import { Table, type TableColumn } from '#lib/components/table/index.js';
	import MingcuteMore2Line from '~icons/mingcute/more-2-line';
	import Playground from '../playground/Playground.svelte';
	import { boolean, number } from '../playground/controls';

	const members = [
		{ name: 'Alice Chen', status: 'online', role: 'Owner', joined: 'Jan 2024' },
		{ name: 'Bob Smith', status: 'away', role: 'Developer', joined: 'Mar 2024' },
		{ name: 'Carol White', status: 'offline', role: 'Designer', joined: 'Jun 2024' },
		{ name: 'Dan Okafor', status: 'busy', role: 'Developer', joined: 'Aug 2024' },
		{ name: 'Eva Lind', status: 'online', role: 'Tester', joined: 'Oct 2024' },
		{ name: 'Farid Haddad', status: 'away', role: 'Designer', joined: 'Dec 2024' }
	] as const;

	type Member = (typeof members)[number];

	const statusLabels = { online: 'Online', away: 'Away', busy: 'Busy', offline: 'Offline' };

	const textColumns: TableColumn<Member>[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'role', label: 'Role' },
		{ key: 'joined', label: 'Joined' }
	];

	const snippetColumns: TableColumn<Member>[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'status', label: 'Status', cell: statusCell },
		{ key: 'role', label: 'Role', cell: roleCell },
		{ key: 'joined', label: 'Joined' },
		{ key: 'actions', label: 'Actions', cell: actionsCell }
	];
</script>

{#snippet statusCell(member: Member)}
	<span class="inline-flex items-center gap-2">
		<Status variant={member.status} />
		{statusLabels[member.status]}
	</span>
{/snippet}

{#snippet roleCell(member: Member)}
	<Badge variant={member.role === 'Owner' ? 'primary' : 'neutral'}>{member.role}</Badge>
{/snippet}

{#snippet actionsCell(member: Member)}
	<IconButton label="Actions for {member.name}" size="sm">
		<MingcuteMore2Line aria-hidden="true" />
	</IconButton>
{/snippet}

<div class="grid gap-4">
	<Playground
		description="A column shows the row's field as text, or renders its cell snippet."
		controls={{
			rows: number(3, { min: 0, max: members.length }),
			snippetCells: boolean()
		}}
	>
		{#snippet example(values)}
			<Table
				columns={values.snippetCells ? snippetColumns : textColumns}
				rows={members.slice(0, values.rows)}
				rowKey={(member) => member.name}
			/>
		{/snippet}
	</Playground>
	<Card title="Text cells">
		<Table columns={textColumns} rows={members.slice(0, 3)} rowKey={(member) => member.name} />
	</Card>
	<Card title="Snippet cells" description="A column's cell snippet renders it from the row.">
		<Table columns={snippetColumns} rows={members} rowKey={(member) => member.name} />
	</Card>
</div>
