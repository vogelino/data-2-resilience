import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		sourcemap: true
	},
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'rubclim',
				project: 'd2r-dashboard'
			}
		}),
		sveltekit()
	]
});
