<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import CollapsibleParagraph from 'components/CollapsibleParagraph.svelte';
	import ThermalCompfortNavItem from 'components/ThermalCompfortNavItem.svelte';
	import Alert from 'components/ui/alert/alert.svelte';
	import { queryParam } from 'sveltekit-search-params';

	let selectedIndicatorSlugParam = queryParam('heatSress');
	$: selectedIndicatorSlug =
		$selectedIndicatorSlugParam === null ? 'utci_category' : $selectedIndicatorSlugParam;

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
			slug: 'temp' as const,
			title: $LL.indicators.temp.title(),
			description: $LL.indicators.temp.description(),
			hasCategory: false,
			isSelected: selectedIndicatorSlug === 'temp'
		}
	];
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.heatStress.title()}</h1>
<CollapsibleParagraph>
	{#each Object.values($LL.pages.heatStress.intro) as paragraph}
		<p>{paragraph()}</p>
	{/each}
</CollapsibleParagraph>

<Alert class="mt-4 rounded-3xl bg-muted px-4 pb-2 pt-1.5 text-center font-semibold">
	{$LL.pages.heatStress.timeRangeAlert({
		startDate: new Date('2024-07-01').toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long',
			year: undefined
		}),
		endDate: new Date('2024-07-31').toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		})
	})}
</Alert>
<nav aria-label={$LL.pages.heatStress.indicatorsNavAriaLabel()} class="mb-6 mt-4">
	<ul class="flex flex-col gap-px rounded-xl border border-border bg-border">
		{#each indicatorValues as indicator (indicator.slug)}
			<ThermalCompfortNavItem {indicator} />
		{/each}
	</ul>
</nav>
