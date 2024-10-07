<script lang="ts" generics="T">
	import Button from './ui/button/button.svelte';

	import { writable } from 'svelte/store';

	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type OnChangeFn,
		type PaginationState,
		type SortingState,
		type TableOptions
	} from '@tanstack/svelte-table';
	import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let data: T[] | undefined;
	export let columns: ColumnDef<T>[];

	let sorting: SortingState = [];
	let pagination: PaginationState = { pageIndex: 0, pageSize: 15 };

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({ ...old, state: { ...old.state, sorting } }));
	};

	const setPagination: OnChangeFn<PaginationState> = (updater) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else {
			pagination = updater;
		}
	};

	$: options.update((old) => ({ ...old, data: data || [] }));
	$: options.update((old) => ({ ...old, state: { ...old.state, pagination } }));

	const options = writable<TableOptions<T>>({
		data: data || [],
		columns,
		state: { sorting, pagination },
		getCoreRowModel: getCoreRowModel<T>(),
		getSortedRowModel: getSortedRowModel<T>(),
		getPaginationRowModel: getPaginationRowModel<T>(),
		onSortingChange: setSorting,
		onPaginationChange: setPagination
	});
	const table = createSvelteTable(options);
</script>

<table>
	<thead>
		{#each $table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colSpan={header.colSpan}>
						{#if !header.isPlaceholder}
							<button
								type="button"
								class:cursor-pointer={header.column.getCanSort()}
								class:select-none={header.column.getCanSort()}
								on:click={header.column.getToggleSortingHandler()}
							>
								<svelte:component
									this={flexRender(header.column.columnDef.header, header.getContext())}
								/>
								{#if header.column.getIsSorted().toString() === 'asc'}
									🔼
								{:else if header.column.getIsSorted().toString() === 'desc'}
									🔽
								{/if}
							</button>
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each $table.getRowModel().rows.slice(0, pagination.pageSize) as row}
			<tr>
				{#each row.getVisibleCells() as cell}
					<td>
						<svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
<div class="flex items-center gap-2">
	<Button
		variant="outline"
		size="icon"
		class="rounded border p-1"
		on:click={() => $table.firstPage()}
		disabled={!$table.getCanPreviousPage()}
	>
		<ChevronFirst />
	</Button>
	<Button
		variant="outline"
		size="icon"
		class="rounded border p-1"
		on:click={() => $table.previousPage()}
		disabled={!$table.getCanPreviousPage()}
	>
		<ChevronLeft />
	</Button>
	<span class="flex items-center gap-1">
		<div>Page</div>
		<strong>
			{$table.getState().pagination.pageIndex + 1} of{' '}
			{$table.getPageCount().toLocaleString()}
		</strong>
	</span>
	<Button
		variant="outline"
		size="icon"
		class="rounded border p-1"
		on:click={() => $table.nextPage()}
		disabled={!$table.getCanNextPage()}
	>
		<ChevronRight />
	</Button>
	<Button
		variant="outline"
		size="icon"
		class="rounded border p-1"
		on:click={() => $table.lastPage()}
		disabled={!$table.getCanNextPage()}
	>
		<ChevronLast />
	</Button>
</div>
