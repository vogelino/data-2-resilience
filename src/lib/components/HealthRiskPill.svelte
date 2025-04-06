<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { unit } from '$lib/stores/uiStore';
	import { getHealthRiskPill } from '$lib/utils/healthRisksUtil';

	type Props = {
		value: number | string | undefined | null;
		withLabel?: boolean;
	};

	const { value, withLabel = false }: Props = $props();

	const pill = $derived(getHealthRiskPill({ value, unit: $unit, LL: $LL, withLabel }));
</script>

{@html pill}
