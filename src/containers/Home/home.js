import { useState } from "react";
import { GetArray } from "../../utility/array";
import { BFS } from "../../BFS/bfs";
import { DFS } from "../../DFS/dfs";
import { Dijkstra } from "../../Dijkstra/dijkstra";
import { ReconstructPath } from "../../utility/path";
import MakeGrid from "../../components/Grid/grid";

const Home = () => {
  const rows = 25;
  const cols = 50;

  const [startingPosition, setStartingPosition] = useState([]);
  const [endingPosition, setEndingPosition] = useState([]);

  const [grid, setGrid] = useState(GetArray(rows, cols, true));

  const searchAlgorithms = ["BFS", "DFS", "Dijkstra"];

  /**
   * tracePath finds a path between the source and the destination and traces it on the grid.
   * @param {string} algorithm search algorithm name
   */
  const tracePath = (algorithm) => {
    let obj;

    switch (algorithm) {
      case "BFS":
        obj = BFS(startingPosition, endingPosition, rows, cols, grid);
        break;

      case "DFS":
        obj = DFS(startingPosition, endingPosition, rows, cols, grid);
        break;

      case "Dijkstra":
        obj = Dijkstra(startingPosition, endingPosition, rows, cols, grid);
        break;

      default:
        return;
    }

    if (typeof obj === "undefined") {
      alert(`No path exists between the starting and ending position.`);
      return;
    }

    let parent = obj[0];
    let visited = obj[1];

    let path = ReconstructPath(startingPosition, endingPosition, parent);

    let newGrid = GetArray(rows, cols, false);

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
        {searchAlgorithms.map((algorithm) => {
          return (
            <button
              onClick={() => tracePath(algorithm)}
              style={{
                padding: "10px",
                marginLeft: "10px",
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
              {algorithm}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
