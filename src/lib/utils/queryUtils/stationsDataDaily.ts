import { createQuery } from "@tanstack/svelte-query";
import { addDays, format, setHours } from "date-fns";
import { api } from "../api";
import type { WeatherMeasurementKeyNoMinMax } from "../schemas";
import { type StationsGeoJSONType } from "./../../stores/mapData";

export type DataRecord = {
	id: string;
	label: string;
	value: number | undefined;
	supported: boolean;
};

export function useDailyStationsData({
	ids: unsortedIds = [],
	date,
	unit,
	stations,
	scale = "daily",
	hour: rawHour = 12,
}: {
	ids?: string[];
	date: Date | undefined;
	unit: string;
	stations: StationsGeoJSONType;
	scale?: "daily" | "hourly";
	hour?: number;
}) {
	const ids = unsortedIds.filter(Boolean).toSorted();
	const dateKey = date && format(date, "yyyy-MM-dd");
	const hour = scale === "hourly" ? rawHour : undefined;
	return createQuery({
		queryKey: ["stationsData-daily", ids.join("-"), dateKey, unit, scale, hour],
		queryFn: async () => {
			if (ids.length === 0 || !date || !unit) return [];
			const promises = ids.map(async (id) => {
				if (ids.length === 0 || !date || !unit) return;
				const isHour = scale === "hourly" && typeof hour === "number";
				const startDate = isHour ? setHours(date, hour) : addDays(date, -1);
				const endDate = isHour ? setHours(date, hour) : date || "";
				const itemResults = await api().getStationData({
					id,
					start_date: startDate,
					end_date: endDate,
					param: unit as unknown as WeatherMeasurementKeyNoMinMax,
					scale,
				});
				const label =
					stations.features.find((f) => f.properties.id === id)?.properties
						.longName || id;
				if (itemResults === null) {
					return {
						id,
						label,
						value: undefined,
						supported: false,
					};
				}
				const i = itemResults[0];
				return {
					id,
					label,
					value: i
						? (i[unit as keyof typeof i] as unknown as number)
						: undefined,
					supported: true,
				};
			});

			const results = await Promise.all(promises);
			return results as DataRecord[];
		},
		enabled: Boolean(ids.length > 0 && date && unit),
	});
}
