import Tile from './Tile';
import NumberToken from './NumberToken';

import { tileColours } from '../data/colours';

export default function GameMap({map, size}) {
    return <g id="tiles">
        {[...map.entries()].map(([position, tile]) => {
            return <Tile
                key={`${position.q},${position.r}`}
                position={position}
                fill={tileColours[tile.terrain]}
                stroke="#000"
                size={size}
            >
                {tile.number && <NumberToken
                  number={tile.number}
                  size={size*.4}
                />}
            </Tile>
        })}
    </g>
}