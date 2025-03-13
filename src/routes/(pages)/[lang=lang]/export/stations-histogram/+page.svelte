<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { LL } from '$i18n/i18n-svelte';
	import type { StationsGeoJSONType } from '$lib/stores/mapData';
	import { useStations } from '$lib/stores/stationsStore';
	import { cn } from '$lib/utils';
	import Histogram from 'components/Histogram/Histogram.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	const DEBUG = $derived(dev && browser);

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
	class={cn(
		'relative h-auto w-[var(--leftSidebarWidth)] p-6',
		'[&_*]:select-none! pointer-events-none select-none [&_*]:pointer-events-none',
		'border',
		DEBUG ? 'border-border' : 'border-transparent'
	)}
>
	{#if $ids.length > 0}
		<Histogram {stations} initialStationIds={$ids} isExport />
	{:else}
		<p class="absolute inset-0 flex items-center justify-center text-center">
			{$LL.errors.invalidExportConfig()}
		</p>
	{/if}
</div>
