<script lang="ts">
	import LL, { locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { queryParameters } from 'sveltekit-search-params';

	type Props = {
		title: string;
		content: string;
	};

	let { title, content }: Props = $props();

	let queryParams = $derived(queryParameters());
	let urlQuery = $derived(new URLSearchParams($queryParams).toString());
</script>

<main class="h-[calc(100vh-var(--headerHeight,5rem))] w-screen overflow-y-auto overflow-x-clip">
	<div class="prose mx-auto h-auto px-6 py-16">
		<span class="mb-8 inline-flex items-baseline gap-2 text-muted-foreground">
			<span>←</span>
			<a
				href={`/${$locale}?${urlQuery}`}
				class={cn(
					'not-prose mb-2 text-base font-normal text-muted-foreground hover-hover:hover:underline',
					'decoration-muted-foreground underline-offset-2 transition hover-hover:hover:text-foreground'
				)}
			>
				{$LL.navigation.backToHome()}
			</a>
		</span>
		<h1>{title}</h1>
		{@html content}
	</div>
</main>
