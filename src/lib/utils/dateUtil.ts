import { isSameDay } from 'date-fns';

export const today = () => new Date('2024-08-31T03:00:00.000Z');
export const isToday = (date: Date) => isSameDay(date, today());
