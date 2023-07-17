import type { ComponentType } from "react";

export type PropsWithStore<P, S, K extends string = "store"> = P & Record<K, S>;
export type PropsWithStores<P, S> = P & { store: Record<string, S> };

export type ReactComponent<P, S, K extends string> =
	| ((props: PropsWithStore<P, S, K>) => JSX.Element)
	| ComponentType<PropsWithStore<P, S, K>>;
