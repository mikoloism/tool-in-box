function task<T>(initial: T | undefined = undefined): Promise<unknown> {
	return Promise.resolve(initial);
}

export { task };
