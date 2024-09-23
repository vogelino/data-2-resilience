<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import CollapsibleParagraph from 'components/CollapsibleParagraph.svelte';
	import ThermalCompfortNavItem from 'components/ThermalCompfortNavItem.svelte';
	import Alert from 'components/ui/alert/alert.svelte';
	import { queryParam } from 'sveltekit-search-params';

	let selectedIndicatorSlugParam = queryParam('thermal_comfort');
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
			slug: 'pet' as const,
			title: $LL.indicators.pet.title(),
			description: $LL.indicators.pet.description(),
			hasCategory: false,
			isSelected: selectedIndicatorSlug === 'pet'
		},
		{
			slug: 'mrt' as const,
			title: $LL.indicators.mrt.title(),
			description: $LL.indicators.mrt.description(),
			hasCategory: false,
			isSelected: selectedIndicatorSlug === 'mrt'
		}
	];
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.thermicalComfort.title()}</h1>
{#each Object.values($LL.pages.thermicalComfort.intro) as paragraph}
	<CollapsibleParagraph>
		{paragraph()}
	</CollapsibleParagraph>
{/each}
<Alert class="mt-4 rounded-3xl bg-muted px-4 pb-2 pt-1.5 text-center font-semibold">
	{$LL.pages.thermicalComfort.timeRangeAlert({
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
<nav aria-label={$LL.pages.thermicalComfort.indicatorsNavAriaLabel()} class="mb-6 mt-4">
	<ul class="flex flex-col gap-px rounded-xl border border-border bg-border">
		{#each indicatorValues as indicator (indicator.slug)}
			<ThermalCompfortNavItem {indicator} />
		{/each}
	</ul>
</nav>
