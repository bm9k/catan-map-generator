/**
 * Copyright (c) Benjamin Martin
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A coordinate on a 2d hexagonal grid/map
 * 
 * Represented by projecting three primary axes (q, r, s)
 * onto a 2d plane such that q + r + s = 0 (i.e. q, r, s are 120deg apart)
 */
export class HexVector {
    constructor(q, r) {
        this.q = q;
        this.r = r;
        this.s = -(q + r) + 0;  // +0 avoids negative zero
    }

    length() {
        // note: implementation attempts to avoid floats
        return Math.max(Math.abs(this.q), Math.abs(this.r), Math.abs(this.s));
    }

    distanceTo(other) {
        // note: implementation attempts to avoid floats
        return Math.max(Math.abs(this.q - other.q), Math.abs(this.r - other.r), Math.abs(this.s - other.s));

        // equivalent to other.subtract(this).length();
    }

    add(other) {
        return new HexVector(this.q + other.q, this.r + other.r);
    }

    subtract(other) {
        return new HexVector(this.q - other.q, this.r - other.r);
    }

    multiply(factor) {
        return new HexVector(this.q * factor, this.r * factor);
    }

    // alias for multiply
    scale(factor) {
        return new HexVector(this.q * factor, this.r * factor);
    }

    rotateRight(steps) {
        const { q, r, s } = this;

        const components = [q, r, s];

        const sign = steps % 2 === 1 ? -1 : 1;
        // components -> rotate -> update sign
        // only need first two components
        const [q2, r2] = [0, 1].map((index) => components[(index + steps) % 3])
            .map(e => e * sign + 0);

        return new HexVector(q2, r2);
    }

    toString() {
        return `(${this.q},${this.r})`;
    }
}

/**
 * A hexagonal grid/map
 * 
 * A hexagonal (hex) map is made up of a number of rings that radiate out from its centre.
 * A hex map is defined uniquely by its radius, which is the radius of its outermost ring.
 * 
 * The length of a hexagon is its distance away from the centre. A ring of radius k contains all hexagons of length k, exactly.
 * 
 * The centre hexagon is a special ring that has a radius of 0 and contains exactly one hexagon, the centre.
 * The kth ring has a radius k, and contains 6 * radius hexagons.
 * 
 * E.g. a hex map with radius 2 is shown below, with each hexagon showing its length/ring
 *        __
 *     __/2 \__ 
 *  __/2 \__/2 \__
 * /2 \__/1 \__/2 \
 * \__/1 \__/1 \__/
 * /2 \__/0 \__/2 \
 * \__/1 \__/1 \__/
 * /2 \__/1 \__/2 \
 * \__/2 \__/2 \__/
 *    \__/2 \__/
 *       \__/
 * 
 * Hexagonal maps are stored using 2d arrays, which are ~75% space efficient and provide O(1) set/get
 */
export class HexMap {
    /**
     * Create a hexagonal map
     * @param {int} radius - The number of hexagonal rings in the map, radiating out from the centre (which itself in on radius 0)
     * 
     */
    constructor(radius) {
        this.radius = radius;

        // initialise map
        this.cells = [];
        const width = 2 * radius + 1;
        for (let i = 0; i < width; i++) {
            const row = [];

            for (let j = 0; j < width; j++) {
                row.push(null);
            }

            this.cells.push(row);
        }
    }

    /**
     * Checks whether the given coordinate is in the hex map
     * @param {HexVector} hex 
     * @returns {boolean} True, iff hex is in the hex map
     */
    isHexValid(hex) {
        return hex.length() <= this.radius;
    }

    _key(hex) {
        return [hex.q + this.radius, hex.r + this.radius]
    }

    /**
     * Get the value associated with hex coordinate
     * @param {HexVector} hex 
     * @returns {*}
     */
    get(hex) {
        // TODO: ensure hex is in grid?
        const [qKey, rKey] = this._key(hex);
        return this.cells[qKey][rKey];
    }

    /**
     * Set the value associated with hex coordinate
     * @param {HexVector} hex 
     * @oaram {*} value
     */
    set(hex, value) {
        // TODO: ensure hex is in grid?
        const [qKey, rKey] = this._key(hex);
        this.cells[qKey][rKey] = value;
    }

    _valid_key(key) {
        return this.isHexValid(key);
    }

    *ringKeys(radius, firstNeighbour = 4, positiveDirection = true) {
        if (radius === 0) {
            yield CENTRE;
            return;
        }

        let key = CENTRE.add(NEIGHBOURS[firstNeighbour].multiply(radius));
        const firstDirectionOffset = positiveDirection ? 2 : 4;
        const firstDirection = (firstNeighbour + firstDirectionOffset) % 6;
        const directionScale = positiveDirection ? 1 : -1;

        for (let i = 0; i < 6; i++) {
            const i2 = (firstDirection + directionScale * i + 6) % 6;
            for (let j = 0; j < radius; j++) {
                yield key;

                key = key.add(NEIGHBOURS[i2]);
            }
        }
    }

    // TODO: comment this
    *[Symbol.iterator]() {
        for (let radius = 0; radius <= this.radius; radius++) {
            for (const key of this.ringKeys(radius)) {
                yield key;
            }
        }
    }

    // TODO: comment this
    *entries() {
        for (const key of this) {
            yield [key, this.get(key)];
        }
    }
}

export const CENTRE = new HexVector(0, 0);

// ordered by r -> -q
// TODO: generate this based upon axis orientation choice?
// const firstNeighbour = new HexVector(1, 0);
// export const NEIGHBOURS = [0, 1, 2, 3, 4, 5].map(i => firstNeighbour.rotateRight(i))

export const NEIGHBOURS = [
    new HexVector(1, 0),
    new HexVector(0, 1),
    new HexVector(-1, 1),
    new HexVector(-1, 0),
    new HexVector(0, -1),
    new HexVector(1, -1),
]

export const DIAGONALS = [
    // DIAGONALS[i] = NEIGHBOURS[i] + NEIGHBOURS[i-1]
    new HexVector(2, -1),
    new HexVector(1, 1),
    new HexVector(-1, 2),
    new HexVector(-2, 1),
    new HexVector(-1, -1),
    new HexVector(1, -2),
]

// vertices of the (0, 0) hex
export const VERTICES = DIAGONALS.map(({ q, r }) => new HexVector(q / 3, r / 3));

// centre point of edges of the (0, 0) hex
export const EDGES = NEIGHBOURS.map(({ q, r }) => new HexVector(q / 2, r / 2));

// TODO: calculate this based upon axis definition?
// e.g., in this case: q => x,-y; r => +y
// Should it be in a layout/coordinate translator class?
const Q_BASIS = [Math.sqrt(3), 0];
const R_BASIS = [Math.sqrt(3) / 2, 3 / 2];

export function hexToPixel(hex, radius) {
    const x = radius * (Q_BASIS[0] * hex.q + R_BASIS[0] * hex.r);
    const y = radius * (Q_BASIS[1] * hex.r + R_BASIS[1] * hex.r);

    return { x, y };
}