<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import Header from 'components/Header.svelte';
	import LeftSidebar from 'components/LeftSidebar.svelte';
	import Map from 'components/Map.svelte';
	import SidebarsLayout from 'components/SidebarsLayout.svelte';
</script>

<Header title={$LL.siteNameShort()} subtitle={$LL.siteSubtitle()} />
<SidebarsLayout>
	<LeftSidebar slot="left-sidebar">
		<slot />
	</LeftSidebar>
	<Map />
</SidebarsLayout>
