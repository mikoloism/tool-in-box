function assign<T extends {}>(...sources: any[]): T {
	return Object.assign({}, ...sources) as T;
}

function sureAssign<T>(value: T | undefined, errorMessage?: string): T | never {
	if (typeof value === 'undefined') {
		throw new ReferenceError(errorMessage);
	}

	return value;
}

export { assign, sureAssign };
