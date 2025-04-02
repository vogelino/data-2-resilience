<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { Download } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

	type Props = {
		id: string;
	};

	let { id }: Props = $props();
</script>

<Tooltip openDelay={10} disableHoverableContent>
	<TooltipTrigger>
		<Button variant="ghost" size="icon" class="size-5 p-0">
			<Download class="size-5 shrink-0 text-muted-foreground" />
		</Button>
	</TooltipTrigger>
	<TooltipContent>
		{$LL.pages.stations.table.headers.dataDownloadTooltip()}
	</TooltipContent>
</Tooltip>
