function merge<
	O extends Record<string, any> = Record<string, any>,
	R = {
		[K in keyof O]: O[K];
	},
	K extends keyof O = keyof O,
>(keys: K[], ...sources: Array<Array<O[K]>>): R[] {
	const result: R[] = [] as R[];
	const baseSourceLength = sources[0].length;
	for (let sourceIndex = 0; sourceIndex < baseSourceLength; sourceIndex++) {
		const obj: O = {} as O;
		for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
			const key = keys[keyIndex];
			const sourceForKey = sources[keyIndex] as O[K];
			const sourceValue = sourceForKey[sourceIndex] as O[O[K]];
			obj[key as O[K]] = sourceValue;
		}
		result.push(obj as O[K]);
	}
	return result;
}

export { merge };
