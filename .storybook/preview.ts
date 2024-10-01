import type { Preview } from '@storybook/svelte';
import '../src/app.css';
import { loadLocaleAsync } from '../src/i18n/i18n-util.async';
import { i18nObject } from '../src/i18n/i18n-util.js';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	loaders: [
		async () => {
			await loadLocaleAsync('en');
			const LL = i18nObject('en');

			return { locale: 'en', LL };
		}
	]
};

export default preview;
