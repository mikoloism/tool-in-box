import type { CountDownState } from "./countdown.interface";

// 5 MIN in SEC
export const COUNTDOWN_DEFAULT_DURATION: number = 300;

export const COUNTDOWN_DEFAULT_STATE: CountDownState = {
	count: COUNTDOWN_DEFAULT_DURATION,
	isCounted: false,
	hour: "00",
	minute: "00",
	second: "00",
};

export const COUNTDOWN_STORAGE_KEY: string = "x-countdown";
