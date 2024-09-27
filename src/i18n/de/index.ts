import type { BaseTranslation } from '../i18n-types';

const siteNameShort = `Data2Resilience`;
const siteSubtitle = `Dashboard für Thermischen Komfort in Dortmund`;
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
	welcome: {
		title: 'Herzlich willkommen',
		text: [
			'Das Projekt Data2Resilience nutzt ein neues biometeorologisches Messnetzwerk zur Beobachtung und Vorhersage von Hitze und bezieht die Bürger frühzeitig ein, um Herausforderungen und Bedürfnisse in Dortmund zu adressieren. Dieses Dashboard ermöglicht Ihnen, Echtzeitdaten zum thermischen Komfort in der Stadt zu erkunden.'
		],
		buttons: {
			confirm: "Verstanden, los geht's",
			launchTour: 'Einführung starten'
		},
		expandButtonLabel: 'Einleitung erneut anzeigen'
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
	rightSidebar: {
		title: 'Ausgewählte Messstationen'
	},
	pages: {
		thermicalComfort: {
			title: 'Wie warm fühlt sich deine Stadt an?',
			intro: [
				'Thermischer Komfort ist der Wohlfühlzustand, bei dem eine Person mit der thermischen Umgebung zufrieden ist. Das bedeutet, dass Temperatur, Luftfeuchtigkeit, Luftbewegung und Strahlungswärme in einem als angenehm empfundenen Bereich liegen. Er kann anhand verschiedener Indikatoren gemessen werden:'
			],
			timeRangeAlert: `Daten nur verfügbar im Zeitraum vom {startDate:string} bis {endDate:string}.`,
			indicatorsNavAriaLabel:
				'Wähle einen Indikator, um die angezeigten Daten auf der Karte zu ändern.'
		},
		measurements: {
			title: 'Was wird aktuell gemessen?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
				'Aktuell Messwerte können sowohl für die Messstationen als auch für die einzelnen Stadtbezirke angezeigt werden.'
			],
			stationsSelect: {
				placeholder: 'Eine oder mehrere Stationen auswählen',
				label: 'Ausgewählte Messstationen'
			},
			unitSelect: {
				noUnitFound: 'Keine Einheit gefunden',
				placeholder: 'Einheit auswählen',
				searchPlaceholder: 'Einheit suchen...',
				xOutOfY: '{part} von {total}',
				units: {
					utci: {
						label: 'Universeller Thermischer Komfortindex (UTCI) (°C)',
						shortLabel: 'UTCI (°C)',
						description:
							'Der <strong>Universelle Thermische Komfortindex (UTCI)</strong> beschreibt einen Index, der die thermischen Bedingungen für eine Standardperson in einer standardisierten Umgebung darstellt.'
					},
					pet: {
						label: 'Physiologisch Äquivalente Temperatur (PET) (°C)',
						shortLabel: 'PET (°C)',
						description:
							'Die <strong>Physiologisch Äquivalente Temperatur (PET)</strong> beschreibt ein Maß für die thermische Belastung, das die physiologische Reaktion des menschlichen Körpers auf die Umgebungsbedingungen berücksichtigt.'
					},
					temp: {
						label: 'Lufttemperatur (°C)',
						shortLabel: 'Temp (°C)',
						description:
							'Die <strong>Lufttemperatur</strong> beschreibt die gemessene Temperatur der umgebenden Luft in Grad Celsius.'
					},
					pressure: {
						label: 'Luftdruck (hPa)',
						shortLabel: 'Druck (hPa)',
						description:
							'Der <strong>Luftdruck</strong> beschreibt den durch das Gewicht der Atmosphäre ausgeübten Druck, gemessen in Hektopascal.'
					},
					precipitation: {
						label: 'Niederschlag (mm)',
						shortLabel: 'Niederschlag (mm)',
						description:
							'Der <strong>Niederschlag</strong> beschreibt die Menge an Wasser, die als Regen, Schnee oder in anderer Form vom Himmel fällt, gemessen in Millimetern.'
					},
					relativeHumidity: {
						label: 'Relative Luftfeuchtigkeit (%)',
						shortLabel: 'RLF (%)',
						description:
							'Die <strong>Relative Luftfeuchtigkeit</strong> beschreibt den Anteil des Wasserdampfs in der Luft im Verhältnis zur maximalen Menge, die die Luft bei dieser Temperatur aufnehmen könnte.'
					},
					windSpeed: {
						label: 'Windgeschwindigkeit (m/s)',
						shortLabel: 'WG (m/s)',
						description:
							'Die <strong>Windgeschwindigkeit</strong> beschreibt die Geschwindigkeit, mit der sich die Luft bewegt, gemessen in Metern pro Sekunde.'
					},
					maxWindSpeed: {
						label: 'Maximale Windgeschwindigkeit (m/s)',
						shortLabel: 'Max WG (m/s)',
						description:
							'Die <strong>Maximale Windgeschwindigkeit</strong> beschreibt die höchste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.'
					},
					windDirection: {
						label: 'Windrichtung (°)',
						shortLabel: 'WR (°)',
						description:
							'Die <strong>Windrichtung</strong> beschreibt die Richtung, aus der der Wind weht, gemessen in Grad.'
					},
					midRadiationTemp: {
						label: 'Mittlere Strahlungstemperatur (°C)',
						shortLabel: 'MST (°C)',
						description:
							'Die <strong>Mittlere Strahlungstemperatur</strong> beschreibt die durchschnittliche Temperatur der umgebenden Oberflächen, die Wärmestrahlung abgeben.'
					},
					lighningStrikesCount: {
						label: 'Anzahl der Blitzeinschläge',
						shortLabel: 'BE Anzahl',
						description:
							'Die <strong>Anzahl der Blitzeinschläge</strong> beschreibt die Häufigkeit von Blitzeinschlägen in einem bestimmten Gebiet und Zeitraum.'
					},
					avgLighningStrikesDist: {
						label: 'Durchschnittliche Blitzentfernung (m)',
						shortLabel: 'Durchschn. BE (m)',
						description:
							'Die <strong>Durchschnittliche Blitzentfernung</strong> beschreibt die mittlere Entfernung von Blitzeinschlägen zu einem Bezugspunkt, gemessen in Metern.'
					},
					solarradiation: {
						label: 'Solarstrahlung (W/m²)',
						shortLabel: 'SS (W/m²)',
						description:
							'Die <strong>Solarstrahlung</strong> beschreibt die Menge an Sonnenenergie, die pro Flächeneinheit empfangen wird, gemessen in Watt pro Quadratmeter.'
					},
					vaporPressure: {
						label: 'Dampfdruck (hPa)',
						shortLabel: 'DP (hPa)',
						description:
							'Der <strong>Dampfdruck</strong> beschreibt den Druck, den der Wasserdampf in der Luft ausübt, gemessen in Hektopascal.'
					}
				}
			}
		},
		stations: {
			title: 'Wie messen wir thermischen Komfort?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
			],
			stationsDescriptions: {
				weather: {
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
	},
	map: {
		zoom: {
			navAlt: 'Zoom-Navigation',
			zoomIn: 'Reinzoomen',
			zoomOut: 'Rauszoomen'
		}
	}
} satisfies BaseTranslation;

export default de;
