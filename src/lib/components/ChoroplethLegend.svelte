<script lang="ts">
	import { page } from '$app/stores';
	import { LL, locale } from '$i18n/i18n-svelte';
	import { isLeftSidebarOpened } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { valueToCategoryMap } from '$lib/utils/heatStressCategoriesUtil';
	import { HeartPulse } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	const heatStressUnit = queryParam('heatSress', ssp.string('utci'));
	const unit = queryParam('unit', ssp.string('air_temperature'));

	$: p = $page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', '');
	$: currentPage = p === '' ? 'measurements' : p;

	type Unit = keyof typeof $LL.pages.measurements.unitSelect.units;

	$: getUnitLabelsByUnit = function (unit: Unit, isCategoryUnit = false) {
		return {
			unitShortLabel: $LL.pages.measurements.unitSelect.units[unit].shortLabel(),
			unitOnlyLabel:
				$LL.pages.measurements.unitSelect.units[
					isCategoryUnit ? (unit.replace('_category', '') as Unit) : unit
				].unitOnly(),
			label: $LL.pages.measurements.unitSelect.units[unit].label(),
			description: $LL.pages.measurements.unitSelect.units[unit].description()
		};
	};
	$: finalUnit = currentPage === 'measurements' ? ($unit as Unit) : ($heatStressUnit as Unit);
	$: isCategoryUnit = finalUnit.endsWith('_category');
	$: labels = getUnitLabelsByUnit(finalUnit, isCategoryUnit);

	const categoryColors = [
		'bg-yellow-50',
		'bg-yellow-100',
		'bg-yellow-200',
		'bg-yellow-300',
		'bg-yellow-400',
		'bg-yellow-500',
		'bg-yellow-600',
		'bg-yellow-700',
		'bg-yellow-800',
		'bg-yellow-900',
		'bg-yellow-950'
	];
</script>

<div
	class={cn(
		'flex flex-col gap-2 text-sm',
		'fixed bottom-8 left-8 z-10 overflow-clip rounded border border-border bg-background shadow-lg',
		$isLeftSidebarOpened ? 'translate-x-[var(--leftSidebarWidth)]' : 'translate-x-0',
		'p-4 transition-transform duration-300 ease-in-out',
		'[&:has(input:focus-visible)]:ring-2 [&:has(input:focus-visible)]:ring-ring',
		'[&:has(input:focus-visible)]:ring-offset-2 [&:has(input:focus-visible)]:ring-offset-background'
	)}
>
	<strong>{labels.unitShortLabel}</strong>
	<div class="5 flex flex-col gap-0">
		{#if isCategoryUnit}
			<div
				class="rounded-xs flex h-2 w-[15vw] max-w-96 overflow-clip shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
			>
				{#each valueToCategoryMap.values() as _category, i}
					<span class={cn('size-full', categoryColors[i])} />
				{/each}
			</div>
		{:else}
			<div
				class="rounded-xs h-2 w-[15vw] max-w-96 bg-gradient-to-r from-yellow-50 via-yellow-500 to-yellow-950 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
			/>
		{/if}
		<div class="opacity- flex w-full items-center justify-between text-muted-foreground">
			<span>0 {labels.unitOnlyLabel}</span>
			<span>100 {labels.unitOnlyLabel}</span>
		</div>
	</div>
	<button
		type="button"
		class={cn(
			'underline decoration-muted underline-offset-2',
			'focusable',
			'hover-hover:hover:decoration-primary',
			'flex items-center gap-1 transition-all'
		)}
	>
		<HeartPulse class="size-5 text-pink-700" />
		<span>{$LL.pages.heatStress.showHealthRisks()}</span>
	</button>
</div>
