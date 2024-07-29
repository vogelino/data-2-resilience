/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const body = robots();
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'text/plain');
	return response;
}

const robots = () => {
	const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';
	return `
User-agent: *
Disallow: ${import.meta.env.PROD ? '' : '/'}

Sitemap: ${baseUrl}/sitemap.xml
  `;
};
