import { tileColours } from "../data/colours";
import { resourcesByTerrain } from "../data/map";
import { EDGES, hexToPixel, VERTICES } from "../util/hex";

function HexLine({ from, to, size, ...props }) {
    const { x: x1, y: y1 } = hexToPixel(from, size);
    const { x: x2, y: y2 } = hexToPixel(to, size);
    return <line {...{ x1, y1, x2, y2 }} {...props} />
}

function PortShip(props) {
    const {trade, size} = props;

    const tradeIn = trade === "random" ? 3 : 2;
    const ratio = `${tradeIn}:1`;

    return <>
        <circle r={size} fill="rgba(255,255,255,0.5)" />

        {trade === "random"
            ? (
                <text
                    y={size * -.375}
                    dominantBaseline="central"
                    textAnchor="middle"
                    fontSize={size * 0.75}
                >?</text>
            )
            : (
                <circle
                    cy={size * -.375}
                    r={size * .3125}
                    fill={tileColours[resourcesByTerrain[trade]]}
                    stroke="#444"
                    strokeWidth={size * 0.02}
                />
            )}

        <text
            dominantBaseline="central"
            textAnchor="middle"
            x={0}
            y={size * 0.375}
            fontSize={size * 0.5}
        >{ratio}</text>
    </>
}

export default function Port(props) {
    const {
        tile, size,
        shipRadius=0.4,
        bridgeLength = 0.46,
        shipOffset = 0.2  // how close ship is shifted towards land
    } = props;
    const { edge, trade } = tile;

    const vertexA = VERTICES[edge];
    const vertexB = VERTICES[(edge + 1) % 6];

    const shipCentre = hexToPixel(EDGES[edge].scale(shipOffset), size);
    const bridgeStart = 1 - bridgeLength;

    return <>
        {/* bridges */}
        <HexLine
            from={vertexA.scale(bridgeStart)} to={vertexA} size={size}
            stroke={tileColours.land}
        />
        <HexLine
            from={vertexB.scale(bridgeStart)} to={vertexB} size={size}
            stroke={tileColours.land}
        />
        {/* smooth land */}
        <HexLine
            from={vertexA} to={vertexB} size={size}
            stroke="#000"
        />
        <g transform={`translate(${shipCentre.x} ${shipCentre.y})`}>
            <PortShip trade={trade} size={size * shipRadius} />
        </g>
    </>
}