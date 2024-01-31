import { Base } from "../base";

export interface Queueable<T> extends Base {
	enqueue(element: T): void;
	dequeue(): T;
	peek(): T;
}
