<script lang="ts">
	import LeftSidebar from 'components/LeftSidebar.svelte';
	import Map from 'components/Map.svelte';
	import SidebarsLayout from 'components/SidebarsLayout.svelte';
</script>

<SidebarsLayout>
	<LeftSidebar slot="left-sidebar">
		<slot />
	</LeftSidebar>
	<Map />
</SidebarsLayout>
