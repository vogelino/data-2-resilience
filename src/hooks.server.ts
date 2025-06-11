import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { base } from '$app/paths';
import type { Locales } from '$i18n/i18n-types.js';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { getPathnameWithoutBase } from './utils.js';
import { PUBLIC_SENTRY_DSN, PUBLIC_SENTRY_TRACES_SAMPLE_RATE } from '$env/static/public';
import { handleProxies } from '@kitql/handles';

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	tracesSampleRate: Number(PUBLIC_SENTRY_TRACES_SAMPLE_RATE)
});
loadAllLocales();
const L = i18n();

const SENTRY_HOST = new URL(PUBLIC_SENTRY_DSN).host;
const SENTRY_PROJECT_ID = [new URL(PUBLIC_SENTRY_DSN).pathname.replace('/', '')];
const SENTRY_UPSTREAM_URL = `https://${SENTRY_HOST}/api/${SENTRY_PROJECT_ID}/envelope/`;
const SENTRY_KEY = new URL(PUBLIC_SENTRY_DSN).username;

const proxies = handleProxies([
	[
		'/sentry-tunnel',
		{
			to: SENTRY_UPSTREAM_URL,
			requestHook: (event) => {
				const request = event.request.clone();
				// https://develop.sentry.dev/sdk/data-model/envelopes/#authentication
				request.headers.set('X-Sentry-Auth', `Sentry sentry_version=7, sentry_key=${SENTRY_KEY}`);
				// https://develop.sentry.dev/sdk/data-model/envelopes/#http-headers
				request.headers.set('Content-Type', 'application/x-sentry-envelope');
				return request;
			}
		}
	]
]);

export const handle: Handle = sequence(
	Sentry.sentryHandle(),
	proxies,
	async ({ event, resolve }) => {
		// read language slug
		const [, lang] = getPathnameWithoutBase(event.url).split('/');

		// redirect to base locale if no locale slug was found
		if (!lang) {
			const locale = getPreferredLocale(event);

			throw redirect(307, `${base}/${locale}`);
		}

		// if slug is not a locale, use base locale (e.g. api endpoints)
		const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
		const LL = L[locale];

		// bind locale and translation functions to current request
		event.locals = {
			locale,
			LL
		};

		// replace html lang attribute with correct language
		return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
	}
);

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};
export const handleError = Sentry.handleErrorWithSentry();
