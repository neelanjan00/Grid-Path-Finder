import { rand75 } from "./random";

/**
 * GetArray constructs a 2D array of rows x cols dimension. The array may be randomized with 0s and 1s or initialized with all 0s based on the 'randomize' parameter.
 * @param {number} rows the rows in the 2D array
 * @param {number} cols the columns in the 2D array
 * @param {boolean} randomize randomize the array with 0s and 1s or initialize with all 0s
 * @returns {number[][]} 2D array
 */
const GetArray = (rows, cols, randomize) => {
  let grid = [];
  for (let i = 0; i < rows; ++i) {
    let tempArr = [];
    for (let j = 0; j < cols; ++j) {
      randomize === true ? tempArr.push(rand75()) : tempArr.push(0);
    }

    grid.push(tempArr);
  }

  return grid;
};

export { GetArray };
