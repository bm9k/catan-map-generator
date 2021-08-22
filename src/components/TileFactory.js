import Tile from "./Tile";
import NumberToken from "./NumberToken";
import Port from "./Port";

import { tileColours } from "../data/colours";

export function ResourceTile({ position, tile, size }) {
    return <Tile
        key={position.toString()}
        position={position}
        size={size}
        fill={tileColours[tile.terrain]}
        stroke="#000"
        strokeWidth={size*0.02}
    >
        {tile.number && <NumberToken
            number={tile.number}
            size={size * .4}
        />}
    </Tile>
}

export function PortTile({ position, tile, size }) {
    return <Tile
        position={position}
        size={size}
        fill={tileColours.sea}
        stroke="#000"
    >
        <Port size={size} position={position} tile={tile} />
    </Tile>
}

export function createTile(position, tile, size) {
    if (!tile) {
        return null;
    }

    const props = { position, tile, size, key: position.toString() };

    switch (tile.type) {
        case "resource":
            return <ResourceTile {...props} />
        case "port":
            return <PortTile {...props} />
        default: throw new Error(`Unrecognised tile type ${tile.type}`)
    }
}