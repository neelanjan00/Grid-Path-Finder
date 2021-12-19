import { useState } from "react";
import { GetArray } from "../../utility/array";
import { BFS } from "../../BFS/bfs";
import { ReconstructPath } from "../../utility/path";
import MakeGrid from "../../components/Grid/grid";

const Home = () => {
  const rows = 25;
  const cols = 50;

  const [startingPosition, setStartingPosition] = useState([]);
  const [endingPosition, setEndingPosition] = useState([]);

  const [grid, setGrid] = useState(GetArray(rows, cols, true));

  /**
   * tracePath finds a path between the source and the destination and traces it on the grid.
   */
  const tracePath = () => {
    let obj = BFS(
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
