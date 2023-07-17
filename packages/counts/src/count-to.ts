export async function countTo<
	T extends number | string | boolean | undefined | null,
	R extends {}
>(
	values: Array<T>,
	regex: RegExp,
	callback: (value: T, index: number) => R
): Promise<R[]> {
	const result: R[] = [];
	async function findAndCount() {
		values.map(function mapToFind(value: T, index: number) {
			if (regex.test(String(value))) {
				const data: R = callback(value, index);
				result.push(data);
			}
		});
	}
	await findAndCount();
	return result;
}
