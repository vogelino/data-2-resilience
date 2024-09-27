<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import CollapsibleParagraph from 'components/CollapsibleParagraph.svelte';
	import StationsSelect from 'components/StationsSelect.svelte';
	import UnitDataVis from 'components/UnitDataVis.svelte';
	import UnitSelect from 'components/UnitSelect.svelte';
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.measurements.title()}</h1>
<CollapsibleParagraph>
	{#each Object.values($LL.pages.measurements.intro) as paragraph}
		<p>{paragraph()}</p>
	{/each}
</CollapsibleParagraph>

<StationsSelect />

<UnitSelect />

<UnitDataVis />
