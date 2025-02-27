import { readFile } from 'fs/promises';
import path from 'path';

export async function GET({ params }) {
	const { z, x, y } = params;
	const filePath = path.join('static', 'openmaptiles', z, x, `${y}.pbf`);

	try {
		const data = await readFile(filePath);
		return new Response(data, {
			headers: {
				'Content-Type': 'application/x-protobuf'
			}
		});
	} catch (error) {
		console.error(`Tile not found: ${filePath}`, error);
		return new Response('Not Found', { status: 404 });
	}
}
