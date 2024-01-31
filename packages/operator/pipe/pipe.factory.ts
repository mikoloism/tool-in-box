import { Pipe } from "./pipe.implementor";
import type { Pipeable, Pipeline } from "./pipe.interface";

function pipe<In, Out>(pipeline: Pipeline<In, Out>): Pipeable<In, Out> {
	return new Pipe<In, Out>(pipeline);
}

export { pipe };
