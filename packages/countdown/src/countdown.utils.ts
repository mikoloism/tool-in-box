export class storage {
	public static canUse(): boolean {
		return typeof localStorage !== "undefined";
	}

	public static hasKey(key: string): boolean {
		return storage.canUse() && localStorage.getItem(key) !== null;
	}

	public static getJson<T>(key: string): T | null {
		if (storage.canUse()) {
			const raw = localStorage.getItem(key);
			if (raw !== null) {
				return JSON.parse(raw);
			}
		}
		return null;
	}

	public static setJson<T>(key: string, json: T): void {
		if (storage.canUse()) {
			const raw = JSON.stringify(json);
			localStorage.setItem(key, raw);
		}
	}

	public static removeKey(key: string): void {
		if (storage.canUse()) {
			localStorage.removeItem(key);
		}
	}
}

export class interval {
	private static id: any | null = null;

	public static isRunning(): boolean {
		return interval.id != null;
	}

	public static execute(callback: Function, duration: number = 1000): void {
		interval.id = setInterval(callback, duration);
	}
	public static clear(): void {
		clearInterval(interval.id);
		interval.id = null;
	}
}

export function assign<T extends any = any>(...sources: any[]): T {
	return Object.assign({}, ...sources);
}
