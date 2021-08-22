export const tileCounts = [
    ['desert', 1],
    ['forest', 4],
    ['hills', 3],
    ['pasture', 4],
    ['fields', 4],
    ['mountains', 3],
];

export const numberCounts = [
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
    [8, 2],
    [9, 2],
    [10, 2],
    [11, 2],
    [12, 1],
];

export const portCounts = [
    ['random', 4],
    ['wood', 1],
    ['brick', 1],
    ['sheep', 1],
    ['wheat', 1],
    ['ore', 1],
];

export const portGeometries = [
    // q, r, edge direction
    // Represents a port with given geometry:
    //     position ({q, r}): the position of the tile which the port occupies
    //     orientation (edge direction): the direction of the land edge;
    //                                   corresponds to NEIGHBOURS[orientation]
    [3, 0, 3],
    [1, 2, 4],
    [-1, 3, 4],
    [-3, 3, 5],
    [-3, 1, 0],
    [-2, -1, 0],
    [0, -3, 1],
    [2, -3, 2],
    [3, -2, 2],
];

export const resourcesByTerrain = {
    'wood': 'forest',
    'brick': 'hills',
    'sheep': 'pasture',
    'wheat': 'fields',
    'ore': 'mountains',
};