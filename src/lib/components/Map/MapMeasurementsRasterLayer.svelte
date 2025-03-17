<script lang="ts">
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import { LL, locale } from '$i18n/i18n-svelte';
	import { heatStressUnit, heatStressUnitLabel } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { today } from '$lib/utils/dateUtil';
	import { Description, Title } from 'components/ui/alert';
	import Alert from 'components/ui/alert/alert.svelte';
	import Button from 'components/ui/button/button.svelte';
	import { getDayOfYear, getYear } from 'date-fns';
	import { XIcon } from 'lucide-svelte';
	import type maplibregl from 'maplibre-gl';
	import { onDestroy, onMount } from 'svelte';
	import { RasterLayer, RasterTileSource } from 'svelte-maplibre';

	const SOURCE_ID = 'meadurements-raster';
	interface Props {
		hour: number;
		map: maplibregl.Map;
		visible?: boolean;
	}

	const categoryToClassMap = {
		utci: 'UTCI',
		utci_category: 'UTCI_CLASS',
		relative_humidity: 'RH',
		air_temperature: 'TA'
	};
	class TileError extends Error {}
	type TilesErrorsMap = Map<string, Map<string, TileError>>;

	let { hour, visible = false, map }: Props = $props();
	let showTilesErrors = $state(true);
	let tilesErrors = $state<TilesErrorsMap>(
		new Map(
			Object.values(categoryToClassMap).reduce((acc, key) => {
				acc.set(key, new Map());
				return acc;
			}, new Map() as TilesErrorsMap)
		)
	);

	const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] // prettier-ignore
	const date = $derived(today().setHours(hour, 0, 0, 0));
	const dayOfYearToday = $derived(getDayOfYear(date));
	const year = $derived(getYear(date));
	const unit = $derived(
		(
			categoryToClassMap[$heatStressUnit as keyof typeof categoryToClassMap] ||
			categoryToClassMap.utci
		).toUpperCase()
	);
	// dayOfYearToday = 177;
	// year = 2024;
	const tilesUrls = $derived(
		hours.map((h) => {
			const paddedHour = `${h}`.padStart(2, '0');
			return {
				layerHour: h,
				tilesUrl: `${PUBLIC_API_BASE_URL}/tms/singleband/${unit}/${year}/${dayOfYearToday}/${paddedHour}/{z}/{x}/{y}.png?colormap=turbo&tile_size=[256,256]`
			};
		})
	);

	const originalFetch = fetch;
	onMount(() => {
		window.fetch = async function (req: RequestInfo | URL, init?: RequestInit): Promise<Response> {
			const response = await originalFetch(req, init);

			if (response.status === 404 && req instanceof Request) {
				const url = new URL(req.url);
				const baseUrl = `${url.protocol}//${url.host}`;
				const isTileUrl = baseUrl === PUBLIC_API_BASE_URL;
				if (!isTileUrl) return response;
				const [, , , unit, year, dayOfYear, hour, z, x, yWithExt] = url.pathname.split('/');
				const [y] = yWithExt.split('.');
				const config = { unit, year, dayOfYear, hour, z, x, y };
				const configAsString = Object.entries(config)
					.map(([key, value]) => `${key}: ${value}`)
					.join(', ');
				const message = `Tile not found for ${configAsString}`;
				const key = [unit, year, dayOfYear, hour, z, x, y].join('-');
				const newTilesErrorMap = new Map(tilesErrors) satisfies TilesErrorsMap;
				const unitTilesErrors = newTilesErrorMap.get(unit.toUpperCase());
				if (unitTilesErrors) {
					const newMap = new Map(unitTilesErrors);
					newMap.set(key, new TileError(message));
					newTilesErrorMap.set(unit, newMap);
				}
				tilesErrors = newTilesErrorMap;
			}

			return response;
		};
	});

	const tilesErrorsForThisTimeAndUnit = $derived.by(() => {
		const unitTilesErrors = tilesErrors.get(unit);
		if (!unitTilesErrors || unitTilesErrors.size === 0) return [];
		return unitTilesErrors.entries().reduce((acc, [key, tileError]: [string, TileError]) => {
			const paddedHour = `${hour + 1}`.padStart(2, '0');
			const keyStart = [unit, year, dayOfYearToday, paddedHour].join('-');
			if (key.startsWith(keyStart)) return [...acc, tileError];
			return acc;
		}, [] as TileError[]);
	});

	onDestroy(() => {
		window.fetch = originalFetch;
	});

	$effect(() => {
		if (tilesErrorsForThisTimeAndUnit.length) {
			showTilesErrors = true;
		}
	});

	const numberFormatter = $derived(
		new Intl.NumberFormat($locale, {
			minimumIntegerDigits: 2,
			useGrouping: false
		})
	);
	const dateFormatter = $derived(
		new Intl.DateTimeFormat($locale, {
			dateStyle: 'long'
		})
	);
	const timeFormatter = $derived(
		new Intl.DateTimeFormat($locale, {
			hour: '2-digit',
			minute: '2-digit'
		})
	);
</script>

{#each tilesUrls as { layerHour, tilesUrl } (layerHour)}
	<RasterTileSource tiles={[tilesUrl]} tileSize={256} id={SOURCE_ID}>
		<RasterLayer
			paint={{}}
			layout={{ visibility: visible && hour === layerHour ? 'visible' : 'none' }}
			beforeLayerType="symbol"
		/>
	</RasterTileSource>
{/each}

{#if showTilesErrors && tilesErrorsForThisTimeAndUnit.length > 0}
	<div
		class={cn(
			'absolute left-1/2 top-4 z-50 w-fit -translate-x-1/2 bg-background/50 backdrop-blur-sm'
		)}
	>
		<Alert variant="destructive" class="relative w-fit max-w-96 rounded-md text-sm">
			<Title class="relative pr-16">
				{$LL.map.tiles.tilesNotFound.title({
					count: numberFormatter.format(tilesErrorsForThisTimeAndUnit.length)
				})}
				<Button
					onclick={() => {
						showTilesErrors = false;
					}}
					variant="ghost"
					size="icon"
					class="absolute right-2 top-2"
				>
					<XIcon class="size-6" />
				</Button>
			</Title>
			<Description>
				{$LL.map.tiles.tilesNotFound.description({
					date: dateFormatter.format(date),
					hour: timeFormatter.format(date),
					measure: $heatStressUnitLabel
				})}
			</Description>
		</Alert>
	</div>
{/if}
