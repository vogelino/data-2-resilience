import { addHours, getHours, isAfter, isSameDay, setHours, startOfDay } from 'date-fns';

export const today = () => new Date();
export const isToday = (date: Date) => isSameDay(date, today());

export function limitDateBoundsToToday({
	date,
	refDate = today(),
	hour = getHours(date)
}: {
	date: Date;
	refDate?: Date;
	hour?: number;
}) {
	const currentHour = getHours(refDate);
	const dateWithHour = hour !== undefined ? addHours(startOfDay(date), hour) : date;
	const flooredCurrentDate = setHours(refDate, currentHour);
	const dateIsAfterRef = isAfter(dateWithHour, flooredCurrentDate);

	if (dateIsAfterRef) return flooredCurrentDate;

	return dateWithHour;
}
