import { HexMap, HexVector } from "./hex";
import { shuffle } from "./random";

function flattenCounts(counts) {
    return counts.flatMap(([key, count]) => {
        return Array(count).fill(key);
    });
}

export default class MapGenerator {
    constructor(tileCounts, numberTokens, portCounts, portGeometries) {
        this.tiles = flattenCounts(tileCounts);
        this.numbers = numberTokens;
        this.ports = flattenCounts(portCounts);
        this.portGeometries = portGeometries.map(([q, r, edge]) => {
            return {
                position: new HexVector(q, r),
                edge
            }
        });
    }

    generate() {
        // land tiles
        shuffle(this.tiles);

        const map = new HexMap(3);

        // randomly choose a corner & direction to place number tokens according to letter order
        // see the catan rules, p13, illustration Q
        // https://www.catan.com/sites/prod/files/2021-06/catan_base_rules_2020_200707.pdf
        const corner = Math.floor(Math.random() * 6);
        const clockwise = Math.random() < .5;

        let terrainIndex = 0;
        let numberIndex = 0;

        for (let radius = 2; radius >= 0; radius--) {
            for (const hex of map.ringKeys(radius, corner, clockwise)) {
                const terrain = this.tiles[terrainIndex++];
                const number = terrain === "desert" ? null : this.numbers[numberIndex++];

                const tile = { type: 'resource', terrain, number };
                map.set(hex, tile);
            }
        }

        // ports
        shuffle(this.ports);
        for (const [i, { position, edge }] of this.portGeometries.entries()) {
            const tile = { type: 'port', trade: this.ports[i], edge };
            map.set(position, tile);
        }

        return map;
    }
}