export async function countIn<T extends number | string | boolean | undefined | null>(
	values: Array<T>,
	regex: RegExp
): Promise<number> {
	let counter = 0;
	async function findAndCount() {
		values.map(function mapToFind(value: T) {
			if (regex.test(String(value))) {
				counter++;
			}
		});
	}
	await findAndCount();
	return counter;
}
