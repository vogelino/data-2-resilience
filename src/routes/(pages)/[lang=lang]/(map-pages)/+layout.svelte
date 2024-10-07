<script lang="ts">
	import { page } from '$app/stores';
	import { LL, locale } from '$i18n/i18n-svelte';
	import Header from 'components/Header.svelte';
	import LeftSidebar from 'components/LeftSidebar.svelte';
	import Map from 'components/Map.svelte';
	import SidebarsLayout from 'components/SidebarsLayout.svelte';
	import StationsTable from 'components/StationsTable.svelte';

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
		<Map />
	{/if}
</SidebarsLayout>
