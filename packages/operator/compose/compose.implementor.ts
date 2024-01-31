import { Composable, Compositor } from "./compose.interface";

class Compose<In, Out> implements Composable<In, Out> {
	public constructor(protected readonly compositor: Compositor<In, Out>) {}

	public from<T>(compositor: Compositor<T, In>): Compose<T, Out> {
		return new Compose((input: T) => this.compute(compositor(input)));
	}

	public build(): Compositor<In, Out> {
		return this.compositor;
	}

	public compute(input: In): Out {
		return this.compositor(input);
	}
}

export { Compose };
