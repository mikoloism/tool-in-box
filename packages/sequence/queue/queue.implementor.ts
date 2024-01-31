import type { Queueable } from "./queue.interface";

class Queue<T> implements Queueable<T> {
	protected queue: Record<number, T>;
	#tail: number = 0;
	#head: number = 0;

	public constructor(queue: Queue<T> | null = null) {
		this.queue = queue?.queue ?? {};
	}

	public enqueue(element: T): void {
		this.queue[this.#tail] = element;
		this.#tail++;
	}

	public dequeue(): T {
		const item = this.queue[this.#head];
		delete this.queue[this.#head];
		this.#head++;
		return item;
	}

	public peek(): T {
		return this.queue[this.#head];
	}

	public isEmpty(): boolean {
		return this.length === 0;
	}

	public get length(): Readonly<number> {
		return this.#tail - this.#head;
	}

	public merge(queue: Queue<T>): Queue<T> {
		const merged = new Queue<T>(queue);
		return merged;
	}
}

export { Queue };
