import { isSameDay } from 'date-fns';

export const today = () => new Date();
export const isToday = (date: Date) => isSameDay(date, today());
