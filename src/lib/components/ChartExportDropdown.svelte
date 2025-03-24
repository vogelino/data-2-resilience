<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import html2canvas from 'html2canvas';
	import { Download, EllipsisVertical } from 'lucide-svelte';
	import { Button } from './ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from './ui/dropdown-menu';

	type Props = {
		disableExport?: boolean;
		chartExportId?: string;
		chartExportFilename?: string;
		onChartExportStart?: () => void;
		onChartExportEnd?: () => void;
	};

	const {
		disableExport = false,
		chartExportId,
		chartExportFilename = 'chart.png',
		onChartExportStart = () => {},
		onChartExportEnd = () => {}
	}: Props = $props();

	const exportChart = $derived(async () => {
		onChartExportStart();
		if (!chartExportId) return onChartExportEnd();
		const chart = document.querySelector(`#${chartExportId}`) as HTMLElement;
		if (!chart) return onChartExportEnd();
		const canvas = await html2canvas(chart, {
			scale: 4,
			removeContainer: true,
			ignoreElements: (el) => {
				return el.classList.contains('chart-export-ignore');
			},
			onclone: (_doc, el) => {
				const legendLabels = el.querySelectorAll('.chart-legend-label');
				for (const label of legendLabels) {
					label.classList.add('-translate-y-1/2');
				}
				el.classList.remove('border', 'border-b');
				el.classList.add('border-transparent');
			}
		});
		const link = document.createElement('a');
		link.download = chartExportFilename;
		link.href = canvas.toDataURL();
		link.click();
		link.remove();
		onChartExportEnd();
	});
</script>

{#if chartExportId}
	<DropdownMenu>
		<DropdownMenuTrigger disabled={disableExport}>
			<Button variant="ghost" size="icon" disabled={disableExport} class="chart-export-ignore">
				<EllipsisVertical class="size-6" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="chart-export-ignore">
			<DropdownMenuItem class="flex cursor-pointer items-center gap-8" onclick={exportChart}>
				{$LL.generic.chartExportButtonLabel()}
				<Download class="size-5 text-muted-foreground" />
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
{/if}
