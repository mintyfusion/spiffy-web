const base = 36;
const from = 2;
const length = 9;

/**
 * Math.random should be unique because of its seeding algorithm.
 * Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
 */
export default function getUniqueId(): string {
    return `_${Math.random().toString(base).substr(from, length)}_${new Date().getTime()}`;
}