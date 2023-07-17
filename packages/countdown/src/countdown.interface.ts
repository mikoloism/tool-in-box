export interface CountDownFormat {
	hour: string;
	minute: string;
	second: string;
}

export interface CountDownState extends CountDownFormat {
	isCounted: boolean;
	count: number;
}

export interface CountDownAction {
	start(): void;
	stop(): void;
	reset(): void;
}

export interface CountDownStore extends CountDownState, CountDownAction {}
