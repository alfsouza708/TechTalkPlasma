import {
	add,
	sub,
	isDate,
	parseISO,
	formatDistance,
	differenceInHours,
	differenceInWeeks,
	differenceInSeconds,
	differenceInMinutes,
	differenceInDays
} from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import { useI18n } from 'vue-i18n';

// Interfaces

interface TimeOptions {
	years?: number;
	months?: number;
	weeks?: number;
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
}

interface CalculateDistanceOptions {
	calculateIn: string;
}

// Variables

const fnsLocales = {
	pt: ptBR,
	en: enUS
};

// Functions

/**
 * Validates if a given string is a valid ISO 8601 Timestamp
 * @param {string} date - string to validate
 * @return {boolean}
 */
export const validDate = (date: string): boolean => {
	const isoDate = parseISO(date);

	return isDate(isoDate);
};

/**
 * Sums years, months etc. from a base date
 * @param {string} date - Base date to alter, must be an valid ISO 8601 Timestamp dateString
 * @param {TimeOptions} timeToAdd - Number of elements to be added
 * @return {string} - ISO formatted dateString
 */
export const addTime = (date: string, timeToAdd: TimeOptions): string => {
	if (!validDate(date))
		throw new Error(`Invalid date passed to addTime function: ${date}`);

	const isoDate = parseISO(date);
	const addedDate = add(isoDate, timeToAdd);

	return addedDate.toISOString();
};

/**
 * Subtracts years, months etc. from a base date
 * @param {string} date - Base date to alter, must be an valid ISO 8601 Timestamp dateString
 * @param {TimeOptions} timeToAdd - Number of elements to be added
 * @return {string} - ISO formatted dateString
 */
export const subTime = (date: string, timeToSubstract: TimeOptions): string => {
	if (!validDate(date))
		throw new Error(`Invalid date passed to addTime function: ${date}`);

	const isoDate = parseISO(date);
	const subtractedDate = sub(isoDate, timeToSubstract);

	return subtractedDate.toISOString();
};

/**
 * Calculates an estimated difference between 2 dates
 * @param {string} endDate - latter date in range, must be an valid ISO 8601 Timestamp dateString
 * @param {string} startDate - earlier date in range, must be an valid ISO 8601 Timestamp dateString
 * @return {string} - Localized estimated difference between 2 dates
 */
export const timeBetween = (endDate: string, startDate: string): string => {
	if (!(validDate(endDate) && validDate(startDate)))
		throw new Error(
			`Invalid date passed to timeBetween function: endDate: ${endDate} | startDate: ${startDate}`
		);

	const {
		locale: { value: currentLocale }
	} = useI18n();
	const endIsoDate = parseISO(endDate);
	const startIsoDate = parseISO(startDate);

	const timeDiff = formatDistance(startIsoDate, endIsoDate, {
		locale: fnsLocales[currentLocale]
	});

	return timeDiff;
};

/**
 * Calculates time distance between 2 dates
 * @param {string} endDate - latter date in range, must be an valid ISO 8601 Timestamp dateString
 * @param {string} startDate - earlier date in range, must be an valid ISO 8601 Timestamp dateString
 * @param {CalculateDistanceOptions} options - Chooses whether to calculate difference in seconds/minutes/hours/days/weeks
 * @return {number} - difference of {{calculateIn}} between 2 dates
 */
export const calculateDistance = (
	endDate: string,
	startDate: string,
	options?: CalculateDistanceOptions
): number => {
	if (!(validDate(endDate) && validDate(startDate)))
		throw new Error(
			`Invalid date passed to calculateDistance function: endDate: ${endDate} | startDate: ${startDate}`
		);

	const { calculateIn } = options;
	const diffMethods = {
		seconds: differenceInSeconds,
		minutes: differenceInMinutes,
		hours: differenceInHours,
		days: differenceInDays,
		weeks: differenceInWeeks
	};
	const endIsoDate = parseISO(endDate);
	const startIsoDate = parseISO(startDate);

	if (!diffMethods[calculateIn])
		throw new Error(
			`Invalid CalculateIn option at calculateDistance function: ${options.calculateIn}`
		);

	const timeDiff = diffMethods[calculateIn](endIsoDate, startIsoDate);

	return timeDiff;
};
