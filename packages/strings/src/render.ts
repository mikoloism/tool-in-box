function render<T extends {}>(text: string, dataObject: T): string {
	return Object.keys(dataObject).reduce((result: string, key: string) => {
		const value = dataObject[key as keyof T];
		const regex = new RegExp(`\{${key}\}`, 'g');
		return result.replace(regex, String(value));
	}, text);
}

const STRING_PLACEHOLDER_REGEX: Readonly<RegExp> = /\{\s*([^{}\s]*)\s*\}/g;
function render2<T extends {}>(text: string, dataObject: T): string {
	return text.replace(
		STRING_PLACEHOLDER_REGEX,
		function replace(substring: string, key: string) {
			const value = dataObject[key.trim() as keyof T];
			return value !== undefined ? String(value) : substring;
		},
	);
}

export { render, render2 };
