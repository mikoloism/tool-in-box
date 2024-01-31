# Pipeline/Pipe

## Usages

```typescript
import { Pipe } from "./mod.ts";
/* OR import { pipe } from "./mod.ts"; */

// define pipeline object
const pipeline = new Pipe(function toString(input: number): string {
	return input.toString();
}).to(function toStruct(input): { value: string } {
	return { value: input };
});

/* OR
const pipeline = pipe(function toString(input: number): string {
	return input.toString();
}).to(function toStruct(input): { value: string } {
	return { value: input };
});
*/

// pass initial input to pipeline to compute
pipeline.compute(12); //=> { value: "12" }

// build pipeline as portable function (reusable)
const numberToStruct = pipeline.build();
numberToStruct(12); //=> { value: "12" }
```
