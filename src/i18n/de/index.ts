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
		},
		unsupported: {
			unsupportedStation: 'Erhebt nicht diese Daten'
		}
	},
	generic: {
		expand: 'Mehr erfahren',
		collapse: 'Zusammenklappen',
		leftSidebar: {
			showAriaLabel: 'Linke Sidebar einblenden',
			hideAriaLabel: 'Linke Sidebar ausblenden'
		},
		hourInput: {
			inputAriaLabel: 'Stunde des Tages auswählen',
			buttonUpAriaLabel: 'Eine Stunde später auswahlen',
			buttonDownAriaLabel: 'Eine Stunde früher auswahlen'
		}
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
	pages: {
		heatStress: {
			title: 'Wie warm fühlt sich deine Stadt an?',
			intro: [
				'Hitzestress ist der Zustand von Unbehagen und körperlicher Belastung, der auftritt, wenn die thermische Umgebung die Fähigkeit einer Person übersteigt, Wärme abzuleiten. Das bedeutet, dass Temperatur, Luftfeuchtigkeit, Luftbewegung und Strahlungswärme auf einem Niveau liegen, das Unbehagen oder Gesundheitsrisiken verursachen kann. Hitzestress kann anhand verschiedener Indikatoren bewertet werden:'
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
			noDataAvailable: 'Keine Daten für die ausgewählte Konfiguration verfügbar',
			noStationsSelected:
				'Wählen Sie eine Messstation aus, um Daten für die ausgewählte Konfiguration zu erhalten.',
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
			singleUnsupportedStationShort:
				'Diese Station erhebt keine Daten für den Indikator <strong>{unit:string}</strong>.',
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
						label: 'Maximale absolute Luftfeuchtigkeit',
						description:
							'Die <strong>Maximale absolute Luftfeuchtigkeit</strong> beschreibt die höchste Menge an Wasserdampf in der Luft, gemessen in Gramm pro Kubikmeter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity_min: {
						label: 'Minimale absolute Luftfeuchtigkeit',
						description:
							'Die <strong>Minimale absolute Luftfeuchtigkeit</strong> beschreibt die niedrigste Menge an Wasserdampf in der Luft, gemessen in Gramm pro Kubikmeter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity: {
						label: 'Absolute Luftfeuchtigkeit',
						description:
							'Die <strong>Absolute Luftfeuchtigkeit</strong> beschreibt die Menge an Wasserdampf in der Luft, gemessen in Gramm pro Kubikmeter.',
						unitOnly: 'g/m³'
					},
					air_temperature_max: {
						label: 'Maximale Lufttemperatur',
						description:
							'Die <strong>Maximale Lufttemperatur</strong> beschreibt die höchste gemessene Temperatur der umgebenden Luft in Grad Celsius.',
						unitOnly: '°C'
					},
					air_temperature_min: {
						label: 'Minimale Lufttemperatur',
						description:
							'Die <strong>Minimale Lufttemperatur</strong> beschreibt die niedrigste gemessene Temperatur der umgebenden Luft in Grad Celsius.',
						unitOnly: '°C'
					},
					air_temperature: {
						label: 'Lufttemperatur',
						description:
							'Die <strong>Lufttemperatur</strong> beschreibt die gemessene Temperatur der umgebenden Luft in Grad Celsius.',
						unitOnly: '°C'
					},
					atmospheric_pressure_max: {
						label: 'Maximaler Luftdruck',
						description:
							'Der <strong>Maximale Luftdruck</strong> beschreibt den höchsten Druck, der durch das Gewicht der Atmosphäre ausgeübt wird, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_min: {
						label: 'Minimaler Luftdruck',
						description:
							'Der <strong>Minimale Luftdruck</strong> beschreibt den niedrigsten Druck, der durch das Gewicht der Atmosphäre ausgeübt wird, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_max: {
						label: 'Maximaler reduzierter Luftdruck',
						description:
							'Der <strong>Maximale reduzierte Luftdruck</strong> beschreibt den höchsten auf Meereshöhe reduzierte Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_min: {
						label: 'Minimaler reduzierter Luftdruck',
						description:
							'Der <strong>Minimale reduzierte Luftdruck</strong> beschreibt den niedrigsten auf Meereshöhe reduzierte Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced: {
						label: 'Reduzierter Luftdruck',
						description:
							'Der <strong>Reduzierte Luftdruck</strong> beschreibt den auf Meereshöhe reduzierten Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure: {
						label: 'Luftdruck',
						description:
							'Der <strong>Luftdruck</strong> beschreibt den durch das Gewicht der Atmosphäre ausgeübten Druck, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					dew_point_max: {
						label: 'Maximaler Taupunkt',
						description:
							'Der <strong>Maximale Taupunkt</strong> beschreibt die höchste Temperatur, bei der die Luft mit Wasserdampf gesättigt ist, gemessen in Grad Celsius.',
						unitOnly: '°C'
					},
					dew_point_min: {
						label: 'Minimaler Taupunkt',
						description:
							'Der <strong>Minimale Taupunkt</strong> beschreibt die niedrigste Temperatur, bei der die Luft mit Wasserdampf gesättigt ist, gemessen in Grad Celsius.',
						unitOnly: '°C'
					},
					dew_point: {
						label: 'Taupunkt',
						description:
							'Der <strong>Taupunkt</strong> beschreibt die Temperatur, bei der die Luft mit Wasserdampf gesättigt ist, gemessen in Grad Celsius.',
						unitOnly: '°C'
					},
					heat_index_max: {
						label: 'Maximaler Hitzeindex',
						description:
							'Der <strong>Maximale Hitzeindex</strong> beschreibt die höchste gefühlte Temperatur, basierend auf Lufttemperatur und Luftfeuchtigkeit.',
						unitOnly: '°C'
					},
					heat_index_min: {
						label: 'Minimaler Hitzeindex',
						description:
							'Der <strong>Minimale Hitzeindex</strong> beschreibt die niedrigste gefühlte Temperatur, basierend auf Lufttemperatur und Luftfeuchtigkeit.',
						unitOnly: '°C'
					},
					heat_index: {
						label: 'Hitzeindex',
						description:
							'Der <strong>Hitzeindex</strong> beschreibt die gefühlte Temperatur, basierend auf Lufttemperatur und Luftfeuchtigkeit.',
						unitOnly: '°C'
					},
					lightning_average_distance_max: {
						label: 'Maximale durchschnittliche Blitzentfernung',
						description:
							'Die <strong>Maximale durchschnittliche Blitzentfernung</strong> beschreibt die größte mittlere Entfernung von Blitzeinschlägen zu einem Bezugspunkt, gemessen in Metern.',
						unitOnly: 'm'
					},
					lightning_average_distance_min: {
						label: 'Minimale durchschnittliche Blitzentfernung',
						description:
							'Die <strong>Minimale durchschnittliche Blitzentfernung</strong> beschreibt die kleinste mittlere Entfernung von Blitzeinschlägen zu einem Bezugspunkt, gemessen in Metern.',
						unitOnly: 'm'
					},
					lightning_average_distance: {
						label: 'Durchschnittliche Blitzentfernung',
						description:
							'Die <strong>Durchschnittliche Blitzentfernung</strong> beschreibt die mittlere Entfernung von Blitzeinschlägen zu einem Bezugspunkt, gemessen in Metern.',
						unitOnly: 'm'
					},
					lightning_strike_count_max: {
						label: 'Maximale Anzahl der Blitzeinschläge',
						description:
							'Die <strong>Maximale Anzahl der Blitzeinschläge</strong> beschreibt die höchste Häufigkeit von Blitzeinschlägen in einem bestimmten Gebiet und Zeitraum.',
						unitOnly: ''
					},
					lightning_strike_count_min: {
						label: 'Minimale Anzahl der Blitzeinschläge',
						description:
							'Die <strong>Minimale Anzahl der Blitzeinschläge</strong> beschreibt die niedrigste Häufigkeit von Blitzeinschlägen in einem bestimmten Gebiet und Zeitraum.',
						unitOnly: ''
					},
					lightning_strike_count: {
						label: 'Anzahl der Blitzeinschläge',
						description:
							'Die <strong>Anzahl der Blitzeinschläge</strong> beschreibt die Häufigkeit von Blitzeinschlägen in einem bestimmten Gebiet und Zeitraum.',
						unitOnly: ''
					},
					maximum_wind_speed_max: {
						label: 'Maximale Windgeschwindigkeit',
						description:
							'Die <strong>Maximale Windgeschwindigkeit</strong> beschreibt die höchste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed_min: {
						label: 'Minimale Windgeschwindigkeit',
						description:
							'Die <strong>Minimale Windgeschwindigkeit</strong> beschreibt die niedrigste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed: {
						label: 'Maximale Windgeschwindigkeit',
						description:
							'Die <strong>Maximale Windgeschwindigkeit</strong> beschreibt die höchste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					mrt_max: {
						label: 'Maximale Mittlere Strahlungstemperatur',
						description:
							'Die <strong>Maximale Mittlere Strahlungstemperatur</strong> beschreibt die höchste durchschnittliche Temperatur der umgebenden Oberflächen, die Wärmestrahlung abgeben.',
						unitOnly: '°C'
					},
					mrt_min: {
						label: 'Minimale Mittlere Strahlungstemperatur',
						description:
							'Die <strong>Minimale mittlere Strahlungstemperatur</strong> beschreibt die niedrigste durchschnittliche Temperatur der umgebenden Oberflächen, die Wärmestrahlung abgeben.',
						unitOnly: '°C'
					},
					mrt: {
						label: 'Mittlere Strahlungstemperatur',
						description:
							'Die <strong>Mittlere Strahlungstemperatur</strong> beschreibt die durchschnittliche Temperatur der umgebenden Oberflächen, die Wärmestrahlung abgeben.',
						unitOnly: '°C'
					},
					pet_category: {
						label: 'PET-Kategorie',
						description:
							'Die <strong>PET-Kategorie</strong> beschreibt die Klassifizierung der physiologisch äquivalenten Temperatur in Bezug auf thermischen Komfort.',
						unitOnly: ''
					},
					pet_max: {
						label: 'Maximale Physiologisch äquivalente Temperatur (PET)',
						description:
							'Die <strong>Maximale Physiologisch äquivalente Temperatur (PET)</strong> beschreibt die höchste gemessene PET in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					pet_min: {
						label: 'Minimale Physiologisch äquivalente Temperatur (PET)',
						description:
							'Die <strong>Minimale Physiologisch äquivalente Temperatur (PET)</strong> beschreibt die niedrigste gemessene PET in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					pet: {
						label: 'Physiologisch äquivalente Temperatur (PET)',
						description:
							'Die <strong>Physiologisch äquivalente Temperatur (PET)</strong> beschreibt ein Maß für die thermische Belastung, das die physiologische Reaktion des menschlichen Körpers auf die Umgebungsbedingungen berücksichtigt.',
						unitOnly: '°C'
					},
					precipitation_sum_max: {
						label: 'Maximale Niederschlagsmenge',
						description:
							'Die <strong>Maximale Niederschlagsmenge</strong> beschreibt die höchste Menge an Wasser, die als Regen, Schnee oder in anderer Form vom Himmel fällt, gemessen in Millimetern.',
						unitOnly: 'mm'
					},
					precipitation_sum_min: {
						label: 'Minimale Niederschlagsmenge',
						description:
							'Die <strong>Minimale Niederschlagsmenge</strong> beschreibt die niedrigste Menge an Wasser, die als Regen, Schnee oder in anderer Form vom Himmel fällt, gemessen in Millimetern.',
						unitOnly: 'mm'
					},
					precipitation_sum: {
						label: 'Niederschlag',
						description:
							'Der <strong>Niederschlag</strong> beschreibt die Menge an Wasser, die als Regen, Schnee oder in anderer Form vom Himmel fällt, gemessen in Millimetern.',
						unitOnly: 'mm'
					},
					relative_humidity_max: {
						label: 'Maximale relative Luftfeuchtigkeit',
						description:
							'Die <strong>Maximale relative Luftfeuchtigkeit</strong> beschreibt den höchsten Anteil des Wasserdampfs in der Luft im Verhältnis zur maximalen Menge, die die Luft bei dieser Temperatur aufnehmen könnte.',
						unitOnly: '%'
					},
					relative_humidity_min: {
						label: 'Minimale relative Luftfeuchtigkeit',
						description:
							'Die <strong>Minimale relative Luftfeuchtigkeit</strong> beschreibt den niedrigsten Anteil des Wasserdampfs in der Luft im Verhältnis zur maximalen Menge, die die Luft bei dieser Temperatur aufnehmen könnte.',
						unitOnly: '%'
					},
					relative_humidity: {
						label: 'Relative Luftfeuchtigkeit',
						description:
							'Die <strong>Relative Luftfeuchtigkeit</strong> beschreibt den Anteil des Wasserdampfs in der Luft im Verhältnis zur maximalen Menge, die die Luft bei dieser Temperatur aufnehmen könnte.',
						unitOnly: '%'
					},
					solar_radiation_max: {
						label: 'Maximale Solarstrahlung',
						description:
							'Die <strong>Maximale Solarstrahlung</strong> beschreibt die höchste Menge an Sonnenenergie, die pro Flächeneinheit empfangen wird, gemessen in Watt pro Quadratmeter.',
						unitOnly: 'W/m²'
					},
					solar_radiation_min: {
						label: 'Minimale Solarstrahlung',
						description:
							'Die <strong>Minimale Solarstrahlung</strong> beschreibt die niedrigste Menge an Sonnenenergie, die pro Flächeneinheit empfangen wird, gemessen in Watt pro Quadratmeter.',
						unitOnly: 'W/m²'
					},
					solar_radiation: {
						label: 'Solarstrahlung',
						description:
							'Die <strong>Solarstrahlung</strong> beschreibt die Menge an Sonnenenergie, die pro Flächeneinheit empfangen wird, gemessen in Watt pro Quadratmeter.',
						unitOnly: 'W/m²'
					},
					utci_category: {
						label: 'UTCI-Kategorie',
						description:
							'Die <strong>UTCI-Kategorie</strong> beschreibt die Klassifizierung des universellen thermischen Komfortindex in Bezug auf thermischen Komfort.',
						unitOnly: ''
					},
					utci_max: {
						label: 'Maximaler Universeller Thermischer Komfortindex (UTCI)',
						description:
							'Der <strong>Maximale Universelle Thermische Komfortindex (UTCI)</strong> beschreibt die höchste gemessene UTCI in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					utci_min: {
						label: 'Minimaler Universeller Thermischer Komfortindex (UTCI)',
						description:
							'Der <strong>Minimale Universelle Thermische Komfortindex (UTCI)</strong> beschreibt die niedrigste gemessene UTCI in einem bestimmten Zeitraum.',
						unitOnly: '°C'
					},
					utci: {
						label: 'Universeller Thermischer Komfortindex (UTCI)',
						description:
							'Der <strong>Universelle Thermische Komfortindex (UTCI)</strong> beschreibt einen Index, der die thermischen Bedingungen für eine Standardperson in einer standardisierten Umgebung darstellt.',
						unitOnly: '°C'
					},
					vapor_pressure_max: {
						label: 'Maximaler Dampfdruck',
						description:
							'Der <strong>Maximale Dampfdruck</strong> beschreibt den höchsten Druck, den der Wasserdampf in der Luft ausübt, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					vapor_pressure_min: {
						label: 'Minimaler Dampfdruck',
						description:
							'Der <strong>Minimale Dampfdruck</strong> beschreibt den niedrigsten Druck, den der Wasserdampf in der Luft ausübt, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					vapor_pressure: {
						label: 'Dampfdruck',
						description:
							'Der <strong>Dampfdruck</strong> beschreibt den Druck, den der Wasserdampf in der Luft ausübt, gemessen in Hektopascal.',
						unitOnly: 'hPa'
					},
					wet_bulb_temperature_max: {
						label: 'Maximale Feuchtkugeltemperatur',
						description:
							'Die <strong>Maximale Feuchtkugeltemperatur</strong> beschreibt die höchste Temperatur, die ein Thermometer anzeigen würde, wenn es mit einem feuchten Tuch umwickelt und der Luft ausgesetzt ist.',
						unitOnly: '°C'
					},
					wet_bulb_temperature_min: {
						label: 'Minimale Feuchtkugeltemperatur',
						description:
							'Die <strong>Minimale Feuchtkugeltemperatur</strong> beschreibt die niedrigste Temperatur, die ein Thermometer anzeigen würde, wenn es mit einem feuchten Tuch umwickelt und der Luft ausgesetzt ist.',
						unitOnly: '°C'
					},
					wet_bulb_temperature: {
						label: 'Feuchtkugeltemperatur',
						description:
							'Die <strong>Feuchtkugeltemperatur</strong> beschreibt die Temperatur, die ein Thermometer anzeigen würde, wenn es mit einem feuchten Tuch umwickelt und der Luft ausgesetzt ist.',
						unitOnly: '°C'
					},
					wind_direction_max: {
						label: 'Maximale Windrichtung',
						description:
							'Die <strong>Maximale Windrichtung</strong> beschreibt die höchste gemessene Richtung, aus der der Wind weht, gemessen in Grad.',
						unitOnly: '°'
					},
					wind_direction_min: {
						label: 'Minimale Windrichtung',
						description:
							'Die <strong>Minimale Windrichtung</strong> beschreibt die niedrigste gemessene Richtung, aus der der Wind weht, gemessen in Grad.',
						unitOnly: '°'
					},
					wind_direction: {
						label: 'Windrichtung',
						description:
							'Die <strong>Windrichtung</strong> beschreibt die Richtung, aus der der Wind weht, gemessen in Grad.',
						unitOnly: '°'
					},
					wind_speed_max: {
						label: 'Maximale Windgeschwindigkeit',
						description:
							'Die <strong>Maximale Windgeschwindigkeit</strong> beschreibt die höchste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					wind_speed_min: {
						label: 'Minimale Windgeschwindigkeit',
						description:
							'Die <strong>Minimale Windgeschwindigkeit</strong> beschreibt die niedrigste gemessene Windgeschwindigkeit in einem bestimmten Zeitraum.',
						unitOnly: 'm/s'
					},
					wind_speed: {
						label: 'Windgeschwindigkeit',
						description:
							'Die <strong>Windgeschwindigkeit</strong> beschreibt die Geschwindigkeit, mit der sich die Luft bewegt, gemessen in Metern pro Sekunde.',
						unitOnly: 'm/s'
					}
				}
			},
			dateRangeSlider: {
				today: 'Heute',
				day: 'Pro Tag',
				hour: 'Pro Stunde',
				range: 'Zeitspanne'
			}
		},
		stations: {
			title: 'Wie messen wir thermischen Komfort?',
			titleTable: 'Alle Messstationen im Überblick',
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
					name: 'Stationsname',
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
		air_temperature: {
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
		},
		layersSelection: {
			ariaLabel: 'Auswahl der Kartenebene',
			districts: 'Bezirksgrenzen',
			lors: 'Vulnerable Gebiete',
			satellite: 'Satellitenbilder'
		},
		choroplethLegend: {
			showHealthRisks: 'Gesundheitsrisiken einblenden',
			hideHealthRisks: 'Gesundheitsrisiken ausblenden',
			title: 'Gesundheitsrisiken',
			noValueAvailable: 'Keine Daten verfügbar',
			heatStressCategories: {
				'extreme cold stress': 'Extremer Kältestress',
				'very strong cold stress': 'Sehr starker Kältestress',
				'strong cold stress': 'Starker Kältestress',
				'moderate cold stress': 'Mäßiger Kältestress',
				'slight cold stress': 'Leichter Kältestress',
				'no thermal stress': 'Kein thermischer Stress',
				'slight heat stress': 'Leichter Wärmestress',
				'moderate heat stress': 'Mäßiger Wärmestress',
				'strong heat stress': 'Starker Wärmestress',
				'very strong heat stress': 'Sehr starker Wärmestress',
				'extreme heat stress': 'Extremer Wärmestress'
			},
			healthRisks: {
				veryCold: {
					title: 'Sehr kalt',
					description: 'Risiko von Unterkühlung und Erfrierungen bei längerer Exposition',
					ranges: {
						pet: 'unter 8 °C',
						utci: 'unter -27 °C'
					}
				},
				cold: {
					title: 'Kalt',
					description: 'Risiko von erniedrigter Körpertemperatur und Unbehagen',
					ranges: {
						pet: '8 bis 18 °C',
						utci: '-27 bis 9 °C'
					}
				},
				slightlyWarm: {
					title: 'Leicht warm',
					description: 'Risiko von Unbehagen und erhöhtem Schweißausstoß',
					ranges: {
						pet: '23 bis 29 °C',
						utci: '26 bis 32 °C'
					}
				},
				warm: {
					title: 'Warm',
					description:
						'Risiko von Hitzekrämpfen, Hitzeerschöpfung und anderen hitzebedingten Erkrankungen, besonders bei körperlicher Aktivität',
					ranges: {
						pet: '29 bis 35 °C',
						utci: '32 bis 38 °C'
					}
				},
				veryWarm: {
					title: 'Sehr warm',
					description: 'Risiko von Hitzschlag und Organversagen',
					ranges: {
						pet: 'über 35 °C',
						utci: 'über 38 °C'
					}
				}
			}
		}
	}
} satisfies BaseTranslation;

export default de;
