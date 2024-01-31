// @ts-ignore
import { map, random } from '@georgedoescode/generative-utils';
import type { Svg, G as SvgGroup } from '@svgdotjs/svg.js';

enum GridStyle {
	BULLET = 1,
	BOX = 2,
	BOX_BULLET = 3,
	OUTLINE_BULLET = 4,
	MIX_OUTLINE_BULLET = 5,
	MIX_COLOR_BULLET = 6,
	MIX_ALPHA_BULLET = 7,
	SQUARE = 8,
	MIX_OUTLINE_SQUARE = 9,
	MIX_COLOR_SQUARE = 10,
	DIAMOND = 11,
	MIX_OUTLINE_DIAMOND = 12,
	MIX_DIAMOND_SQUARE = 13,
	DIAGONAL_45 = 14,
	DIAGONAL_125 = 15,
	MIX_DIAGONAL = 16,
	MIX_DIAGONAL_BOX = 17,
	CROSS = 18,
	MIX_COLOR_CROSS = 19,
	ROTATE_CROSS = 20,
	MIX_COLOR_ROTATE_CROSS = 21,
	DOUBLE_BULLET = 22,
}

const DEFAULT_GENERATE_OPTIONS: GenerateOptions = {
	bgColor: 'none',
	fills: ['hsl(261, 60%, 38%)', 'hsl(316, 73%, 52%)'],
	size: 7,
	columns: 12,
	rows: 12,
	style: GridStyle.BULLET,
};

class GridGenerator implements GridGeneratorInterface {
	private width: number;
	private height: number;
	private svg: Svg;
	public shapeGroup!: SvgGroup;

	public constructor(svg: Svg, width?: number, height?: number) {
		this.svg = svg;
		this.width = width || window.innerWidth;
		this.height = height || window.innerHeight;
	}

