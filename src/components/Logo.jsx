import { DIAGONALS, HexMap, hexToPixel, NEIGHBOURS, VERTICES } from "../util/hex";
import { edgeColour, tileColours } from "../data/colours";
import GameMap from "./GameMap";
import Tile from "./Tile";

export default function Logo() {
    const colours = ['sea', 'desert', 'forest', 'hills', 'pasture', 'fields', 'mountains'];
    const map = new HexMap(1);
    const size = 50;

    for (const [i, key] of [...map].entries()) {
        const colour = colours[i];
        map.set(key, {colour});
    }

    const minHex = DIAGONALS[4].add(VERTICES[5]);
    const maxHex = DIAGONALS[1].add(VERTICES[2]);
    const min = hexToPixel(minHex, size);
    const max = hexToPixel(maxHex, size);

    const padX = 2;
    const padY = 2;

    const viewBox = [
        min.x - padX,
        min.y - padY,
        max.x - min.x + 2 * padX,
        max.y - min.y + 2 * padY
    ].join(" ")

    return <svg viewBox={viewBox}>
        <g id="tiles">
        {[...map.entries()].map(([position, {colour}]) => {
            return <Tile
                key={position.toString()}
                position={position}
                size={size}
                fill={tileColours[colour]}
                stroke={edgeColour}
            >
            </Tile>
        })}
    </g>
    </svg>
}