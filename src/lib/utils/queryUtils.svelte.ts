import type { QueryOptions } from '@tanstack/svelte-query';
import { readable } from 'svelte/store';

export const reactiveQueryArgs = <T extends QueryOptions>(cb: () => T) => {
	return readable(cb(), (set) => {
		$effect.pre(() => {
			set(cb());
		});
	});
};
