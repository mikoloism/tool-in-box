import type { Operable, Operator } from "../base";

export interface Pipeable<In, Out> extends Operable<In, Out> {
	to<T>(pipeline: Pipeline<Out, T>): Pipeable<In, T>;
}

export type Pipeline<In, Out> = Operator<In, Out>;
