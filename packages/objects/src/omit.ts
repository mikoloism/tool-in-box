type OmitExtended<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

function omit<T, K extends keyof T = keyof T>(
	object: T,
	properties: K[],
): OmitExtended<T, K> {
	const result = { ...object } as any;
	for (const property of properties) {
		delete result[property];
	}
	return result;
}

export { omit };
