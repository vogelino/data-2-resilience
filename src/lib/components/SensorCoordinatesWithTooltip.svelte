<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { Check, ChevronDown, Copy, LoaderCircle, MapPin } from 'lucide-svelte';
	import HighlightedSearchQuery from './HighlightedSearchQuery.svelte';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
	import DropdownMenuItem from './ui/dropdown-menu/dropdown-menu-item.svelte';

	interface Props {
		latitude: number;
		longitude: number;
		searchQuery?: string;
	}

	let { latitude, longitude, searchQuery }: Props = $props();

	let copyState: 'idle' | 'copying' | 'copied' = $state('idle');

	const text = $derived(
		`${latitude.toLocaleString($locale)}, ${longitude.toLocaleString($locale)}`
	);
	const googleMapsLink = $derived(`https://www.google.com/maps?q=${latitude},${longitude}`);

	let to: NodeJS.Timeout;
	const copyToClipboard = $derived(async () => {
		clearTimeout(to);
		copyState = 'copying';
		const clipboardText = [latitude, longitude].join(', ');
		await navigator.clipboard.writeText(clipboardText);
		copyState = 'copied';
		to = setTimeout(() => {
			copyState = 'idle';
		}, 2000);
	});
</script>

<DropdownMenu closeOnItemClick={false}>
	<DropdownMenuTrigger
		class={cn(
			'focusable hover-hover:hover:bg-foreground hover-hover:hover:text-background',
			'group flex items-center gap-2 whitespace-nowrap rounded-full p-1 transition',
			text && '-ml-2.5 pl-2.5 pr-1.5'
		)}
	>
		<span>
			<HighlightedSearchQuery {text} {searchQuery} />
		</span>
		<ChevronDown
			class={cn('size-4', text && 'text-muted-foreground hover-hover:group-hover:text-background')}
		/>
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuItem class="flex w-full cursor-pointer items-center justify-between gap-6">
			<a href={googleMapsLink} target="_blank" rel="noopener noreferrer" class="contents">
				{$LL.pages.stations.table.cells.coordinates.googleMapsLinkText()}
				<MapPin class="size-5 text-muted-foreground" />
			</a>
		</DropdownMenuItem>
		<DropdownMenuItem
			class={cn(
				'flex w-full cursor-pointer items-center justify-between gap-6',
				copyState === 'copied' &&
					cn(
						'bg-green-100 text-green-800',
						'data-[highlighted]:bg-green-100 data-[highlighted]:text-green-800'
					)
			)}
			onclick={copyToClipboard}
		>
			{#if copyState === 'copying'}
				{$LL.pages.stations.table.cells.coordinates.copyCoordinates()}
				<LoaderCircle class="size-5 animate-spin text-muted-foreground" />
			{:else if copyState === 'copied'}
				{$LL.pages.stations.table.cells.coordinates.copiedToClipboard()}
				<Check class="size-5 text-green-500" />
			{:else}
				{$LL.pages.stations.table.cells.coordinates.copyCoordinates()}
				<Copy class="size-5 text-muted-foreground" />
			{/if}
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
