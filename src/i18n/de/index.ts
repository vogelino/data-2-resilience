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
	},
	generic: {
		expand: 'Mehr erfahren',
		collapse: 'Zusammenklappen'
	},
	navigation: {
		header: {
			about: 'Über dieses Dashboard'
		},
		tabs: {
			thermicalComfort: 'Thermischer Komfort',
			actualMeasurements: 'Aktuelle Messwerte',
			stations: 'Messstationen'
		}
	},
	pages: {
		thermicalComfort: {
			title: 'Wie warm fühlt sich deine Stadt an?',
			intro: [
				'Thermischer Komfort ist der Wohlfühlzustand, bei dem eine Person mit der thermischen Umgebung zufrieden ist. Das bedeutet, dass Temperatur, Luftfeuchtigkeit, Luftbewegung und Strahlungswärme in einem als angenehm empfundenen Bereich liegen. Er kann anhand verschiedener Indikatoren gemessen werden:'
			],
			indicatorsNavAriaLabel:
				'Wähle einen Indikator, um die angezeigten Daten auf der Karte zu ändern.'
		},
		measurements: {
			title: 'Was wird aktuell gemessen?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
				'Aktuell Messwerte können sowohl für die Messstationen als auch für die einzelnen Stadtbezirke angezeigt werden.'
			]
		},
		stations: {
			title: 'Wie messen wir thermischen Komfort?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
			],
			stationsDescriptions: {
				wheather: {
					title: 'Wetterstation mit Blackglobe-Sensor',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
				},
				airTemperatureAndHumidity: {
					title: 'Lufttemperatur- und Feuchtigkeitssensor',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
				}
			}
		}
	},
	indicators: {
		utci: {
			title: 'Universeller Thermischer Klimaindex (UTCI)',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.',
			types: {
				byClass: {
					title: 'Nach Klasse',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
				},
				byValue: {
					title: 'Nach Wert',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
				}
			}
		},
		pet: {
			title: 'Physiologisch Äquivalente Temperatur (PET)',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		},
		mrt: {
			title: 'Mittelwert der regionalen Temperatur (MRT)',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		}
	}
} satisfies BaseTranslation;

export default de;
