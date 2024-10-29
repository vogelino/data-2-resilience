<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { isLeftSidebarOpened } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { HeartPulse } from 'lucide-svelte';
	import { queryParam } from 'sveltekit-search-params';

	const unit = queryParam('heatSress');

	$: unitShortLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].shortLabel();
	$: unitOnlyLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].unitOnly();
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
	<strong>{unitShortLabel}</strong>
	<div class="5 flex flex-col gap-0">
		<div
			class="rounded-xs h-2 w-[15vw] max-w-96 bg-gradient-to-r from-yellow-50 via-yellow-500 to-yellow-950 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
		/>
		<div class="opacity- flex w-full items-center justify-between text-muted-foreground">
			<span>0 {unitOnlyLabel}</span>
			<span>100 {unitOnlyLabel}</span>
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
