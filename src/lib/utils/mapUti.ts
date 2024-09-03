export function getPopupHtml({ title, content }: { title: string; content: string }) {
	const isDifferent = title.toLowerCase().trim() !== content.toLowerCase().trim();
	return `
    <div class="flex flex-col relative">
      <h3 class="font-bold">${title}</h3>
      ${isDifferent ? `<p>${titleCase(content)}</p>` : ``}
    </div>
  `;
}

function titleCase(str: string) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
