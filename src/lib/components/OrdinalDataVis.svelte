<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { isCategoryUnit, unitWithoutCategory } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import HealthRiskPill from './HealthRiskPill.svelte';
	import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

	type Props = {
		isLoading: boolean;
		stations: StationsGeoJSONType;
		data: {
			id: string;
			label: string;
			value: number | undefined;
		}[];
	};

	const { isLoading, stations, data }: Props = $props();

	const ids = useStations({ stations });

	const titleKey = $derived(
		$isCategoryUnit ? ('heatStress' as const) : ('thermalComfort' as const)
	);
	const healthRisks = $derived($LL.map.choroplethLegend.healthRisks);
</script>

<div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
	{#if isLoading}
		{#each $ids as _d, i}
			<span
				class={cn(
					'inline-block h-5 w-40 animate-pulse rounded-sm bg-muted-foreground/20',
					['w-24', 'w-20', 'w-32'][i]
				)}
			>
			</span>
			<span class="grid grid-cols-[0.75rem_1fr] items-center gap-2">
				<span class={cn('inline-block size-3 animate-pulse rounded-full bg-muted-foreground/20')}>
				</span>
				<span
					class={cn(
						'inline-block h-5 w-40 animate-pulse rounded-sm bg-muted-foreground/20',
						['w-32', 'w-24', 'w-40'][i]
					)}
				>
				</span>
			</span>
		{/each}
	{:else}
		{#each data as d}
			{@const healthRisk = healthRisks[d.value as unknown as keyof typeof healthRisks]}
			{@const correspondingFeature = stations.features.find((f) => f.properties.id === d.id)}
			{@const label = correspondingFeature?.properties.longName || d.label || d.id || ''}
			<strong class="max-w-48 font-semibold">{label}</strong>
			<Tooltip openDelay={0} disableHoverableContent>
				<TooltipTrigger
					class={cn(
						'grid w-fit grid-cols-[0.75rem_1fr] items-center gap-2 text-left',
						d.value && 'transition-colors hover:text-muted-foreground'
					)}
				>
					<HealthRiskPill value={d.value} withLabel />
				</TooltipTrigger>
				{#if d.value}
					<TooltipContent class="max-w-72">
						{#if healthRisk}
							<strong class="flex gap-2 font-semibold">
								<span>{healthRisk.title[titleKey]()}</span>
								{#if healthRisk.ranges[$unitWithoutCategory]()}
									<span class="whitespace-nowrap font-normal text-muted-foreground">
										({healthRisk.ranges[$unitWithoutCategory]()})
									</span>
								{/if}
							</strong>
							<span>{@html healthRisk.description()}</span>
						{/if}
					</TooltipContent>
				{/if}
			</Tooltip>
		{/each}
	{/if}
</div>
