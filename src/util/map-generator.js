import { HexMap } from "./hex";
import { shuffle } from "./random";

function flattenCounts(counts) {
    return counts.flatMap(([key, count]) => {
        return Array(count).fill(key);
    });
}

export default class MapGenerator {
    constructor(tileCounts, numberCounts) {
        this.tiles = flattenCounts(tileCounts);
        this.numbers = flattenCounts(numberCounts);

        console.log(this.tiles, this.numbers);
    }

    generate() {
        shuffle(this.tiles);
        shuffle(this.numbers);

        const map = new HexMap(2);

        let terrainIndex = 0;
        let numberIndex = 0;

        for (const hex of map) {
            const terrain = this.tiles[terrainIndex++];
            const number = terrain === 'desert' ? null : this.numbers[numberIndex++];

            const tile = { terrain, number };
            map.set(hex, tile);
        }

        return map;
    }
}