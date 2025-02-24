<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { unit, unitOnly } from '$lib/stores/uiStore';
	import { getColorScaleValue } from '$lib/utils/colorScaleUtil';

  type Props = {
    isLoading: boolean;
    label: string | undefined;
    value: string | number | undefined;
  }

  const {
    isLoading,
    label,
    value
  }: Props = $props()


	const dateLongFormatter = $derived(new Intl.DateTimeFormat($locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}));

  const color = $derived(
    value && 
    getColorScaleValue({
      unit: $unit,
      LL: $LL,
      value
    })
  )
</script>

<div class="relative flex flex-col gap-2 pb-6 pt-2 text-center">
  <strong class="flex items-center justify-center gap-2 text-3xl leading-tight">
    {#if isLoading}
      <span class="inline-block h-6 w-24 animate-pulse rounded-sm bg-muted-foreground/20"></span>
    {:else if label !== undefined}
      {#if typeof value === 'string'}
        <span
          class="inline-block size-6 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
          style={`background-color: ${color}`}
        ></span>
      {/if}
      {label}
      {$unitOnly}
    {/if}
  </strong>
</div>
