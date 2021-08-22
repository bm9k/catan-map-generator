export default function Port(props) {
    const { tile, size } = props;
    const { edge, trade } = tile;
    const tradeIn = trade === "random" ? 3 : 2;

    const ratio = `${tradeIn}:1`;

    const rotation = edge * 60 - 90;

    return <text
        dominantBaseline="central"
        textAnchor="middle"
        x={0}
        y={0}
        transform={`rotate(${rotation})`}
    >
        <tspan x={0} y={10}>{trade}</tspan>
        <tspan x={0} y={30}>{ratio}</tspan>
    </text>
}