import { Compose } from "./compose.implementor";
import type { Composable, Compositor } from "./compose.interface";

function compose<In, Out>(compositor: Compositor<In, Out>): Composable<In, Out> {
	return new Compose<In, Out>(compositor);
}

export { compose };
