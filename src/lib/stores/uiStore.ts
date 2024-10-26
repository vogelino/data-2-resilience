import { writable } from 'svelte/store';
import { queryParam, ssp } from 'sveltekit-search-params';

export const isLeftSidebarOpened = queryParam('sidebar_open', ssp.boolean(true));
export const toggleLeftSidebar = () => isLeftSidebarOpened.update((value) => !value);

export const tabActive = writable('thermical-comfort');
