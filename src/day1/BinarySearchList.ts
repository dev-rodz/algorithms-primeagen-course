export default function bs_list(haystack: number[], needle: number): boolean {
    // Start of the search range
    let lower = 0;

    // End of the search range (exclusive)
    let higher = haystack.length;

    do {
        // Calculate the middle index
        const middle = Math.floor(lower + (higher - lower) / 2);
        const value = haystack[middle];

        if (value === needle) {
            // Found the target
            return true;
        } else if (value > needle) {
            // Target is in the left half (excluding current middle)
            higher = middle;
        } else {
            // Target is in the right half (excluding current middle)
            lower = middle + 1;
        }
    } while (lower < higher);

    // Target not found
    return false;
}
