import { GetArray } from "../utility/array";
let PriorityQueue = require("priorityqueuejs");

/**
 * Dijkstra finds the shortest path between the source and the destination using Dijkstra algorithm. It returns the parent and visited array when the end position is found.
 * @param {number[]} start starting position coordinates
 * @param {number[]} end ending position coordinates
 * @param {number} rows number of rows in the graph 2D array
 * @param {number} cols number of cols in the graph 2D array
 * @param {number[][]} graph graph 2D array
 * @returns {[number[][][], number[][]]} the parent array and the visited array
 */
const Dijkstra = (start, end, rows, cols, graph) => {
  let parent = GetArray(rows, cols, false);
  let distance = GetArray(rows, cols, false);
  let edgeWeight = 1;

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      distance[i][j] = Number.MAX_VALUE;
    }
  }

  let priorityQueue = new PriorityQueue((a, b) => {
    return b.distance - a.distance;
  });

  distance[start[0]][start[1]] = 0;
  parent[start[0]][start[1]] = [start[0], start[1]];

  priorityQueue.enq({ distance: 0, node: start });

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.peek().node;
    priorityQueue.deq();

    if (node[0] === end[0] && node[1] === end[1]) {
      break;
    }

    let x = node[0];
    let y = node[1];

    //top
    if (
      x !== 0 &&
      graph[x - 1][y] === 0 &&
      distance[x][y] + edgeWeight < distance[x - 1][y]
    ) {
      distance[x - 1][y] = distance[x][y] + edgeWeight;
      priorityQueue.enq({ distance: distance[x - 1][y], node: [x - 1, y] });
      parent[x - 1][y] = node;
    }

    //bottom
    if (
      x !== rows - 1 &&
      graph[x + 1][y] === 0 &&
      distance[x][y] + edgeWeight < distance[x + 1][y]
    ) {
      distance[x + 1][y] = distance[x][y] + edgeWeight;
      priorityQueue.enq({ distance: distance[x + 1][y], node: [x + 1, y] });
      parent[x + 1][y] = node;
    }

    //left
    if (
      y !== 0 &&
      graph[x][y - 1] === 0 &&
      distance[x][y] + edgeWeight < distance[x][y - 1]
    ) {
      distance[x][y - 1] = distance[x][y] + edgeWeight;
      priorityQueue.enq({ distance: distance[x][y - 1], node: [x, y - 1] });
      parent[x][y - 1] = node;
    }

    //right
    if (
      y !== cols - 1 &&
      graph[x][y + 1] === 0 &&
      distance[x][y] + edgeWeight < distance[x][y + 1]
    ) {
      distance[x][y + 1] = distance[x][y] + edgeWeight;
      priorityQueue.enq({ distance: distance[x][y + 1], node: [x, y + 1] });
      parent[x][y + 1] = node;
    }
  }

  // modify the distance array to a visited array 
  if (distance[end[0]][end[1]] !== Number.MAX_VALUE) {
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < cols; ++j) {
        if (distance[i][j] === Number.MAX_VALUE) {
          distance[i][j] = 0;
        } else {
          distance[i][j] = 1;
        }
      }
    }

    return [parent, distance];
  }
};

export { Dijkstra };
