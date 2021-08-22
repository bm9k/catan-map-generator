import { HexMap, HexVector } from "./hex";
import { shuffle } from "./random";

function flattenCounts(counts) {
    return counts.flatMap(([key, count]) => {
        return Array(count).fill(key);
    });
}

export default class MapGenerator {
    constructor(tileCounts, numberCounts, portCounts, portGeometries) {
        this.tiles = flattenCounts(tileCounts);
        this.numbers = flattenCounts(numberCounts);
        this.ports = flattenCounts(portCounts);
        this.portGeometries = portGeometries.map(([q, r, edge]) => {
            return {
                position: new HexVector(q, r),
                edge
            }
        });
    }

    generate() {
        // tiles
        shuffle(this.tiles);
        shuffle(this.numbers);

        const map = new HexMap(3);

        let terrainIndex = 0;
        let numberIndex = 0;

        for (let radius = 0; radius <= 2; radius++) {
            for (const hex of map.ringKeys(radius)) {
                const terrain = this.tiles[terrainIndex++];
                const number = terrain === 'desert' ? null : this.numbers[numberIndex++];

                const tile = { type: 'resource', terrain, number };
                map.set(hex, tile);
            }
        }

        // ports
        shuffle(this.ports);
        for (const [i, {position, edge}] of this.portGeometries.entries()) {
            const tile = {type: 'port', trade: this.ports[i], edge};
            map.set(position, tile);
        }

        return map;
    }
}