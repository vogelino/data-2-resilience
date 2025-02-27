<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { cn } from "$lib/utils";
	import type { QueryObserverResult } from "@tanstack/svelte-query";
	import { LoaderCircle } from "lucide-svelte";
	import type { Snippet } from "svelte";
	import ErrorAlert from './ErrorAlert.svelte';


  type Props = {
    query: QueryObserverResult<unknown>;
    data: unknown[];
    children?: Snippet<[]>
  }

  const { query, data, children }: Props = $props()

</script>

{#if query.isLoading}
  <div
    class={cn(
      'absolute inset-0 flex items-center justify-center',
      'pointer-events-none opacity-100'
    )}
  >
    <LoaderCircle class="size-6 animate-spin" />
  </div>
{:else if query.isSuccess && data.length === 0}
  <div class="absolute inset-0 flex items-center justify-center">
    {$LL.pages.measurements.noDataAvailable()}
  </div>
{:else if query.error}
  <div class="absolute inset-0 flex items-center justify-center">
    <ErrorAlert errorObject={query.error} />
  </div>
{:else if query.isSuccess}
  {@render children?.()}
{/if}
