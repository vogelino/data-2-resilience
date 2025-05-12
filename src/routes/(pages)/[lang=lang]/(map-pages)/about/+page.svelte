<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { LL, locale } from '$i18n/i18n-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { cn } from '$lib/utils';
	import { Globe, Mail, X } from 'lucide-svelte';
	import { queryParameters } from 'sveltekit-search-params';
	import GoogleOrgLogo from './GoogleOrgLogo.svelte';
	import ICLEILogo from './ICLEILogo.svelte';
	import LUHLogo from './LUHLogo.svelte';
	import RUBLogo from './RUBLogo.svelte';

	let queryParams = $derived(queryParameters());
	let urlQuery = $derived(new URLSearchParams($queryParams).toString());
	let isAboutPage = $derived($page.url.pathname.startsWith(`/${$locale}/about`));
</script>

<Dialog.Root
	open={isAboutPage}
	onOpenChange={(isNowOpened) => {
		if (isNowOpened) return;
		goto(`/${$locale}?${urlQuery}`);
	}}
>
	<Dialog.Content
		class={cn(
			'max-h-[calc(100vh-3rem)] w-[calc(100%-3rem)] max-w-2xl overflow-x-clip rounded-lg p-0',
			'flex flex-col overflow-y-auto'
		)}
	>
		<Dialog.Header class={cn('relative')}>
			<div
				class={cn(
					'top-0 grid grid-cols-[1fr,auto] bg-background px-6 py-4 ring-1 ring-background max-sm:sticky sm:px-8 sm:pt-6 md:px-10 md:pt-8 lg:px-12 lg:pt-10',
					'border-border max-sm:border-b'
				)}
			>
				<Dialog.Title class={cn('text-left text-2xl')}>{$LL.pages.about.title()}</Dialog.Title>
				<Dialog.Close
					class={cn(
						'translate-x-1 rounded-sm transition',
						'focusable text-muted-foreground',
						'disabled:pointer-events-none data-[state=open]:bg-accent',
						'data-[state=open]:text-muted-foreground hover-hover:hover:text-foreground'
					)}
				>
					<X />
					<span class="sr-only">Close</span>
				</Dialog.Close>
			</div>
			<Dialog.Description
				class={cn(
					'[&>a]:focusable px-6 max-sm:pt-4 sm:px-8 md:px-10 lg:px-12 [&>a]:underline',
					'max-w-full text-left text-base text-foreground'
				)}
			>
				{@html $LL.pages.about.description()}
				<a
					href={$LL.pages.about.mainLink.url()}
					rel="noopener noreferrer"
					target="_blank"
					class={cn(
						'focusable transition-opacity hover-hover:hover:opacity-50',
						'underline decoration-primary underline-offset-4',
						'mt-4 flex items-center gap-x-2'
					)}
				>
					<Globe class="size-4 text-muted-foreground" />
					{$LL.pages.about.mainLink.label()}
				</a>
				<a
					href={$LL.pages.about.contactLink.url()}
					rel="noopener noreferrer"
					target="_blank"
					class={cn(
						'focusable transition-opacity hover-hover:hover:opacity-50',
						'underline decoration-primary underline-offset-4',
						'mt-2 flex items-center gap-x-2'
					)}
				>
					<Mail class="size-4 text-muted-foreground" />
					{$LL.pages.about.contactLink.label()}
				</a>
			</Dialog.Description>
		</Dialog.Header>
		<div
			class="flex flex-wrap justify-between gap-x-8 gap-y-6 px-6 pb-6 pt-10 max-sm:pt-4 sm:px-8 md:px-10 lg:px-12"
		>
			<div class={cn('flex flex-col gap-4')}>
				<a
					href={$LL.pages.about.logos.RUB.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<RUBLogo className={cn('origin-top-left max-sm:scale-75')} />
				</a>
				<a
					href={$LL.pages.about.logos.LUH.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<LUHLogo className={cn('origin-top-left max-sm:scale-75')} />
				</a>
			</div>
			<div class={cn('flex flex-wrap gap-x-8 gap-y-0')}>
				<a
					href={$LL.pages.about.logos.ICLEI.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<ICLEILogo className={cn('origin-top-left max-sm:scale-75')} />
				</a>
				<a
					href={$LL.pages.about.logos.googleOrg.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<GoogleOrgLogo className={cn('origin-top-left max-sm:scale-75')} />
				</a>
			</div>
		</div>
		<Dialog.Footer
			class={cn(
				'w-full border-t border-border bg-muted px-6 py-4 max-sm:pt-4 sm:rounded-b-lg sm:px-8 md:px-10 lg:px-12',
				'text-muted-foreground'
			)}
		>
			<ul class={cn('flex w-full gap-4 text-sm')}>
				{#each Object.values($LL.pages.about.links) as link}
					<li>
						<a
							href={`/${$locale}${link.url()}?${urlQuery}`}
							class={cn('focusable transition-colors hover-hover:hover:text-foreground')}
						>
							{link.label()}
						</a>
					</li>
				{/each}
			</ul>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
