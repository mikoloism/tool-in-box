import { define } from "@wonize/objects";
import type { Action, OmitDispatch, Setter } from "../store.interface";

function byDispatcher<T extends { dispatch: any }>(
	state: OmitDispatch<T>,
	{ set }: { set: Setter<T> }
): T {
	return define<T>(state as T, {
		dispatch(action: Action<T>) {
			set(function setter() {
				return { [action.key]: action.payload } as T;
			});
		},
	});
}

export { byDispatcher, byDispatcher as withDispatcher };
