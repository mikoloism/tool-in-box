import type { PersistOptions } from "zustand/middleware";

type UsedPersistOptions<T> = PersistOptions<T> & { __brand: "persist" };

function assertPersistOptions<T>(
	options: PersistOptions<T> | undefined
): asserts options is UsedPersistOptions<T> {
	if (typeof options === "undefined" || options == undefined || options == null) {
		throw "moved to persist mode of `store.creator`";
	}
}

export { assertPersistOptions };
