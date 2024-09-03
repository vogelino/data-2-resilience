import { page } from '$app/stores';
import { locale } from '$i18n/i18n-svelte';
import { derived, writable } from 'svelte/store';
import { selectedStations } from './stationsStore';

export const isLeftSidebarOpened = writable(true);
export const toggleLeftSidebar = () => isLeftSidebarOpened.update((value) => !value);

export const isRightSidebarOpened = derived(
	[selectedStations, page, locale],
	([stations, currentPage, currentLocale]) => {
		return currentPage.url.pathname === `/${currentLocale}` && stations.length > 0;
	}
);

export const tabActive = writable('thermical-comfort');
