
/**
 * Returns a two-dimensional array (an array of arrays) with dimensions n by m.
 * All the elements of this new matrix are initially equal to x
 * @param  {Number} n number of rows
 * @param  {Number} m number of columns
 * @param  {Mixed} x initial element for every item in matrix
 * @return {Array<Array>}
 */
function makeMatrix(n, m, x) {
    const matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = new Array(m);

        if (x != null) {
            for (let j = 0; j < m; j++) {
                matrix[i][j] = x;
            }
        }
    }

    return matrix;
}

/**
 * Computes Longest Common Subsequence between two Immutable.JS Indexed Iterables
 * Based on Dynamic Programming http://rosettacode.org/wiki/Longest_common_subsequence#Java
 * @param  {Array} xs
 * @param  {Array} ys
 * @return {Array}
 */
function lcs(xs, ys, isEqual) {
    const matrix = computeLcsMatrix(xs, ys, isEqual);
    return backtrackLcs(xs, ys, matrix, isEqual);
}


/**
 * Computes the Longest Common Subsequence table
 * @param  {Array} xs
 * @param  {Array} ys
 * @return {Array<Array>}
 */
function computeLcsMatrix(xs, ys, isEqual) {
    const n = xs.length || 0;
    const m = ys.length || 0;
    const a = makeMatrix(n + 1, m + 1, 0);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (isEqual(xs[i], ys[j])) {
                a[i + 1][j + 1] = a[i][j] + 1;
            }
            else {
                a[i + 1][j + 1] = Math.max(a[i + 1][j], a[i][j + 1]);
            }
        }
    }

    return a;
}

/**
 * Extracts a LCS from matrix M
 * @param  {Array} xs
 * @param  {Array} ys
 * @param  {Array<Array>}matrix LCS Matrix
 * @return {Array<T>} Longest Common Subsequence
 */
function backtrackLcs(xs, ys, matrix, isEqual) {
    const result = [];
    for (let i = xs.length, j = ys.length; i !== 0 && j !== 0;) {
        if (matrix[i][j] === matrix[i - 1][j]) { i--; }
        else if (matrix[i][j] === matrix[i][j - 1]) { j--; }
        else {
            const xValue = xs[i - 1];
            const yValue = ys[j - 1];
            if (isEqual(xValue, yValue)) {
                result.push(
                    {
                        original: xValue,
                        modified: yValue
                    }
                );
                i--;
                j--;
            }
        }
    }
    return result.reverse();
}

module.exports = lcs;
