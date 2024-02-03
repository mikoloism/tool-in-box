type FnOut<In extends {}> =
	| React.ReactElement
	| JSX.Element
	| React.ComponentType<In>
	| Iterable<React.ReactElement>;

type Fn<In extends {}, Out = FnOut<In>> = (
	Component: React.ComponentType<In>
) => (props: In) => Out;

interface Rollable<In, Out> {
	roll<T extends {}>(rolled: Fn<In & T, Out>): Rollable<In & T, Out>;
	around<T>(Component: React.ComponentType<In & T>): React.ComponentType<In & T & Out>;
}

export class Roller<In extends {}, Out> implements Rollable<In, Out> {
	private rolled: Fn<In, Out>;

	constructor(rolled?: Fn<In, Out>) {
		if (typeof rolled === "undefined") {
			this.rolled = function rolled_hoc(Component: React.FunctionComponent<In>) {
				return Component;
			} as Fn<In, Out>;
		} else {
			this.rolled = rolled;
		}
	}

	roll<T extends {} = In>(rolled: Fn<In & T, Out>): Rollable<In & T, Out> {
		const newRolled = (Component: React.ComponentType<In & T>) => {
			const rolledHoc = rolled(Component);
			return this.rolled(rolledHoc as any);
		};

		return new Roller<In & T, Out>(newRolled as Fn<In & T, Out>);
	}

	around<T>(Component: React.ComponentType<In & T>): React.ComponentType<In & T & Out> {
		return this.rolled(Component as React.ComponentType<In>) as any;
	}
}
