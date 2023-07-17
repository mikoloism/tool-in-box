import { assign } from "@wonize/common/objects";
import type { StoreApi, UseBoundStore } from "zustand";
import { PropsWithStore, ReactComponent } from "./wrapper.interface";

function withStore<P extends {} = {}, S = {}, K extends string = "store">(
	useStore: UseBoundStore<StoreApi<S>>,
	Component: ReactComponent<P, S, K>,
	propsName: string = "store"
): (props: PropsWithStore<P, S, typeof propsName>) => JSX.Element {
	return function ZustandComponent(props: P) {
		const store = useStore();
		const propsWithStore = assign(props, {
			[propsName]: store,
		}) as PropsWithStore<P, S, typeof propsName>;
		return <Component {...propsWithStore} />;
	};
}

export { withStore };
