type Fn<In extends {}, Out> = (props: In) => Out;

interface Rollable<In, Out> {
	roll<T extends {}>(rolled: Fn<In & T, Out>): Rollable<In & T, Out>;
	around<T>(Component: React.ComponentType<In & T>): React.ComponentType<In & T & Out>;
}

export class Roller<In extends {}, Out> implements Rollable<In, Out> {
	private rolled: Fn<In, Out>;

	constructor(rolled?: Fn<In, Out>) {
		if (typeof rolled === "undefined") {
			this.rolled = ((Component: In) => Component) as unknown as Fn<In, Out>;
		} else {
			this.rolled = rolled;
		}
	}

	roll<T extends {} = In>(rolled: Fn<In & T, Out>): Rollable<In & T, Out> {
		const newRolled = (props: In & T) => this.rolled(rolled(props) as In & T);

		return new Roller<In & T, Out>(newRolled);
	}

	around<T>(Component: React.ComponentType<In & T>): React.ComponentType<In & T & Out> {
		return this.rolled(Component as any) as any;
	}
}
