<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { Minus, Plus } from 'lucide-svelte';
	import type { Map as MapLibreMap } from 'maplibre-gl';
	import { Button } from '../ui/button';

	export let map: MapLibreMap;

	let maxZoomReached = map?.getZoom() >= map?.getMaxZoom();
	let zoomInitialized = false;

	function initZoomControl(mp: MapLibreMap) {
		if (zoomInitialized || !mp) return;
		zoomInitialized = true;
		mp.on('zoom', () => {
			const zoom = mp?.getZoom();
			const maxZoom = mp?.getMaxZoom();
			maxZoomReached = zoom >= maxZoom;
		});
	}

	$: initZoomControl(map);
</script>

<nav
	aria-label={$LL.map.zoom.navAlt()}
	class={cn(
		'fixed right-4 top-[calc(var(--headerHeight,5rem)+1rem)] z-50 flex flex-col gap-px',
		'w-10 rounded-md border border-border bg-border',
		'shadow-lg transition-transform duration-300 ease-in-out'
	)}
>
	<Button
		size="icon"
		variant="ghost"
		aria-label={$LL.map.zoom.zoomIn()}
		class={cn(
			'relative h-9 w-full rounded-b-none bg-background',
			'focusable focus-visible:z-50 focus-visible:rounded',
			'p-0'
		)}
		disabled={maxZoomReached}
		on:click={() => map.zoomIn()}
	>
		<Plus class="size-5" />
	</Button>
	<Button
		size="icon"
		variant="ghost"
		aria-label={$LL.map.zoom.zoomOut()}
		class={cn(
			'relative h-9 w-full rounded-t-none bg-background',
			'focusable focus-visible:z-50 focus-visible:rounded',
			'p-0'
		)}
		on:click={() => map.zoomOut()}
	>
		<Minus class="size-5" />
	</Button>
</nav>
