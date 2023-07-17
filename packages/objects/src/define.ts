function define<T extends {}, R extends {} = T>(
	source: T,
	...sources: any[]
): R {
	return Object.assign(source, ...sources) as R;
}

export { define };
