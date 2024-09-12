<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { selectedStations, unselectStation } from '$lib/stores/stationsStore';
	import Button from 'components/ui/button/button.svelte';
	import { X } from 'lucide-svelte';

	$: formattedStations = $selectedStations.map((id) => {
		const station = stations.features.find((s) => s.properties.id === id);
		return {
			id,
			name: station?.properties.Label || id
		};
	});
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.measurements.title()}</h1>
{#each Object.values($LL.pages.measurements.intro) as paragraph}
	<p class="mb-2">{paragraph()}</p>
{/each}

<ul class="not-prose flex flex-col p-0">
	{#each formattedStations as station (station.id)}
		<li class="flex items-center justify-between gap-6 border-b border-border py-1">
			<span>{station.name}</span>
			<Button
				size="icon"
				variant="ghost"
				on:click={() => unselectStation(station.id)}
				class="size-6 rounded-full"
			>
				<X class="h-4 w-4" />
			</Button>
		</li>
	{/each}
</ul>
