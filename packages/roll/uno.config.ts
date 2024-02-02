import presetUno from "@unocss/preset-uno";
import transformerCompileClass from "@unocss/transformer-compile-class";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { defineConfig } from "unocss";

export default defineConfig({
	presets: [presetUno()],
	transformers: [transformerCompileClass(), transformerVariantGroup()],
});
