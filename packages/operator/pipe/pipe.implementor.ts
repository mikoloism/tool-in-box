import type { Pipeable, Pipeline } from "./pipe.interface";

class Pipe<In, Out> implements Pipeable<In, Out> {
	public constructor(protected readonly pipeline: Pipeline<In, Out>) {}

	public to<T>(pipeline: Pipeline<Out, T>): Pipe<In, T> {
		return new Pipe<In, T>((input: In) => pipeline(this.compute(input)));
	}

	public build(): Pipeline<In, Out> {
		return this.pipeline;
	}

	public compute(input: In): Out {
		return this.pipeline(input);
	}
}

export { Pipe };
