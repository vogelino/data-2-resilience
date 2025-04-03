<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { Search } from 'lucide-svelte';
	import { GeoJSON, MarkerLayer } from 'svelte-maplibre';

	const {
		coordinates,
		name
	}: {
		coordinates: [number, number];
		name: string;
	} = $props();
</script>

<GeoJSON
	id="searchedFeature"
	data={{
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				properties: {},
				geometry: {
					type: 'Point',
					coordinates
				}
			}
		]
	}}
	promoteId="SearchedFeature"
>
	<MarkerLayer interactive class="group relative hover:z-10">
		<button
			type="button"
			class={cn(
				'relative grid size-10 place-items-center rounded-full border-2 border-background bg-primary outline-none',
				'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
			)}
			aria-label={name}
		>
			<span class="absolute inset-0 rounded-full border border-black/20 mix-blend-multiply"></span>
			<Search class="size-5 text-primary-foreground" />
		</button>
		<div
			class={cn(
				'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 group-hover:-translate-y-2',
				'w-fit max-w-96 rounded-md bg-background px-4 py-3 opacity-0 transition group-hover:opacity-100',
				'w-48 border border-border shadow-lg'
			)}
		>
			<div class="relative flex flex-col gap-1">
				<span class="text-xs leading-4 text-muted-foreground">{$LL.map.search.tooltip()}:</span>
				<strong class="text-sm font-semibold leading-4">
					{name}
				</strong>
			</div>
		</div>
	</MarkerLayer>
</GeoJSON>
