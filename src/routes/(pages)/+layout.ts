import { browser } from '$app/environment';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { QueryClient } from '@tanstack/svelte-query';

import type { LayoutLoad } from './$types';

export const load: LayoutLoad<{ locale: Locales }> = async ({
	data: { locale = 'en' } = { locale: 'en' }
}) => {
	await loadLocaleAsync(locale);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000
			}
		}
	});

	return { locale, queryClient };
};
