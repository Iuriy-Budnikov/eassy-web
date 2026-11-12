/**
 * A smooth SVG path through a series of points (Catmull-Rom, converted to
 * cubic Béziers), for the line charts in the illustrations.
 */
export function smooth(points: [number, number][]) {
	return points
		.map(([x, y], i) => {
			if (i === 0) return `M${x} ${y}`;
			const [x0, y0] = points[i - 2] ?? points[i - 1];
			const [x1, y1] = points[i - 1];
			const [x3, y3] = points[i + 1] ?? [x, y];
			const c1x = x1 + (x - x0) / 6;
			const c1y = y1 + (y - y0) / 6;
			const c2x = x - (x3 - x1) / 6;
			const c2y = y - (y3 - y1) / 6;
			return `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
		})
		.join(' ');
}
