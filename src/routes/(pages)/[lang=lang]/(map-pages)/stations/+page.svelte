<script lang="ts">
	import LL from '$i18n/i18n-svelte';
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.stations.title()}</h1>
{#each Object.values($LL.pages.stations.intro) as paragraph}
	<p class="mb-2">{paragraph()}</p>
{/each}
