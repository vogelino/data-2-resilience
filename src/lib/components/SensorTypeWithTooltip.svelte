<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	import { Info } from 'lucide-svelte';
	import HighlightedSearchQuery from './HighlightedSearchQuery.svelte';

	interface Props {
		type: 'biomet' | 'temprh' | 'double';
		searchQuery?: string;
	}

	let { type, searchQuery }: Props = $props();

	let title = $derived(
		type === 'biomet' || type === 'double'
			? $LL.pages.stations.table.cells.stationTypes.biomet.title()
			: $LL.pages.stations.table.cells.stationTypes.temprh.title()
	);
	let description = $derived(
		type === 'biomet' || type === 'double'
			? $LL.pages.stations.table.cells.stationTypes.biomet.description()
			: $LL.pages.stations.table.cells.stationTypes.temprh.description()
	);
	let triggerLabel = $derived(
		type === 'biomet' || type === 'double'
			? $LL.pages.stations.table.cells.stationTypes.biomet.nameShort()
			: $LL.pages.stations.table.cells.stationTypes.temprh.nameShort()
	);

	let units = $derived(
		Object.entries($LL.pages.measurements.unitSelect.units)
			.filter(([key]) =>
				type === 'biomet' || type === 'double'
					? true
					: ['utci', 'air_temperature', 'pet', 'absolute_humidity'].includes(key)
			)
			.map(([key, f]) => {
				if (key.endsWith('_max') || key.endsWith('_min')) return { label: '', unitOnly: false };
				return { label: f.label(), unitOnly: f.unitOnly() };
			})
			.filter((u) => u.label && u.unitOnly)
	);
</script>

<Tooltip openDelay={100}>
	<TooltipTrigger
		class={cn(
			'focusable hover-hover:hover:bg-foreground hover-hover:hover:text-background',
			'group flex items-center gap-2 whitespace-nowrap rounded-full p-1 transition',
			triggerLabel && '-ml-2.5 pl-2.5 pr-1.5'
		)}
	>
		<span>
			<HighlightedSearchQuery text={triggerLabel} {searchQuery} />
		</span>
		<Info
			class={cn(
				'size-4',
				triggerLabel && 'text-muted-foreground hover-hover:group-hover:text-background'
			)}
		/>
	</TooltipTrigger>
	<TooltipContent class="flex w-96 max-w-full flex-col gap-1 px-4 pb-4 pt-3 leading-tight">
		<strong class="block text-base font-semibold leading-5">{title}</strong>
		<p class="pb-2 text-sm leading-4 text-muted-foreground">{description}</p>
		<p class="pb-0.5 text-sm leading-4 text-muted-foreground">
			{$LL.pages.stations.table.cells.stationTypes.thisStationMeasures()}
		</p>
		<ul class={cn('flex flex-wrap gap-1')}>
			{#each units as { label, unitOnly }}
				<li
					class={cn(
						'leading-4 text-muted-foreground sm:text-xs',
						'flex items-center gap-1 rounded-full bg-muted px-2 py-0.5'
					)}
				>
					<span>{label}</span>
					{#if unitOnly}
						<span class={cn('opacity-80')}>({unitOnly})</span>
					{/if}
				</li>
			{/each}
		</ul>
	</TooltipContent>
</Tooltip>
