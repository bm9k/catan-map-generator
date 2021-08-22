// Returns the polygon/polyline points string value that corresponds
// an array of {x, y} points
export function pointsToPolyAttr(points) {
    return points.map(({ x, y }) => `${x},${y}`).join(" ");
}