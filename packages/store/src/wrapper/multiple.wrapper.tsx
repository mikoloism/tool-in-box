import { assign, define } from "@wonize/common/objects";
import type { PropsWithStores } from "./wrapper.interface";

function withStores<P extends {} = {}, S extends {} = {}>(
	stores: S,
	Component: any
): (props: PropsWithStores<P, S>) => JSX.Element {
	return function WithStores(props: P) {
		const storeProps = {};

		Object.keys(stores).map((key) => {
			const useStore = stores[key as keyof typeof stores] as () => S;
			const store = useStore();
			define(storeProps, { [key]: store });
		});

		const propsWithStore = assign(props, { store: storeProps });

		return <Component {...propsWithStore} />;
	};
}

export { withStores };
