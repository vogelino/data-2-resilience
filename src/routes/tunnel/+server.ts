import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';

const SENTRY_HOST = new URL(PUBLIC_SENTRY_DSN).host;
const SENTRY_PROJECT_IDS = [new URL(PUBLIC_SENTRY_DSN).pathname.replace('/', '')];

export const POST: RequestHandler = async ({ request }) => {
	try {
		const envelopeBytes = await request.arrayBuffer();
		const envelope = new TextDecoder().decode(envelopeBytes);
		const piece = envelope.split('\n')[0];
		const header = JSON.parse(piece);
		const dsn = new URL(header['dsn']);
		const project_id = dsn.pathname?.replace('/', '');

		if (dsn.hostname !== SENTRY_HOST) {
			throw new Error(`Invalid sentry hostname: ${dsn.hostname}`);
		}

		if (!project_id || !SENTRY_PROJECT_IDS.includes(project_id)) {
			throw new Error(`Invalid sentry project id: ${project_id}`);
		}

		const upstream_sentry_url = `https://${SENTRY_HOST}/api/${project_id}/envelope/`;
		await fetch(upstream_sentry_url, {
			method: 'POST',
			body: envelopeBytes
		});

		return json({}, { status: 200 });
	} catch (e) {
		console.error('error tunneling to sentry', e);
		return json({ error: 'error tunneling to sentry' }, { status: 500 });
	}
};
