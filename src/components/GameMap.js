import Tile from './Tile';

import { colours } from '../data/colours';

export default function GameMap({map, size}) {
    return <g id="tiles">
        {[...map.entries()].map(([position, tile]) => {
            return <Tile
                key={`${position.q},${position.r}`}
                position={position}
                fill={colours[tile.terrain]}
                stroke="#000"
                size={size}
            >
                <text
                    textAnchor="middle"
                    dominantBaseline="central"
                >{tile.terrain}</text>
            </Tile>
        })}
    </g>
}