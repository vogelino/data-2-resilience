<script lang="ts">
	import { cn } from '$lib/utils';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { page } from '$app/stores';
	import { Button } from 'components/ui/button';
	import { LL, locale } from '$i18n/i18n-svelte';
	import { goto } from '$app/navigation';
	import RUBLogo from './RUBLogo.svelte';
	import LUHLogo from './LUHLogo.svelte';
	import ICLEILogo from './ICLEILogo.svelte';
	import GoogleOrgLogo from './GoogleOrgLogo.svelte';

	const urlQuery = $page.url.searchParams.toString();
	$: isAboutPage = $page.url.pathname.startsWith(`/${$locale}/about`);
</script>

<Dialog.Root
	open={isAboutPage}
	onOpenChange={(isNowOpened) => {
		if (isNowOpened) return;
		goto(`/${$locale}?${urlQuery}`);
	}}
>
	<Dialog.Content class={cn('max-w-2xl pb-0')}>
		<Dialog.Header>
			<Dialog.Title class={cn('mb-2 text-2xl')}>{$LL.pages.about.title()}</Dialog.Title>
			<Dialog.Description class={cn('[&>a]:focusable [&>a]:underline', 'text-base text-foreground')}
				>{@html $LL.pages.about.description()}</Dialog.Description
			>
		</Dialog.Header>
		<div class="flex flex-wrap justify-between gap-x-8 gap-y-3 pb-6 pt-10">
			<div class={cn('flex flex-col gap-4')}>
				<a
					href={$LL.pages.about.logos.RUB.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<RUBLogo />
				</a>
				<a
					href={$LL.pages.about.logos.LUH.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<LUHLogo />
				</a>
			</div>
			<div class={cn('flex gap-8')}>
				<a
					href={$LL.pages.about.logos.ICLEI.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<ICLEILogo />
				</a>
				<a
					href={$LL.pages.about.logos.googleOrg.url()}
					target="_blank"
					rel="noopener noreferrer"
					class={cn('focusable transition-opacity hover-hover:hover:opacity-50')}
				>
					<GoogleOrgLogo />
				</a>
			</div>
		</div>
		<Dialog.Footer
			class={cn(
				'-ml-6 w-[calc(100%+3rem)] border-t border-border bg-muted px-6 py-4 sm:rounded-b-lg',
				'text-muted-foreground'
			)}
		>
			<ul class={cn('flex w-full gap-4 text-sm')}>
				{#each Object.values($LL.pages.about.links) as link}
					<li>
						<a
							href={link.url()}
							target="_blank"
							rel="noopener noreferrer"
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
