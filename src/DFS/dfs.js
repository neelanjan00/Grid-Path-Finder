import { GetArray } from "../utility/array";

/**
 * DFS finds a path between the source and the destination using DFS algorithm. It returns the parent and visited array when the end position is found.
 * @param {number[]} start starting position coordinates
 * @param {number[]} end ending position coordinates
 * @param {number} rows number of rows in the graph 2D array
 * @param {number} cols number of cols in the graph 2D array
 * @param {number[][]} graph graph 2D array
 * @returns {[number[][][], number[][]]} the parent array and the visited array
 */
const DFS = (start, end, rows, cols, graph) => {

  let parent = GetArray(rows, cols, false);
  let visited = GetArray(rows, cols, false);

  let stack = [start];
  visited[start[0]][start[1]] = 1;
  parent[start[0]][start[1]] = [start[0], start[1]];

  while (stack.length > 0) {
    
    let node = stack.pop()

    if (node[0] === end[0] && node[1] === end[1]) {
      return [parent, visited];
    }

    let x = node[0];
    let y = node[1];

    //top
    if (x !== 0 && graph[x - 1][y] === 0 && visited[x - 1][y] === 0) {
      stack.push([x - 1, y]);
      visited[x - 1][y] = 1;
      parent[x - 1][y] = node;
    }

    //bottom
    if (x !== rows - 1 && graph[x + 1][y] === 0 && visited[x + 1][y] === 0) {
      stack.push([x + 1, y]);
      visited[x + 1][y] = 1;
      parent[x + 1][y] = node;
    }

    //left
    if (y !== 0 && graph[x][y - 1] === 0 && visited[x][y - 1] === 0) {
      stack.push([x, y - 1]);
      visited[x][y - 1] = 1;
      parent[x][y - 1] = node;
    }

    //right
    if (y !== cols - 1 && graph[x][y + 1] === 0 && visited[x][y + 1] === 0) {
      stack.push([x, y + 1]);
      visited[x][y + 1] = 1;
      parent[x][y + 1] = node;
    }
  }
};

export { DFS };
