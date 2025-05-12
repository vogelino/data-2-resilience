<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { api } from '$lib/utils/api';
	import { Download, LoaderCircle } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import {
		PopoverTooltip,
		PopoverTooltipContent,
		PopoverTooltipTrigger
	} from './ui/popover-tooltip';

	type Props = {
		id: string;
	};

	let { id }: Props = $props();
	let isLoading = $state(false);

	async function handleDownload() {
		isLoading = true;
		try {
			const data = await api().downloadStationData({ id });
			if (!data) return;
			const blob = new Blob([data], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = `${id}.csv`;
			link.click();
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<PopoverTooltip openDelay={10} disableHoverableContent>
	<PopoverTooltipTrigger tabindex={-1}>
		<Button variant="ghost" size="icon" class="p-0" onclick={handleDownload}>
			{#if isLoading}
				<LoaderCircle class="size-5 shrink-0 animate-spin text-muted-foreground" />
			{:else}
				<Download class="size-5 shrink-0 text-muted-foreground" />
			{/if}
		</Button>
	</PopoverTooltipTrigger>
	<PopoverTooltipContent>
		{$LL.pages.stations.table.headers.dataDownloadTooltip()}
	</PopoverTooltipContent>
</PopoverTooltip>
