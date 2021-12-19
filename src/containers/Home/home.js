import { useState } from "react";
import { GetArray } from "../../utility/array";
import { BFS } from "../../BFS/bfs";
import { DFS } from "../../DFS/dfs";
import { Dijkstra } from "../../Dijkstra/dijkstra";
import { ReconstructPath } from "../../utility/path";
import MakeGrid from "../../components/Grid/grid";

let rows = 25;
let cols = 60;

// responsive column sizes for various screen widths
if(window.screen.width < 400) {
  cols = 15;
} else if(window.screen.width < 500) {
  cols = 17;
} else if(window.screen.width < 600) {
  cols = 22;
} else if(window.screen.width < 700) {
  cols = 25;
} else if(window.screen.width < 800) {
  cols = 30;
} else if(window.screen.width < 900) {
  cols = 35;
} else if(window.screen.width < 1000) {
  cols = 40;
} else if(window.screen.width < 1100) {
  cols = 45;
} else if(window.screen.width < 1200) {
  cols = 50;
} else if(window.screen.width < 1300) {
  cols = 55;
} 

const newGrid = GetArray(rows, cols, true);

const Home = () => {
  const [startingPosition, setStartingPosition] = useState([]);
  const [endingPosition, setEndingPosition] = useState([]);
  const [isPathVisible, setIsPathVisible] = useState(false);
  const [grid, setGrid] = useState(newGrid);

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
    setIsPathVisible(true);
  };

  /**
   * clearGrid clears the traced path, starting position and ending position
   */
  const clearGrid = () => {
    setEndingPosition([]);
    setStartingPosition([]);
    setGrid(newGrid);

    setIsPathVisible(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: 1000 }}>Grid Path Finder</h1>

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
          rows={rows}
          cols={cols}
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
        {searchAlgorithms.map((algorithm, i) => {
          return (
            <button
              key={i}
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
                  startingPosition.length !== 0 &&
                  endingPosition.length !== 0 &&
                  !isPathVisible
                    ? "inherit"
                    : "none",
              }}
            >
              {algorithm}
            </button>
          );
        })}

        <button
          onClick={() => clearGrid()}
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
            display: isPathVisible ? "inherit" : "none",
          }}
        >
          Clear Grid
        </button>
      </div>
    </div>
  );
};

export default Home;
