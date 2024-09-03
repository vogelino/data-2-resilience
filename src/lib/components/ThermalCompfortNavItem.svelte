<script context="module" lang="ts">
	export type SelectedIndicatorSlugType = 'pet' | 'pet_category' | 'utci' | 'utci_category' | 'mrt';
	export type IndicatorType = {
		slug: 'utci' | 'pet' | 'mrt';
		title: string;
		description: string;
		hasCategory: boolean;
		isSelected: boolean;
	};
</script>

<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { queryParam } from 'sveltekit-search-params';

	export let indicator: IndicatorType;

	let selectedIndicatorSlugParam = queryParam('thermal_comfort');
	$: selectedIndicatorSlug =
		$selectedIndicatorSlugParam === null ? 'utci_category' : $selectedIndicatorSlugParam;
	$: slugWithCategory = `${indicator.slug}_category`;
	$: valueSelected = indicator.isSelected && selectedIndicatorSlug !== slugWithCategory;
	$: categorySelected = indicator.isSelected && selectedIndicatorSlug === slugWithCategory;
</script>

<li class="group/indicators relative focus-within:z-10">
	<button
		type="button"
		class={cn(
			'focusable bg-background p-4 text-left',
			'transition hover:bg-muted focus-visible:rounded-xl',
			'group-first-of-type/indicators:rounded-t-xl group-last-of-type/indicators:rounded-b-xl'
		)}
		on:click={() =>
			($selectedIndicatorSlugParam = indicator.hasCategory ? slugWithCategory : indicator.slug)}
	>
		<h2 class="relative mb-1 pr-8 font-semibold">
			{indicator.title}
			<span
				class={cn(
					'absolute right-0 top-0 bg-background',
					'size-5 rounded-full border border-foreground ring-4 ring-inset ring-background',
					indicator.isSelected && 'bg-foreground'
				)}
			/>
		</h2>
		<p class="text-sm text-muted-foreground">{indicator.description}</p>
		{#if indicator.hasCategory}
			<nav class="mt-2">
				<ul class="grid grid-cols-2 gap-px rounded bg-border">
					<li class="group/utci flex">
						<button
							type="button"
							on:click|preventDefault|stopPropagation={() =>
								($selectedIndicatorSlugParam = slugWithCategory)}
							class={cn(
								'w-full border border-r-0 border-border px-4 py-2 text-center',
								'rounded-l bg-background transition group-hover/indicators:bg-muted',
								'focusable focus-visible:z-10 focus-visible:rounded focus-visible:border',
								categorySelected &&
									'border-foreground bg-foreground font-semibold text-background group-hover/indicators:bg-foreground',
								!categorySelected && 'group-hover/indicators:hover:bg-background'
							)}
						>
							{$LL.indicators.utci.types.byClass.title()}
						</button>
					</li>
					<li class="group/utci flex">
						<button
							type="button"
							on:click|preventDefault|stopPropagation={() =>
								($selectedIndicatorSlugParam = indicator.slug)}
							class={cn(
								'focusable focus-visible:z-10 focus-visible:rounded focus-visible:border',
								'w-full border border-l-0 border-border px-4 py-2 text-center',
								'rounded-r bg-background transition group-hover/indicators:bg-muted',
								valueSelected &&
									'border-foreground bg-foreground font-semibold text-background group-hover/indicators:bg-foreground',
								!valueSelected && 'group-hover/indicators:hover:bg-background'
							)}
						>
							{$LL.indicators.utci.types.byValue.title()}
						</button>
					</li>
				</ul>
			</nav>
		{/if}
	</button>
</li>
