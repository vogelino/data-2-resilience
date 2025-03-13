import { json } from '@sveltejs/kit';
import { chromium } from 'playwright';
import type { RequestHandler } from './stations-timeseries/$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const queryParams = url.searchParams;

		const browser = await chromium.launch();
		const context = await browser.newContext({
			viewport: { width: 800, height: 600 },
			deviceScaleFactor: 4
		});
		const page = await context.newPage();

		const type = queryParams.get('type') || '';
		const lang = queryParams.get('lang') || 'de';

		if (['timeseries', 'barchart', 'histogram'].indexOf(type) === -1) {
			throw new Error('Type is required');
		}

		// Construct the export URL
		const exportUrl = new URL(
			`${url.origin}/${lang}/export/stations-${type}?${queryParams.toString()}`
		).toString();

		// Navigate and wait for the chart to be rendered
		await page.goto(exportUrl);
		await page.waitForSelector('g.Axis');

		// Take screenshot
		const screenshot = await page.locator('#export-container').screenshot({
			type: 'png'
		});

		// Cleanup
		await browser.close();

		return new Response(screenshot, {
			headers: {
				'Content-Type': 'image/png',
				'Content-Disposition': `attachment; filename="chart-${type}.png"`
			}
		});
	} catch (error) {
		console.error('Export error:', error);
		return json({ error: 'Failed to generate export' }, { status: 500 });
	}
};
