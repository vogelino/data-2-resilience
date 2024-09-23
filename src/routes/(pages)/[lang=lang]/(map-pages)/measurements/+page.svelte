<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import StationsSelect from 'components/StationsSelect.svelte';

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

<StationsSelect />
