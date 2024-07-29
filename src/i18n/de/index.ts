import type { BaseTranslation } from '../i18n-types';

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
	log: `Dieses Logging wurde von '{fileName:string}' aufgerufen`,
	themeColor: `#007bff`,
	headImages: {
		og: {
			large: 'Screenshot des Data2Resilience-Karten-Dashboards',
			square: 'Logo des Data2Resilience-Projektes'
		},
		twitter: 'Screenshot des Data2Resilience-Karten-Dashboards'
	},
	errors: {
		genericErrorLabel: 'Fehler',
		unexpectedError: {
			label: 'Unerwarteter Fehler',
			description: `Ups, es scheint, dass etwas schiefgelaufen ist: "{errorMessage:string}". Wir entschuldigen uns. Bitte versuchen Sie es erneut oder navigieren Sie zur Startseite.`
		},
		fourOhFour: {
			label: 'Seite nicht gefunden',
			description: `Ups, es scheint, dass die von Ihnen gesuchte Seite nicht existiert. Nichts ist schiefgelaufen, wir helfen Ihnen, auf den Weg zu kommen.`,
			homepageLinkText: 'Zur Startseite'
		}
	}
} satisfies BaseTranslation;

export default de;
