export type Operator<In, Out> = (input: In) => Out;

export interface Operable<In, Out> {
	build(): Operator<In, Out>;
	compute(input: In): ReturnType<Operator<In, Out>>;
}

abstract class Operation<In, Out> implements Operable<In, Out> {
	protected operator: Operator<In, Out>;

	public constructor(operator: Operator<In, Out>) {
		this.operator = operator;
	}

	public build(): Operator<In, Out> {
		return this.operator;
	}

	public compute(input: In): Out {
		return this.operator(input);
	}
}

export { Operation };
