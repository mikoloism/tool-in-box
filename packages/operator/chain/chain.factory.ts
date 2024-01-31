import { Chain } from "./chain.implementor";
import type { Chainable, Operator } from "./chain.interface";

function chain<In, Out>(operator: Operator<undefined, Out>): Chainable<In, Out> {
	return new Chain(operator);
}

export { chain };
