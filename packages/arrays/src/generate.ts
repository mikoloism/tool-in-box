function generate<T extends any = string>(
	length: number,
	value: T | ((index: number) => T),
): Array<T> {
	return Array.from({ length }, function generator(_: any, index: number) {
		return (typeof value === 'object' &&
			value !== null &&
			value instanceof Function) ||
			typeof value === 'function'
			? (value as any)(index)
			: typeof value === 'string'
			? value.replace(/\$\$/, (index + 1).toString())
			: value;
	});
}

export { generate };
