<script lang="ts">
	import { page } from '$app/stores';
	import { LL, locale } from '$i18n/i18n-svelte';
	import Header from '$lib/components/Header.svelte';
	import LeftSidebar from '$lib/components/LeftSidebar.svelte';
	import Map from '$lib/components/Map/Map.svelte';
	import SidebarsLayout from '$lib/components/SidebarsLayout.svelte';
	import StationsTable from '$lib/components/StationsTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: stations = data?.stationsGeoJson;

	$: isStationsPage = $page.url.pathname.replace(`/${$locale}`, '') === '/stations';
</script>

<Header title={$LL.siteNameShort()} subtitle={$LL.siteSubtitle()} />
<SidebarsLayout>
	<LeftSidebar slot="left-sidebar">
		<slot />
	</LeftSidebar>
	{#if isStationsPage}
		<StationsTable />
	{:else}
		<Map {stations} />
	{/if}
</SidebarsLayout>
