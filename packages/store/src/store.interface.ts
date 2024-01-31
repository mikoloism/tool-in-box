export type Setter<T extends {}> = (
	partial: T | Partial<T> | ((state: T) => T | Partial<T>),
	replace?: boolean | undefined
) => void;

export type Getter<T extends {}> = () => T;

export type OmitDispatch<T> = Omit<T, "dispatch">;

export interface Disptacher<T extends OmitDispatch<{ dispatch: any }>> {
	dispatch<K extends keyof OmitDispatch<T> = keyof OmitDispatch<T>>(
		action: Action<T, K>
	): void;
}

export type Action<
	T extends OmitDispatch<{ dispatch: any }>,
	K extends keyof OmitDispatch<T> = keyof OmitDispatch<T>
> = { key: K; payload: T[K] };

export type WithDispatch<T extends OmitDispatch<{ dispatch: any }>> = T & Disptacher<T>;

export type Initializer<T extends {}> = (set: Setter<T>, get: Getter<T>) => T;

export type PureMethodKeys<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type PurePropertyKeys<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type PureStore<T> = Omit<T, PureMethodKeys<T>>;
