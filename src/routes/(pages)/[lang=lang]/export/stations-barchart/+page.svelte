<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { datavisType } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import DailySationsValuesBarChart from 'components/DailySationsValuesBarChart.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data: pageData }: Props = $props();
	const stations = $derived(pageData.stationsGeoJson as StationsGeoJSONType);
	const ids = useStations({ stations });

	onMount(() => {
		if (typeof window === 'undefined') return;
		const htmlEl = document.querySelector('html') as HTMLElement;
		if (!htmlEl) return;
		htmlEl.style.fontSize = '16px';
	});
</script>

<div
	id="export-container"
	class={cn(
		'relative h-auto w-[var(--leftSidebarWidth)] p-6',
		'[&_*]:select-none! pointer-events-none select-none [&_*]:pointer-events-none',
		'border',
	)}
>
	{#if $ids.length > 0 && $datavisType !== 'range'}
		<DailySationsValuesBarChart {stations} isExport />
	{:else}
		<p class="absolute inset-0 flex items-center justify-center text-center">
			{$LL.errors.invalidExportConfig()}
		</p>
	{/if}
</div>
