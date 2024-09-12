<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import airTemperatureAndHumiditySensor from '$lib/assets/air-temperature-humidity-sensor.png';
	import weatherStation from '$lib/assets/weather-station.png';
	import SensorDescription from 'components/SensorDescription.svelte';
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.stations.title()}</h1>
{#each Object.values($LL.pages.stations.intro) as paragraph}
	<p class="mb-2">{paragraph()}</p>
{/each}

<ul class="mt-6 flex flex-col gap-6">
	<SensorDescription
		title={$LL.pages.stations.stationsDescriptions.weather.title()}
		description={$LL.pages.stations.stationsDescriptions.weather.description()}
		image={{ src: weatherStation, alt: 'Weather station with Blackglobe sensor' }}
	/>
	<SensorDescription
		title={$LL.pages.stations.stationsDescriptions.airTemperatureAndHumidity.title()}
		description={$LL.pages.stations.stationsDescriptions.airTemperatureAndHumidity.description()}
		image={{ src: airTemperatureAndHumiditySensor, alt: 'Air temperature and humidity sensor' }}
	/>
</ul>
