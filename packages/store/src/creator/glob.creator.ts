import { create } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";
import { assertPersistOptions } from "../helper/persist.helper";
import type { Disptacher, Getter, OmitDispatch, Setter } from "../store.interface";
import { byDispatcher } from "./manual.creator.ts";

function createGLobStore<T extends Disptacher<T>>(
	initializer: (set: Setter<T>, get: Getter<T>) => OmitDispatch<T>,
	option?: PersistOptions<T>
) {
	try {
		assertPersistOptions(option);
		return create(
			persist<T>(function prepare(set: Setter<T>, get) {
				return byDispatcher<T>(initializer(set, get), { set });
			}, option!)
		);
	} catch (error: unknown) {
		return create<T>(function prepare(set: Setter<T>, get) {
			return byDispatcher<T>(initializer(set, get), { set });
		});
	}
}

export { createGLobStore };
