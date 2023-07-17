import { create } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";
import { assertPersistOptions } from "../helper/persist.helper";
import type { Disptacher, OmitDispatch, Setter } from "../store.interface";
import { byDispatcher } from "./manual.creator.ts";

function createPureStore<T extends Disptacher<T>>(
	initialState: OmitDispatch<T>,
	option?: PersistOptions<T>
) {
	try {
		assertPersistOptions(option);
		return create(
			persist<T>(function initializer(set: Setter<T>) {
				return byDispatcher<T>(initialState, { set });
			}, option!)
		);
	} catch (error: unknown) {
		return create<T>(function initializer(set: Setter<T>) {
			return byDispatcher<T>(initialState, { set });
		});
	}
}

export { createPureStore };
