import { VERTICES, hexToPixel } from "../util/hex";
import { pointsToPolyAttr } from "../util/svg";

export default function Tile(props) {
    const { size, position, ...passedProps } = props;
    const { x, y } = hexToPixel(position, size);

    const points = VERTICES.map((vertex) => hexToPixel(vertex, size));

    return <g transform={`translate(${x} ${y})`}>
        <polygon
            points={pointsToPolyAttr(points)}
            {...passedProps}
        />
        {props.children}
    </g>
}