import type { Translation } from '../i18n-types';

const siteNameShort = `Data2Resilience`;
const siteSubtitle = `Stärkung der städtischen Resilienz gegen extreme Hitze in Dortmund`;
const de = {
	siteNameShort,
	author: `Data2Resilience Team`,
	siteSubtitle,
	siteNameLong: `${siteNameShort} | ${siteSubtitle}`,
	siteDescription: `Data2Resilience ist ein Projekt, das darauf abzielt, die urbane Widerstandsfähigkeit gegen extreme Hitze in Dortmund durch innovative biometeorologische Messnetze und bürgerschaftliches Engagement zu verbessern. Erfahren Sie mehr über unsere Initiativen und Ergebnisse.`,
	keywords: `Data2Resilience, urbane Resilienz, extreme Hitze, Dortmund, Klimawandel, biometeorologische Messung, gesellschaftliches Engagement, Hitzeresilienz, Stadtklima, Klimaanpassung`,
	twitterHandle: `RUBclim`,
	log: `Dieses Logging wurde von '{fileName}' aufgerufen`
} satisfies Translation;

export default de;
