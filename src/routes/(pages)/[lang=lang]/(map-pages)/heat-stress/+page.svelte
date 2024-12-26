<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import CollapsibleParagraph from 'components/CollapsibleParagraph.svelte';
	import InfoTooltip from 'components/InfoTooltip.svelte';
	import ThermalCompfortNavItem from 'components/ThermalCompfortNavItem.svelte';
	import Alert from 'components/ui/alert/alert.svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let selectedIndicatorSlugParam = queryParam('heatStress', ssp.string('utci'));
	$: selectedIndicatorSlug =
		$selectedIndicatorSlugParam === null ? 'utci' : $selectedIndicatorSlugParam;

	$: indicatorValues = [
		{
			slug: 'utci' as const,
			title: $LL.indicators.utci.title(),
			description: $LL.indicators.utci.description(),
			hasCategory: true,
			isSelected: selectedIndicatorSlug === 'utci_category' || selectedIndicatorSlug === 'utci'
		},
		{
			slug: 'relative_humidity' as const,
			title: $LL.indicators.relative_humidity.title(),
			description: $LL.indicators.relative_humidity.description(),
			hasCategory: false,
			isSelected: selectedIndicatorSlug === 'relative_humidity'
		},
		{
			slug: 'air_temperature' as const,
			title: $LL.indicators.air_temperature.title(),
			description: $LL.indicators.air_temperature.description(),
			hasCategory: false,
			isSelected: selectedIndicatorSlug === 'air_temperature'
		}
	];
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.heatStress.title()}</h1>
<CollapsibleParagraph>
	{#each Object.values($LL.pages.heatStress.intro) as paragraph}
		<p>{paragraph()}</p>
	{/each}
</CollapsibleParagraph>

<div
	class={cn(
		'mt-4 rounded bg-muted px-4 pb-2 pt-1.5 text-sm font-semibold',
		'grid grid-cols-[1fr,auto] items-center gap-2'
	)}
	role="alert"
>
	<span class="text-balance">
		{$LL.pages.heatStress.timeRangeAlert({
			startDate: new Date('2024-07-01').toLocaleDateString($locale, {
				day: '2-digit',
				month: 'long',
				year: undefined
			}),
			endDate: new Date('2024-07-31').toLocaleDateString($locale, {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		})}
	</span>
	<InfoTooltip
		title={$LL.pages.heatStress.timeRangeAlertTooltipTitle()}
		description={$LL.pages.heatStress.timeRangeAlertTooltipContent()}
	/>
</div>
<nav aria-label={$LL.pages.heatStress.indicatorsNavAriaLabel()} class="mb-6 mt-4">
	<ul class="flex flex-col gap-px rounded-xl border border-border bg-border">
		{#each indicatorValues as indicator (indicator.slug)}
			<ThermalCompfortNavItem {indicator} />
		{/each}
	</ul>
</nav>
