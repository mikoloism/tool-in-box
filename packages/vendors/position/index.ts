type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right';
export type PointOfGravity = `${Vertical}-${Horizontal}` | 'center';

export default class Position {
	public readonly PADDING: number = 5;
	public startPoint!: Point;
	public endPoint!: Point;
	public x: number;
	public y: number;

	public constructor(x: number, y: number) {
		this.x = x - this.PADDING;
		this.y = y - this.PADDING;
		this.calcPoint('top-left');
	}

	public calcPoint(
		pog: PointOfGravity,
		shapeWidth: number = 50,
		shapeHeight?: number,
	): void {
		shapeHeight = shapeHeight ?? shapeWidth;

		switch (pog) {
			case 'center':
				this.startPoint = new Point(
					this.x - shapeWidth / 2,
					this.y - shapeHeight / 2,
				);
				this.endPoint = new Point(
					this.x + shapeWidth / 2,
					this.y + shapeHeight / 2,
				);
				break;

			case 'bottom-left':
				this.startPoint = new Point(this.x, this.y - shapeHeight);
				this.endPoint = new Point(this.x + shapeWidth, this.y);
				break;

			case 'bottom-right':
				this.startPoint = new Point(
					this.x - shapeWidth,
					this.y - shapeHeight,
				);
				this.endPoint = new Point(this.x, this.y);
				break;

			case 'top-right':
				this.startPoint = new Point(this.x - shapeWidth, this.y);
				this.endPoint = new Point(this.x, this.y + shapeHeight);
				break;

			case 'top-left':
			default:
				this.startPoint = new Point(this.x, this.y);
				this.endPoint = new Point(
					this.x + shapeWidth,
					this.y + shapeHeight,
				);
				break;
		}
	}
}

class Point {
	public constructor(public x: number, public y: number) {}
}
