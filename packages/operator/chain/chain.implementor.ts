import type { Chainable, Operator } from "./chain.interface";

class Chain<In, Out> implements Chainable<In, Out> {
	private result: Out;

	constructor(chainline: Operator<undefined, Out>) {
		this.result = chainline(undefined);
	}

	chain<T>(chainline: Operator<Out, T>): Chainable<In, T> {
		const value = chainline(this.result);
		return new Chain<In, T>(() => value);
	}

	done(): Out {
		return this.result;
	}
}

export { Chain };
