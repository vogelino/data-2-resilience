<script lang="ts">
	import LeftSidebar from 'components/LeftSidebar.svelte';
	import Map from 'components/Map.svelte';
	import RightSidebar from 'components/RightSidebar.svelte';
	import SidebarsLayout from 'components/SidebarsLayout.svelte';
</script>

<SidebarsLayout>
	<LeftSidebar slot="left-sidebar">
		<slot />
	</LeftSidebar>
	<Map />
	<RightSidebar slot="right-sidebar" />
</SidebarsLayout>
