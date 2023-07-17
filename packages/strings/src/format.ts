const STRING_PLACEHOLDER_REGEX: Readonly<RegExp> = /\{(\d+)\}/g;

function format<D extends Array<unknown>>(text: string, ...data: D): string {
	return text.replace(
		STRING_PLACEHOLDER_REGEX,
		function replace(substring: string, index: number) {
			const value = data[index];
			return value !== undefined ? String(value) : substring;
		},
	);
}

export { format };
