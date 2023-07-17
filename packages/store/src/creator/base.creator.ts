import { create } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";
import { assertPersistOptions } from "../helper/persist.helper";
import type { Initializer } from "../store.interface";

function createStore<T extends {}>(
	initializer: Initializer<T>,
	option?: PersistOptions<T>
) {
	try {
		assertPersistOptions(option);
		return create(persist<T>(initializer, option!));
	} catch (error: unknown) {
		return create<T>(initializer);
	}
}

export { createStore };
