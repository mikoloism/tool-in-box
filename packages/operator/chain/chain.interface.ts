import type { Operator } from "../base";

export interface Chainable<In, Out> {
	chain<T>(operator: Operator<Out, T>): Chainable<In, T>;
	done(): Out;
}

export type { Operator };
