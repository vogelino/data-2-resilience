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
			description: `Ups, es scheint, dass etwas schiefgelaufen ist. Wir entschuldigen uns. Bitte versuchen Sie es erneut oder navigieren Sie zur Startseite.`
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
			actualMeasurements: 'Aktuelle Messwerte',
			heatStress: 'Hitzestress',
			stations: 'Messstationen'
		}
	},
	rightSidebar: {
		title: 'Ausgewählte Messstationen'
	},
	pages: {
		heatStress: {
			title: 'Wie warm fühlt sich deine Stadt an?',
			intro: [
				'Hitzestress ist der Zustand von Unbehagen und körperlicher Belastung, der auftritt, wenn die thermische Umgebung die Fähigkeit einer Person übersteigt, Wärme abzuleiten. Das bedeutet, dass Temperatur, Luftfeuchtigkeit, Luftbewegung und Strahlungswärme auf einem Niveau liegen, das Unbehagen oder Gesundheitsrisiken verursachen kann. Hitzestress kann anhand verschiedener Indikatoren bewertet werden:'
			],
			timeRangeAlert: `Daten nur verfügbar im Zeitraum vom {startDate:string} bis {endDate:string}.`,
			indicatorsNavAriaLabel:
				'Wähle einen Indikator, um die angezeigten Daten auf der Karte zu ändern.',
			showHealthRisks: 'Gesundheitsrisiken anzeigen'
		},
		measurements: {
			title: 'Was wird aktuell gemessen?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
				'Aktuell Messwerte können sowohl für die Messstationen als auch für die einzelnen Stadtbezirke angezeigt werden.'
			],
			noDataAvailable: 'Keine Daten für die ausgewählte Konfiguration verfügbar',
			someInsufficientDataStations:
				'Für den gewählten Indikator <strong>{unit:string}</strong> werden für die Stationen <strong>{stations:string}</strong> nicht genügend Daten erhoben, um sie in aggregierten From anzuzeigen.',
			allInsufficientDataStations:
				'Keine der ausgewahlten Stationen erhebt genügend Daten für den Indikator <strong>{unit:string}</strong>, um sie in aggregierten From anzuzeigen.',
			singleInsufficientDataStation:
				'Die Station <strong>{station:string}</strong> erhebt nicht genügend Daten für den Indikator <strong>{unit:string}</strong>, um sie in aggregierten From anzuzeigen.',
			someUnsupportedStations:
				'Für den gewählten Indikator <strong>{unit:string}</strong> erheben die Stationen <strong>{stations:string}</strong> keine Daten.',
			allUnsupportedStations:
				'Keine der ausgewählten Stationen erhebt Daten für den Indikator <strong>{unit:string}</strong>.',
			singleUnsupportedStation:
				'Die Station <strong>{station:string}</strong> erhebt keine Daten für den Indikator <strong>{unit:string}</strong>.',
			stationsSelect: {
				placeholder: 'Eine oder mehrere Stationen auswählen',
				label: 'Ausgewählte Messstationen'
			},
			unitSelect: {
				noUnitFound: 'Keine Einheit gefunden',
				placeholder: 'Einheit auswählen',
				searchPlaceholder: 'Einheit suchen...',
				xOutOfY: '{part} von {total}',
				stationsHeaderLabel: `Stationnamen`,
				units: {
					absolute_humidity_max: {
						label: 'Maximale absolute Luftfeuchtigkeit (g/m³)',
						shortLabel: 'Max ALF (g/m³)',
						description:
							'Die <strong>Maximale absolute Luftfeuchtigkeit</strong> beschreibt die höchste Menge an Wasserdampf in der Luft, gemessen in Gramm pro Kubikmeter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity_min: {
						label: 'Minimale absolute Luftfeuchtigkeit (g/m³)',
						shortLabel: 'Min ALF (g/m³)',
						description:
							'Die <strong>Minimale absolute Luftfeuchtigkeit</strong> beschreibt die niedrigste Menge an Wasserdampf in der Luft, gemessen in Gramm pro Kubikmeter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity: {
						label: 'Absolute Luftfeuchtigkeit (g/m³)',
						shortLabel: 'ALF (g/m³)',
						description:
							'Die <strong>Absolute Luftfeuchtigkeit</strong> beschreibt die Menge an Wasserdampf in der Luft, gemessen in Gramm pro Kubikmeter.',
						unitOnly: 'g/m³'
					},
					air_temperature_max: {
						label: 'Maximale Lufttemperatur (°C)',
						shortLabel: 'Max Temp (°C)',
						description:
							'Die <strong>Maximale Lufttemperatur</strong> beschreibt die höchste gemessene Temperatur der umgebenden Luft in Grad Celsius.',
						unitOnly: '°C'
					},
					air_temperature_min: {
						label: 'Minimale Lufttemperatur (°C)',
						shortLabel: 'Min Temp (°C)',
						description:
							'Die <strong>Minimale Lufttemperatur</strong> beschreibt die niedrigste gemessene Temperatur der umgebenden Luft in Grad Celsius.',
						unitOnly: '°C'
					},
					air_temperature: {
						label: 'Lufttemperatur (°C)',
						shortLabel: 'Temp (°C)',
						description:
							'Die <strong>Lufttemperatur</strong> beschreibt die gemessene Temperatur der umgebenden Luft in Grad Celsius.',
						unitOnly: '°C'
					},
					atmospheric_pressure_max: {
						label: 'Maximaler Luftdruck (hPa)',
						shortLabel: 'Max Druck (hPa)',
						description:
							'Der <strong>Maximale Luftdruck</strong> beschreibt den höchsten Druck, der durch das Gewicht der Atmosphäre ausgeübt wird, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_min: {
						label: 'Minimaler Luftdruck (hPa)',
						shortLabel: 'Min Druck (hPa)',
						description:
							'Der <strong>Minimale Luftdruck</strong> beschreibt den niedrigsten Druck, der durch das Gewicht der Atmosphäre ausgeübt wird, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_max: {
						label: 'Maximaler reduzierter Luftdruck (hPa)',
						shortLabel: 'Max red. Druck (hPa)',
						description:
							'Der <strong>Maximale reduzierte Luftdruck</strong> beschreibt den höchsten auf Meereshöhe reduzierte Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_min: {
						label: 'Minimaler reduzierter Luftdruck (hPa)',
						shortLabel: 'Min red. Druck (hPa)',
						description:
							'Der <strong>Minimale reduzierte Luftdruck</strong> beschreibt den niedrigsten auf Meereshöhe reduzierte Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced: {
						label: 'Reduzierter Luftdruck (hPa)',
						shortLabel: 'Red. Druck (hPa)',
						description:
							'Der <strong>Reduzierte Luftdruck</strong> beschreibt den auf Meereshöhe reduzierten Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure: {
						label: 'Luftdruck (hPa)',
						shortLabel: 'Druck (hPa)',
						description:
							'Der <strong>Luftdruck</strong> beschreibt den durch das Gewicht der Atmosphäre ausgeübten Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					dew_point_max: {
						label: 'Maximaler Taupunkt (°C)',
						shortLabel: 'Max TP (°C)',
						description:
							'Der <strong>Maximale Taupunkt</strong> beschreibt die höchste Temperatur, bei der die Luft mit Wasserdampf gesättigt ist, gemessen in Grad Celsius.',
						unitOnly: '°C'
					},
					dew_point_min: {
						label: 'Minimaler Taupunkt (°C)',
						shortLabel: 'Min TP (°C)',
						description:
							'Der <strong>Minimale Taupunkt</strong> beschreibt die niedrigste Temperatur, bei der die Luft mit Wasserdampf gesättigt ist, gemessen in Grad Celsius.',
						unitOnly: '°C'
					},
					dew_point: {
						label: 'Taupunkt (°C)',
						shortLabel: 'TP (°C)',
						description:
							'Der <strong>Taupunkt</strong> beschreibt die Temperatur, bei der die Luft mit Wasserdampf gesättigt ist, gemessen in Grad Celsius.',
						unitOnly: '°C'
					},
					heat_index_max: {
						label: 'Maximaler Hitzeindex (°C)',
						shortLabel: 'Max HI (°C)',
						description:
							'Der <strong>Maximale Hitzeindex</strong> beschreibt die höchste gefühlte Temperatur, basierend auf Lufttemperatur und Luftfeuchtigkeit.',
						unitOnly: '°C'
					},
					heat_index_min: {
						label: 'Minimaler Hitzeindex (°C)',
						shortLabel: 'Min HI (°C)',
						description:
							'Der <strong>Minimale Hitzeindex</strong> beschreibt die niedrigste gefühlte Temperatur, basierend auf Lufttemperatur und Luftfeuchtigkeit.',
						unitOnly: '°C'
					},
					heat_index: {
						label: 'Hitzeindex (°C)',
						shortLabel: 'HI (°C)',
						description:
							'Der <strong>Hitzeindex</strong> beschreibt die gefühlte Temperatur, basierend auf Lufttemperatur und Luftfeuchtigkeit.',
						unitOnly: '°C'
					},
					lightning_average_distance_max: {
						label: 'Maximale durchschnittliche Blitzentfernung (m)',
						shortLabel: 'Max Durchschn. BE (m)',
						description:
							'Die <strong>Maximale durchschnittliche Blitzentfernung</strong> beschreibt die größte mittlere Entfernung von Blitzeinschlägen zu einem Bezugspunkt, gemessen in Metern.',
						unitOnly: 'm'
					},
					lightning_average_distance_min: {
						label: 'Minimale durchschnittliche Blitzentfernung (m)',
						shortLabel: 'Min Durchschn. BE (m)',
						description:
							'Die <strong>Minimale durchschnittliche Blitzentfernung</strong> beschreibt die kleinste mittlere Entfernung von Blitzeinschlägen zu einem Bezugspunkt, gemessen in Metern.',
						unitOnly: 'm'
					},
					lightning_average_distance: {
						label: 'Durchschnittliche Blitzentfernung (m)',
						shortLabel: 'Durchschn. BE (m)',
						description:
							'Die <strong>Durchschnittliche Blitzentfernung</strong> beschreibt die mittlere Entfernung von Blitzeinschlägen zu einem Bezugspunkt, gemessen in Metern.',
						unitOnly: 'm'
					},
					lightning_strike_count_max: {
						label: 'Maximale Anzahl der Blitzeinschläge',
						shortLabel: 'Max BE Anzahl',
						description:
							'Die <strong>Maximale Anzahl der Blitzeinschläge</strong> beschreibt die höchste Häufigkeit von Blitzeinschlägen in einem bestimmten Gebiet und Zeitraum.',
						unitOnly: ''
					},
					lightning_strike_count_min: {
						label: 'Minimale Anzahl der Blitzeinschläge',
						shortLabel: 'Min BE Anzahl',
						description:
							'Die <strong>Minimale Anzahl der Blitzeinschläge</strong> beschreibt die niedrigste Häufigkeit von Blitzeinschlägen in einem bestimmten Gebiet und Zeitraum.',
						unitOnly: ''
					},
					lightning_strike_count: {
						label: 'Anzahl der Blitzeinschläge',
						shortLabel: 'BE Anzahl',
						description:
							'Die <strong>Anzahl der Blitzeinschläge</strong> beschreibt die Häufigkeit von Blitzeinschlägen in einem bestimmten Gebiet und Zeitraum.',
						unitOnly: ''
					},
					maximum_wind_speed_max: {
						label: 'Maximale maximale Windgeschwindigkeit (m/s)',
						shortLabel: 'Max max WG (m/s)',
						description:
							'Die <strong>Maximale maximale Windgeschwindigkeit</strong> beschreibt die höchste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed_min: {
						label: 'Minimale maximale Windgeschwindigkeit (m/s)',
						shortLabel: 'Min max WG (m/s)',
						description:
							'Die <strong>Minimale maximale Windgeschwindigkeit</strong> beschreibt die niedrigste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed: {
						label: 'Maximale Windgeschwindigkeit (m/s)',
						shortLabel: 'Max WG (m/s)',
						description:
							'Die <strong>Maximale Windgeschwindigkeit</strong> beschreibt die höchste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					mrt_max: {
						label: 'Maximale mittlere Strahlungstemperatur (°C)',
						shortLabel: 'Max MST (°C)',
						description:
							'Die <strong>Maximale mittlere Strahlungstemperatur</strong> beschreibt die höchste durchschnittliche Temperatur der umgebenden Oberflächen, die Wärmestrahlung abgeben.',
						unitOnly: '°C'
					},
					mrt_min: {
						label: 'Minimale mittlere Strahlungstemperatur (°C)',
						shortLabel: 'Min MST (°C)',
						description:
							'Die <strong>Minimale mittlere Strahlungstemperatur</strong> beschreibt die niedrigste durchschnittliche Temperatur der umgebenden Oberflächen, die Wärmestrahlung abgeben.',
						unitOnly: '°C'
					},
					mrt: {
						label: 'Mittlere Strahlungstemperatur (°C)',
						shortLabel: 'MST (°C)',
						description:
							'Die <strong>Mittlere Strahlungstemperatur</strong> beschreibt die durchschnittliche Temperatur der umgebenden Oberflächen, die Wärmestrahlung abgeben.',
						unitOnly: '°C'
					},
					pet_category: {
						label: 'PET-Kategorie',
						shortLabel: 'PET Kat.',
						description:
							'Die <strong>PET-Kategorie</strong> beschreibt die Klassifizierung der physiologisch äquivalenten Temperatur in Bezug auf thermischen Komfort.',
						unitOnly: ''
					},
					pet_max: {
						label: 'Maximale physiologisch äquivalente Temperatur (PET) (°C)',
						shortLabel: 'Max PET (°C)',
						description:
							'Die <strong>Maximale physiologisch äquivalente Temperatur (PET)</strong> beschreibt die höchste gemessene PET in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					pet_min: {
						label: 'Minimale physiologisch äquivalente Temperatur (PET) (°C)',
						shortLabel: 'Min PET (°C)',
						description:
							'Die <strong>Minimale physiologisch äquivalente Temperatur (PET)</strong> beschreibt die niedrigste gemessene PET in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					pet: {
						label: 'Physiologisch Äquivalente Temperatur (PET) (°C)',
						shortLabel: 'PET (°C)',
						description:
							'Die <strong>Physiologisch Äquivalente Temperatur (PET)</strong> beschreibt ein Maß für die thermische Belastung, das die physiologische Reaktion des menschlichen Körpers auf die Umgebungsbedingungen berücksichtigt.',
						unitOnly: '°C'
					},
					precipitation_sum_max: {
						label: 'Maximale Niederschlagsmenge (mm)',
						shortLabel: 'Max Niederschlag (mm)',
						description:
							'Die <strong>Maximale Niederschlagsmenge</strong> beschreibt die höchste Menge an Wasser, die als Regen, Schnee oder in anderer Form vom Himmel fällt, gemessen in Millimetern.',
						unitOnly: 'mm'
					},
					precipitation_sum_min: {
						label: 'Minimale Niederschlagsmenge (mm)',
						shortLabel: 'Min Niederschlag (mm)',
						description:
							'Die <strong>Minimale Niederschlagsmenge</strong> beschreibt die niedrigste Menge an Wasser, die als Regen, Schnee oder in anderer Form vom Himmel fällt, gemessen in Millimetern.',
						unitOnly: 'mm'
					},
					precipitation_sum: {
						label: 'Niederschlag (mm)',
						shortLabel: 'Niederschlag (mm)',
						description:
							'Der <strong>Niederschlag</strong> beschreibt die Menge an Wasser, die als Regen, Schnee oder in anderer Form vom Himmel fällt, gemessen in Millimetern.',
						unitOnly: 'mm'
					},
					relative_humidity_max: {
						label: 'Maximale relative Luftfeuchtigkeit (%)',
						shortLabel: 'Max RLF (%)',
						description:
							'Die <strong>Maximale relative Luftfeuchtigkeit</strong> beschreibt den höchsten Anteil des Wasserdampfs in der Luft im Verhältnis zur maximalen Menge, die die Luft bei dieser Temperatur aufnehmen könnte.',
						unitOnly: '%'
					},
					relative_humidity_min: {
						label: 'Minimale relative Luftfeuchtigkeit (%)',
						shortLabel: 'Min RLF (%)',
						description:
							'Die <strong>Minimale relative Luftfeuchtigkeit</strong> beschreibt den niedrigsten Anteil des Wasserdampfs in der Luft im Verhältnis zur maximalen Menge, die die Luft bei dieser Temperatur aufnehmen könnte.',
						unitOnly: '%'
					},
					relative_humidity: {
						label: 'Relative Luftfeuchtigkeit (%)',
						shortLabel: 'RLF (%)',
						description:
							'Die <strong>Relative Luftfeuchtigkeit</strong> beschreibt den Anteil des Wasserdampfs in der Luft im Verhältnis zur maximalen Menge, die die Luft bei dieser Temperatur aufnehmen könnte.',
						unitOnly: '%'
					},
					solar_radiation_max: {
						label: 'Maximale Solarstrahlung (W/m²)',
						shortLabel: 'Max SS (W/m²)',
						description:
							'Die <strong>Maximale Solarstrahlung</strong> beschreibt die höchste Menge an Sonnenenergie, die pro Flächeneinheit empfangen wird, gemessen in Watt pro Quadratmeter.',
						unitOnly: 'W/m²'
					},
					solar_radiation_min: {
						label: 'Minimale Solarstrahlung (W/m²)',
						shortLabel: 'Min SS (W/m²)',
						description:
							'Die <strong>Minimale Solarstrahlung</strong> beschreibt die niedrigste Menge an Sonnenenergie, die pro Flächeneinheit empfangen wird, gemessen in Watt pro Quadratmeter.',
						unitOnly: 'W/m²'
					},
					solar_radiation: {
						label: 'Solarstrahlung (W/m²)',
						shortLabel: 'SS (W/m²)',
						description:
							'Die <strong>Solarstrahlung</strong> beschreibt die Menge an Sonnenenergie, die pro Flächeneinheit empfangen wird, gemessen in Watt pro Quadratmeter.',
						unitOnly: 'W/m²'
					},
					utci_category: {
						label: 'UTCI-Kategorie',
						shortLabel: 'UTCI Kat.',
						description:
							'Die <strong>UTCI-Kategorie</strong> beschreibt die Klassifizierung des universellen thermischen Komfortindex in Bezug auf thermischen Komfort.',
						unitOnly: ''
					},
					utci_max: {
						label: 'Maximaler Universeller Thermischer Komfortindex (UTCI) (°C)',
						shortLabel: 'Max UTCI (°C)',
						description:
							'Der <strong>Maximale Universelle Thermische Komfortindex (UTCI)</strong> beschreibt die höchste gemessene UTCI in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					utci_min: {
						label: 'Minimaler Universeller Thermischer Komfortindex (UTCI) (°C)',
						shortLabel: 'Min UTCI (°C)',
						description:
							'Der <strong>Minimale Universelle Thermische Komfortindex (UTCI)</strong> beschreibt die niedrigste gemessene UTCI in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					utci: {
						label: 'Universeller Thermischer Komfortindex (UTCI) (°C)',
						shortLabel: 'UTCI (°C)',
						description:
							'Der <strong>Universelle Thermische Komfortindex (UTCI)</strong> beschreibt einen Index, der die thermischen Bedingungen für eine Standardperson in einer standardisierten Umgebung darstellt.',
						unitOnly: '°C'
					},
					vapor_pressure_max: {
						label: 'Maximaler Dampfdruck (hPa)',
						shortLabel: 'Max DP (hPa)',
						description:
							'Der <strong>Maximale Dampfdruck</strong> beschreibt den höchsten Druck, den der Wasserdampf in der Luft ausübt, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					vapor_pressure_min: {
						label: 'Minimaler Dampfdruck (hPa)',
						shortLabel: 'Min DP (hPa)',
						description:
							'Der <strong>Minimale Dampfdruck</strong> beschreibt den niedrigsten Druck, den der Wasserdampf in der Luft ausübt, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					vapor_pressure: {
						label: 'Dampfdruck (hPa)',
						shortLabel: 'DP (hPa)',
						description:
							'Der <strong>Dampfdruck</strong> beschreibt den Druck, den der Wasserdampf in der Luft ausübt, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					wet_bulb_temperature_max: {
						label: 'Maximale Feuchtkugeltemperatur (°C)',
						shortLabel: 'Max FKT (°C)',
						description:
							'Die <strong>Maximale Feuchtkugeltemperatur</strong> beschreibt die höchste Temperatur, die ein Thermometer anzeigen würde, wenn es mit einem feuchten Tuch umwickelt und der Luft ausgesetzt ist.',
						unitOnly: '°C'
					},
					wet_bulb_temperature_min: {
						label: 'Minimale Feuchtkugeltemperatur (°C)',
						shortLabel: 'Min FKT (°C)',
						description:
							'Die <strong>Minimale Feuchtkugeltemperatur</strong> beschreibt die niedrigste Temperatur, die ein Thermometer anzeigen würde, wenn es mit einem feuchten Tuch umwickelt und der Luft ausgesetzt ist.',
						unitOnly: '°C'
					},
					wet_bulb_temperature: {
						label: 'Feuchtkugeltemperatur (°C)',
						shortLabel: 'FKT (°C)',
						description:
							'Die <strong>Feuchtkugeltemperatur</strong> beschreibt die Temperatur, die ein Thermometer anzeigen würde, wenn es mit einem feuchten Tuch umwickelt und der Luft ausgesetzt ist.',
						unitOnly: '°C'
					},
					wind_direction_max: {
						label: 'Maximale Windrichtung (°)',
						shortLabel: 'Max WR (°)',
						description:
							'Die <strong>Maximale Windrichtung</strong> beschreibt die höchste gemessene Richtung, aus der der Wind weht, gemessen in Grad.',
						unitOnly: '°'
					},
					wind_direction_min: {
						label: 'Minimale Windrichtung (°)',
						shortLabel: 'Min WR (°)',
						description:
							'Die <strong>Minimale Windrichtung</strong> beschreibt die niedrigste gemessene Richtung, aus der der Wind weht, gemessen in Grad.',
						unitOnly: '°'
					},
					wind_direction: {
						label: 'Windrichtung (°)',
						shortLabel: 'WR (°)',
						description:
							'Die <strong>Windrichtung</strong> beschreibt die Richtung, aus der der Wind weht, gemessen in Grad.',
						unitOnly: '°'
					},
					wind_speed_max: {
						label: 'Maximale Windgeschwindigkeit (m/s)',
						shortLabel: 'Max WG (m/s)',
						description:
							'Die <strong>Maximale Windgeschwindigkeit</strong> beschreibt die höchste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					wind_speed_min: {
						label: 'Minimale Windgeschwindigkeit (m/s)',
						shortLabel: 'Min WG (m/s)',
						description:
							'Die <strong>Minimale Windgeschwindigkeit</strong> beschreibt die niedrigste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					wind_speed: {
						label: 'Windgeschwindigkeit (m/s)',
						shortLabel: 'WG (m/s)',
						description:
							'Die <strong>Windgeschwindigkeit</strong> beschreibt die Geschwindigkeit, mit der sich die Luft bewegt, gemessen in Metern pro Sekunde.',
						unitOnly: 'm/s'
					}
				}
			},
			dateRangeSlider: {
				today: 'Heute',
				day: 'Tag',
				range: 'Zeitraum'
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
			},
			table: {
				headers: {
					stationType: 'Stationstyp',
					id: 'ID',
					geolocation: 'Geokoordinaten',
					district: 'Stadtbezirk',
					installation_at: 'Installation am',
					status: 'Status',
					details: 'Details'
				},
				cells: {
					stationTypes: {
						biomet: 'Wetterstation (inkl. Blackglobe Sensor)',
						temprh: 'Temperatur-und Feuchtigkeitssensor'
					},
					status: {
						active: 'Aktiv',
						inactive: 'Inaktiv'
					}
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
		relative_humidity: {
			title: 'Relative Luftfeuchtigkeit',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		},
		temp: {
			title: 'Lufttemperatur',
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
