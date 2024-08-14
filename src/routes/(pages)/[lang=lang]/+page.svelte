<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import LeftSidebar from 'components/LeftSidebar.svelte';
	import Map from 'components/Map.svelte';
	import RightSidebar from 'components/RightSidebar.svelte';
	import SidebarsLayout from 'components/SidebarsLayout.svelte';

	console.info($LL.log({ fileName: '+page.svelte' }));
</script>

<SidebarsLayout>
	<LeftSidebar slot="left-sidebar" />
	<Map />
	<RightSidebar slot="right-sidebar" />
</SidebarsLayout>
