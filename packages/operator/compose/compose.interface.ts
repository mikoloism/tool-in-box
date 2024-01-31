import { Operable, Operator } from "../base";

export interface Composable<In, Out> extends Operable<In, Out> {
	from<T>(compositor: Compositor<T, In>): Composable<T, Out>;
}

export type Compositor<In, Out> = Operator<In, Out>;
