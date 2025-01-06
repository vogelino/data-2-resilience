<script lang="ts" generics="T">
	import { locale } from '$i18n/i18n-svelte';
	import Button from './ui/button/button.svelte';
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

	import {
		createSvelteTable,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		type ColumnDef,
		type OnChangeFn,
		type PaginationState,
		type SortingState
	} from '$lib/components/table';

	import {
		ArrowDownAZ,
		ArrowDownZA,
		ChevronFirst,
		ChevronLast,
		ChevronLeft,
		ChevronRight
	} from 'lucide-svelte';
	import FlexRender from './table/flex-render.svelte';

	interface Props {
		data: T[] | undefined;
		columns: ColumnDef<T>[];
	}

	let { data, columns }: Props = $props();

	let sorting: SortingState = $state([]);
	let pagination: PaginationState = $state({ pageIndex: 0, pageSize: 13 });

	const setSorting: OnChangeFn<SortingState> = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
	};

	const setPagination: OnChangeFn<PaginationState> = (updater) => {
		if (updater instanceof Function) {
			pagination = updater(pagination);
		} else {
			pagination = updater;
		}
	};

	let options = {
		get data() {
			return data || [];
		},
		columns,
		state: {
			get sorting() {
				return sorting;
			},
			get pagination() {
				return pagination;
			}
		},
		getCoreRowModel: getCoreRowModel<T>(),
		getSortedRowModel: getSortedRowModel<T>(),
		getPaginationRowModel: getPaginationRowModel<T>(),
		onSortingChange: setSorting,
		onPaginationChange: setPagination
	};
	let table = createSvelteTable(options);
</script>

<Table>
	<TableHeader>
		{#each table.getHeaderGroups() as headerGroup}
			<TableRow>
				{#each headerGroup.headers as header}
					<TableHead colspan={header.colSpan}>
						{#if !header.isPlaceholder}
							<button
								type="button"
								class:cursor-pointer={header.column.getCanSort()}
								class:select-none={header.column.getCanSort()}
								onclick={header.column.getToggleSortingHandler()}
								class="flex items-center gap-2"
							>
								<FlexRender
									context={header.getContext()}
									content={header.column.columnDef.header}
								/>
								{#if header.column.getIsSorted().toString() === 'asc'}
									<ArrowDownAZ />
								{:else if header.column.getIsSorted().toString() === 'desc'}
									<ArrowDownZA />
								{/if}
							</button>
						{/if}
					</TableHead>
				{/each}
			</TableRow>
		{/each}
	</TableHeader>
	<TableBody>
		{#each table.getRowModel().rows.slice(0, pagination.pageSize) as row}
			<TableRow>
				{#each row.getVisibleCells() as cell}
					<TableCell>
						<FlexRender context={cell.getContext()} content={cell.column.columnDef.cell} />
					</TableCell>
				{/each}
			</TableRow>
		{/each}
	</TableBody>
</Table>
<div class="flex items-center justify-end gap-2 border-t border-border p-2">
	<Button
		variant="outline"
		size="icon"
		on:click={() => table.firstPage()}
		disabled={!table.getCanPreviousPage()}
	>
		<ChevronFirst class="size-5" />
	</Button>
	<Button
		variant="outline"
		size="icon"
		on:click={() => table.previousPage()}
		disabled={!table.getCanPreviousPage()}
	>
		<ChevronLeft class="size-5" />
	</Button>
	<span class="flex items-center gap-1 px-4">
		<div>Page</div>
		<strong>
			{table.getState().pagination.pageIndex + 1} of{' '}
			{table.getPageCount().toLocaleString($locale, {
				maximumFractionDigits: 0
			})}
		</strong>
	</span>
	<Button
		variant="outline"
		size="icon"
		on:click={() => table.nextPage()}
		disabled={!table.getCanNextPage()}
	>
		<ChevronRight class="size-5" />
	</Button>
	<Button
		variant="outline"
		size="icon"
		on:click={() => table.lastPage()}
		disabled={!table.getCanNextPage()}
	>
		<ChevronLast class="size-5" />
	</Button>
</div>
