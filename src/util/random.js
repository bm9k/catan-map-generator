export function randomInt(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
}

// Implementation of Fisher-Yates
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = randomInt(0, i + 1);

        // swap
        const tmp = array[j];
        array[j] = array[i];
        array[i] = tmp;
    }

    return array;
}