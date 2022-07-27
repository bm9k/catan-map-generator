import {createTile} from './TileFactory';

export default function GameMap({map, size}) {
    return <g id="tiles">
        {[...map.entries()].map(([position, tile]) => {
            return createTile(position, tile, size);
        })}
    </g>
}