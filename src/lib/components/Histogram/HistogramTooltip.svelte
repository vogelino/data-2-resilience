<script lang="ts" module>
  type ClassesType = {
    root?: string;
    container?: string;
    header?: string;
    content?: string;
  } 

  export const tooltipClasses = {
    root: "max-w-56 bg-transparent",
    container: cn(
      "w-full shadow-none border border-border shadow-lg p-3",
      "bg-background dark:bg-background bg-opacity-80 backdrop-blur-sm",
    ),
    content: "w-full text-xs font-normal text-foreground shadow-none",
  } satisfies ClassesType
</script>

<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { unitOnly } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';

  type BaseItemType = {
    id: string;
  }
  type QuantitativeType = Array<BaseItemType> & {
    x0: number | undefined;
    x1: number | undefined;
  }
  type OrdinalType = BaseItemType & {
    value: number;
    label: string;
    ids: string[];
  }
  type BaseProps = {
    selectedItems: {
      id: BaseItemType['id'];
      label: string;
    }[]
  }
  type Props = |
    BaseProps & { type: 'quantitative'; item: QuantitativeType } |
    BaseProps & { type: 'ordinal', item: OrdinalType };

	let { item, type, selectedItems }: Props = $props();

  const baseTooltipText = $derived.by(() => {
    const catItem = item as OrdinalType;
    const numItem = item as QuantitativeType;
    if (type === 'quantitative') {
      return $LL.pages.measurements.histogram.tooltip.numberic({
        count: (numItem?.length || 0).toLocaleString($locale),
        start: (numItem?.x0 || 0).toLocaleString($locale),
        end: (numItem?.x1 || 0).toLocaleString($locale),
        unit: $unitOnly
      })
    }
    return $LL.pages.measurements.histogram.tooltip.category({
      count: catItem?.value.toLocaleString($locale),
      category: catItem?.label || '',
    })
  });

  const selectedItemsInBin = $derived.by(() => {
    if (type === 'quantitative') {
      const numItem = item as QuantitativeType;
      return selectedItems.filter((s) => {
        return numItem.find((d) => s.id === d.id)
      })
    }
    const catItem = item as OrdinalType;
    return selectedItems.filter((s) => {
      return catItem.ids.includes(s.id)
    });
  })

  const selectedItemsBaseText = $derived($LL.pages.measurements.histogram.tooltip.stations(
    selectedItemsInBin.length
  ))
</script>

{@html baseTooltipText}
{#if selectedItemsInBin.length > 0}
  <strong class='block border-t border-border mt-1 py-1'>
    {@html selectedItemsBaseText}
  </strong>
  <ul class='flex flex-wrap gap-x-1 gap-y-0.5 text-sm list-muted-foreground'>
    {#each selectedItemsInBin as sN}
      <li class='px-1.5 py-0.5 rounded-full border border-border text-xs max-w-48 inline-block text-ellipsis overflow-clip'>
        {@html sN.label}
      </li>
    {/each}
  </ul>
{/if}