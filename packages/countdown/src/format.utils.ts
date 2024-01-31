import type { CountDownFormat } from './countdown.interface';

export function formatPadding(value: number): string {
	const str_value = value.toString();
	return value < 10 ? '0'.concat(str_value) : str_value;
}

export function formatDuration(duration: number): CountDownFormat {
	const minute = Math.floor(duration / 60);
	const hour = Math.floor(minute / 3600);
	const second = Math.floor(duration % 60);

	const str_hour = formatPadding(hour);
	const str_minute = formatPadding(minute);
	const str_second = formatPadding(second);

	return {
		hour: str_hour,
		minute: str_minute,
		second: str_second,
	};
}
