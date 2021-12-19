/**
 * ReconstructPath returns the actual shortest path from the start position to the end position. It backtracks from the end to the start position using the parent array.
 * @param {number[]} start starting position coordinates
 * @param {number[]} end ending position coordinates
 * @param {number[][][]} parent the parent array
 * @returns {number[]} the path traced from the start to the end
 */
const ReconstructPath = (start, end, parent) => {
  let path = [];

  let x = end[0];
  let y = end[1];

  while (1) {
    path.push([x, y]);

    let tempX = x;
    x = parent[x][y][0];
    y = parent[tempX][y][1];

    if (x === start[0] && y === start[1]) {
      return path;
    }
  }
};

export { ReconstructPath };
