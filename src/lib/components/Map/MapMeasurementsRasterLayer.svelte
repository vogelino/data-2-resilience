<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { heatStressUnit } from '$lib/stores/uiStore';
	import { today } from '$lib/utils/dateUtil';
	import { getDayOfYear, getYear } from 'date-fns';
	import { RasterLayer, RasterTileSource } from 'svelte-maplibre';

	interface Props {
		hour: number;
		visible?: boolean;
	}

	let { hour, visible = false }: Props = $props();

	const categoryToClassMap = {
		utci: 'UTCI',
		utci_category: 'UTCI_CLASS',
		relative_humidity: 'RH',
		air_temperature: 'TA'
	};
	const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] // prettier-ignore
	const date = today().setHours(hour, 0, 0, 0);
	let dayOfYearToday = getDayOfYear(date);
	let year = getYear(date);
	// dayOfYearToday = 177;
	// year = 2024;
	let tilesUrls = $derived(
		hours.map((h) => {
			const paddedHour = `${h}`.padStart(2, '0');
			const paddedDayOfYear = `${dayOfYearToday}`.padStart(3, '0');
			const unit =
				// @ts-ignore
				// 'UTCI' || // TODO: Replace with real unit once supported
				categoryToClassMap[$heatStressUnit as keyof typeof categoryToClassMap] ||
				categoryToClassMap.utci;
			return {
				layerHour: h,
				tilesUrl: `${PUBLIC_API_BASE_URL}/tms/singleband/${unit}/${year}/${paddedDayOfYear}/${paddedHour}/{z}/{x}/{y}.png?colormap=turbo&tile_size=[256,256]`
			};
		})
	);
</script>

{#each tilesUrls as { layerHour, tilesUrl } (layerHour)}
	<RasterTileSource tiles={[tilesUrl]} tileSize={256}>
		<RasterLayer
			paint={{}}
			layout={{ visibility: visible && hour === layerHour ? 'visible' : 'none' }}
			beforeLayerType="symbol"
		/>
	</RasterTileSource>
{/each}