	public generate(
		options: Partial<GenerateOptions> = DEFAULT_GENERATE_OPTIONS,
	) {
		options = Object.assign({}, DEFAULT_GENERATE_OPTIONS, options);

		const { bgColor, fills, size, columns, rows, style } =
			options as GenerateOptions;

		this.svg.clear();
		const strokeWidth = map(size, 1, 20, 0.5, 10);
		const objectSize = map(size, 1, 20, 1, 25);
		const objectSizeLarge = map(size, 1, 20, 5, 35);

		const colSize = this.width / columns;
		const rowSize = this.height / rows;

		this.shapeGroup = this.svg
			.group()
			.stroke({
				width: strokeWidth,
				color: fills[0],
			})
			.fill(bgColor);

		let iteration = 0;
		for (let y = 0; y <= this.height + 0.01; y += rowSize) {
			for (let x = 0; x <= this.width + 0.01; x += colSize) {
				switch (style) {
					case GridStyle.BULLET:
						this.shapeGroup
							.circle(objectSize)
							.cx(x)
							.cy(y)
							.fill(fills[0])
							.stroke('none');
						break;
					case GridStyle.BOX:
						this.shapeGroup.rect(colSize, rowSize).x(x).y(y);
						break;
					case GridStyle.BOX_BULLET:
						this.shapeGroup
							.rect(colSize, rowSize)
							.x(x)
							.y(y)
							.opacity(0.15);
						this.shapeGroup
							.circle(objectSizeLarge * 1.5)
							.cx(x)
							.cy(y)
							.fill(fills[0])
							.stroke('none');
						break;
					case GridStyle.OUTLINE_BULLET:
						this.shapeGroup
							.circle(objectSizeLarge)
							.cx(x)
							.cy(y)
							.fill('none');
						break;
					case GridStyle.MIX_OUTLINE_BULLET:
						if (
							random(0, 1) > 0.75 &&
							x !== 0 &&
							y !== 0 &&
							Math.round(x) !== this.width &&
							Math.round(y) !== this.height
						) {
							this.shapeGroup
								.circle(objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill('none');
						} else {
							this.shapeGroup
								.circle(objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none');
						}
						break;
					case GridStyle.MIX_COLOR_BULLET:
						if (iteration % 2) {
							this.shapeGroup
								.circle(objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[1])
								.stroke('none');
						} else {
							this.shapeGroup
								.circle(objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none');
						}
						// if (random(0, 1) > 0.75 && x !== 0 && y !== 0 && Math.round(x) !== width && Math.round(y) !== height){...}
						break;
					case GridStyle.MIX_ALPHA_BULLET:
						if (
							random(0, 1) > 0.75 &&
							x !== 0 &&
							y !== 0 &&
							Math.round(x) !== this.width &&
							Math.round(y) !== this.height
						) {
							this.shapeGroup
								.circle(objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none');
						} else {
							this.shapeGroup
								.circle(objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none')
								.opacity(0.35);
						}
						break;
					case GridStyle.SQUARE:
						this.shapeGroup
							.rect(objectSizeLarge, objectSizeLarge)
							.cx(x)
							.cy(y)
							.fill(fills[0])
							.stroke('none');
						break;
					case GridStyle.MIX_OUTLINE_SQUARE:
						if (
							random(0, 1) > 0.75 &&
							x !== 0 &&
							y !== 0 &&
							Math.round(x) !== this.width &&
							Math.round(y) !== this.height
						) {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y);
						} else {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none');
						}
						break;
					case GridStyle.MIX_COLOR_SQUARE:
						if (iteration % 2) {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[1])
								.stroke('none');
						} else {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none');
						}
						break;
					case GridStyle.DIAMOND:
						this.shapeGroup
							.rect(objectSizeLarge, objectSizeLarge)
							.cx(x)
							.cy(y)
							.fill(fills[0])
							.stroke('none')
							.attr('transform', `rotate(45, ${x}, ${y})`);
						break;
					case GridStyle.MIX_OUTLINE_DIAMOND:
						if (
							random(0, 1) > 0.75 &&
							x !== 0 &&
							y !== 0 &&
							Math.round(x) !== this.width &&
							Math.round(y) !== this.height
						) {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none')
								.attr('transform', `rotate(45, ${x}, ${y})`);
						} else {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none');
						}
						break;
					case GridStyle.MIX_DIAMOND_SQUARE:
						if (
							random(0, 1) > 0.75 &&
							x !== 0 &&
							y !== 0 &&
							Math.round(x) !== this.width &&
							Math.round(y) !== this.height
						) {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y)
								.fill(fills[0])
								.stroke('none')
								.attr('transform', `rotate(45, ${x}, ${y})`);
						} else {
							this.shapeGroup
								.rect(objectSizeLarge, objectSizeLarge)
								.cx(x)
								.cy(y)
								.attr('transform', `rotate(45, ${x}, ${y})`);
						}
						break;
					case GridStyle.DIAGONAL_45:
						this.shapeGroup.line(x, y, x + colSize, y + colSize);
						break;
					case GridStyle.DIAGONAL_125:
						this.shapeGroup.line(x + colSize, y, x, y + colSize);
						break;
					case GridStyle.MIX_DIAGONAL:
						this.shapeGroup.line(x, y, x + colSize, y + colSize);
						this.shapeGroup.line(x + colSize, y, x, y + colSize);
						break;
					case GridStyle.MIX_DIAGONAL_BOX:
						this.shapeGroup.line(x, y, x + colSize, y + colSize);
						this.shapeGroup.line(x + colSize, y, x, y + colSize);
						this.shapeGroup
							.rect(colSize, rowSize)
							.x(x)
							.y(y)
							.opacity(0.15);
						break;
					case GridStyle.CROSS:
						this.shapeGroup
							.rect(Math.min(colSize, rowSize) / 2, objectSize)
							.cx(x)
							.cy(y)
							.stroke('none')
							.fill(fills[0])
							.radius(objectSize / 2);
						this.shapeGroup
							.rect(objectSize, Math.min(colSize, rowSize) / 2)
							.cx(x)
							.cy(y)
							.stroke('none')
							.fill(fills[0])
							.radius(objectSize / 2);
						break;
					case GridStyle.MIX_COLOR_CROSS:
						if (iteration % 2) {
							this.shapeGroup
								.rect(
									Math.min(colSize, rowSize) / 2,
									objectSize,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[0])
								.radius(objectSize / 2);
							this.shapeGroup
								.rect(
									objectSize,
									Math.min(colSize, rowSize) / 2,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[0])
								.radius(objectSize / 2);
						} else {
							this.shapeGroup
								.rect(
									Math.min(colSize, rowSize) / 2,
									objectSize,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[1])
								.radius(objectSize / 2);
							this.shapeGroup
								.rect(
									objectSize,
									Math.min(colSize, rowSize) / 2,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[1])
								.radius(objectSize / 2);
						}
						break;
					case GridStyle.ROTATE_CROSS:
						this.shapeGroup
							.rect(Math.min(colSize, rowSize) / 2, objectSize)
							.cx(x)
							.cy(y)
							.stroke('none')
							.fill(fills[0])
							.radius(objectSize / 2)
							.attr('transform', `rotate(45, ${x}, ${y})`);
						this.shapeGroup
							.rect(objectSize, Math.min(colSize, rowSize) / 2)
							.cx(x)
							.cy(y)
							.stroke('none')
							.fill(fills[0])
							.radius(objectSize / 2)
							.attr('transform', `rotate(45, ${x}, ${y})`);
						break;
					case GridStyle.MIX_COLOR_ROTATE_CROSS:
						if (iteration % 2) {
							this.shapeGroup
								.rect(
									Math.min(colSize, rowSize) / 2,
									objectSize,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[0])
								.radius(objectSize / 2)
								.attr('transform', `rotate(45, ${x}, ${y})`);
							this.shapeGroup
								.rect(
									objectSize,
									Math.min(colSize, rowSize) / 2,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[0])
								.radius(objectSize / 2)
								.attr('transform', `rotate(45, ${x}, ${y})`);
						} else {
							this.shapeGroup
								.rect(
									Math.min(colSize, rowSize) / 2,
									objectSize,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[1])
								.radius(objectSize / 2)
								.attr('transform', `rotate(45, ${x}, ${y})`);
							this.shapeGroup
								.rect(
									objectSize,
									Math.min(colSize, rowSize) / 2,
								)
								.cx(x)
								.cy(y)
								.stroke('none')
								.fill(fills[1])
								.radius(objectSize / 2)
								.attr('transform', `rotate(45, ${x}, ${y})`);
						}
						break;
					case GridStyle.DOUBLE_BULLET:
						this.shapeGroup
							.circle(objectSize * 4)
							.cx(x)
							.cy(y)
							.opacity(0.25);
						this.shapeGroup
							.circle(objectSize)
							.cx(x)
							.cy(y)
							.fill(fills[0])
							.stroke('none');
						break;
				}
				iteration++;
			}
		}
	}

	public setOpacity(value: number) {
		this.svg.opacity(value);
	}
}

interface GridGeneratorInterface {
	generate(options: GenerateOptions): void;
}

interface GenerateOptions {
	bgColor: string;
	fills: Array<string>;
	size: number;
	columns: number;
	rows: number;
	style: GridStyle;
}

export default GridGenerator;
export { GridStyle };
