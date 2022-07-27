import { EDGES, hexToPixel } from "../util/hex";

// renders the coordinates of a tile at a given position, as well
// as its relative edges
// should be passed as child of Tile
// E.g.
/* <Tile
    position={position}
    fill="blue"
    stroke="#000"
    size={size}
>
    <TileCoordinates size={size} position={position} />
></Tile>
*/

export default function TileCoordinates(props) {
    const { size, children, ...tileProps } = props;
    const { q, r } = tileProps.position;
  
    return <>
      <text
        fontSize={size * .25}
        textAnchor="middle"
        dominantBaseline="central"
      >{q}, {r}</text>
      {EDGES.map((edge, i) => {
        const { x, y } = hexToPixel(edge, size * .85);
        return <text
          key={i}
          x={x}
          y={y}
          fontSize={size * .15}
          textAnchor="middle"
          dominantBaseline="central"
        >{i}</text>
      })}
    </>
  }