import { useState } from "react";
import MakeGrid from "../../components/Grid/grid";

/**
 * rand50 returns 0 or 1 with a 50 - 50 probability.
 * @returns {number}
 */
const rand50 = () => {
  return Math.floor(Math.random() * 10) & 1;
};

/**
 * rand75 returns 0 with 75% probability and 1 with 25% probability.
 * @returns {number}
 */
function rand75() {
  return rand50() & rand50(); // & truth table operation gives us '0' 3/4 times and '1' 1/4 times
}

/**
 * getArray constructs a 2D array of rows x cols dimension. The array may be randomized with 0s and 1s or initialized with all 0s based on the 'randomize' parameter.
 * @param {number} rows the rows in the 2D array
 * @param {number} cols the columns in the 2D array
 * @param {boolean} randomize randomize the array with 0s and 1s or initialize with all 0s
 * @returns {number[][]} 2D array
 */
const getArray = (rows, cols, randomize) => {
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

/**
 * findPathUsingBFS finds the shortest path between the source and the destination using BFS. It returns the parent and visited array when the source vertex is found.
 * @param {number[]} start starting position coordinates
 * @param {number[]} end ending position coordinates
 * @param {number} rows number of rows in the graph grid
 * @param {number} cols number of cols in the graph 2D array
 * @param {number[][]} graph graph 2D array
 * @returns {[number[][][], number[][]]} The parent array and the visited array
 */
const findPathUsingBFS = (start, end, rows, cols, graph) => {
  let parent = getArray(rows, cols, false);
  let visited = getArray(rows, cols, false);

  let queue = [start];
  visited[start[0]][start[1]] = 1;
  parent[start[0]][start[1]] = [start[0], start[1]];

  while (queue.length > 0) {
    let node = queue.shift();

    if (node[0] === end[0] && node[1] === end[1]) {
      return [parent, visited];
    }

    let x = node[0];
    let y = node[1];

    //top
    if (x !== 0 && graph[x - 1][y] === 0 && visited[x - 1][y] === 0) {
      queue.push([x - 1, y]);
      visited[x - 1][y] = 1;
      parent[x - 1][y] = node;
    }

    //bottom
    if (x !== rows - 1 && graph[x + 1][y] === 0 && visited[x + 1][y] === 0) {
      queue.push([x + 1, y]);
      visited[x + 1][y] = 1;
      parent[x + 1][y] = node;
    }

    //left
    if (y !== 0 && graph[x][y - 1] === 0 && visited[x][y - 1] === 0) {
      queue.push([x, y - 1]);
      visited[x][y - 1] = 1;
      parent[x][y - 1] = node;
    }

    //right
    if (y !== cols - 1 && graph[x][y + 1] === 0 && visited[x][y + 1] === 0) {
      queue.push([x, y + 1]);
      visited[x][y + 1] = 1;
      parent[x][y + 1] = node;
    }
  }
};

/**
 * reconstructPath returns the actual shortest path from the start position to the end position. It backtracks from the end to the start position using the parent array.
 * @param {number[]} start starting position coordinates
 * @param {number[]} end ending position coordinates
 * @param {number[][][]} parent the parent array
 * @returns {number[]} the path traced from the start to the end
 */
const reconstructPath = (start, end, parent) => {
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

const Home = () => {
  const rows = 25;
  const cols = 50;

  const [startingPosition, setStartingPosition] = useState([]);
  const [endingPosition, setEndingPosition] = useState([]);

  const [grid, setGrid] = useState(getArray(rows, cols, true));

  /**
   * tracePath finds a path between the source and the destination and traces it on the grid.
   */
  const tracePath = () => {
    let obj = findPathUsingBFS(
      startingPosition,
      endingPosition,
      rows,
      cols,
      grid
    );

    if(typeof obj === 'undefined') {
      alert(`No path exists between the starting and ending position.`)
      return
    }

    let parent = obj[0];
    let visited = obj[1];

    let path = reconstructPath(startingPosition, endingPosition, parent);

    let newGrid = getArray(rows, cols, false);

    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        newGrid[i][j] = grid[i][j];

        if (visited[i][j] === 1) {
          newGrid[i][j] = 2;
        }
      }
    }

    path.forEach((coordinate) => {
      newGrid[coordinate[0]][coordinate[1]] = 3;
    });

    setGrid(newGrid);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: 700 }}>Path Finder</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MakeGrid
          startingPosition={startingPosition}
          setStartingPosition={setStartingPosition}
          endingPosition={endingPosition}
          setEndingPosition={setEndingPosition}
          rows={25}
          cols={50}
          grid={grid}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => tracePath()}
          style={{
            padding: "10px",
            paddingLeft: "13px",
            paddingRight: "13px",
            borderRadius: "3px",
            outline: "0",
            border: "0",
            cursor: "pointer",
            backgroundColor: "lightgrey",
            display:
              startingPosition.length !== 0 && endingPosition.length !== 0
                ? "inherit"
                : "none",
          }}
        >
          Find Path
        </button>
      </div>
    </div>
  );
};

export default Home;
