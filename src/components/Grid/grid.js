// MakeGrid renders a table of dimensions rows x cols, as per the values in grid 
const MakeGrid = ({
  startingPosition, setStartingPosition,
  endingPosition, setEndingPosition,
  rows, cols, 
  grid
}) => {

  /**
   * cellClickHandler assigns the starting and ending positions
   * @param {number} i row index
   * @param {number} j column index
   */
  const cellClickHandler = (i, j) => {

    if(startingPosition.length === 0 && grid[i][j] === 0) {
      setStartingPosition([i, j]);
    } 
    
    else if(i === startingPosition[0] && j === startingPosition[1] && endingPosition.length === 0) {
      setStartingPosition([]);
    } 
    
    else if(endingPosition.length === 0 && grid[i][j] === 0) {
      setEndingPosition([i, j]);
    } 
    
    else if(i === endingPosition[0] && j === endingPosition[1]) {
      setEndingPosition([]);
    }
  }

  /**
   * getCellColor returns the color of a cell, given its coordinates
   * @param {number} i row index
   * @param {number} j column index
   * @returns {string} the color for the cell at ith row and jth column
   */
  const getCellColor = (i, j) => {

    if(startingPosition.length !== 0 && i === startingPosition[0] && j === startingPosition[1]) {
      return "green"; // starting position
    } 
    
    else if(endingPosition.length !== 0 && i === endingPosition[0] && j === endingPosition[1]) {
      return "red"; // ending position
    } 
    
    else if(grid[i][j] === 2) {
      return "lightblue"; // visited nodes
    } 
    
    else if (grid[i][j] === 3) {
      return "sandybrown"; // path
    }

    return grid[i][j] === 0 ? "lightgrey" : "black"; // normal grid cells
  }

  return (
    <table>
      <tbody>
        {Array(rows).fill(0).map((_, i) => (
          <tr key={i}>
            {Array(cols).fill(1).map((_, j) => (
              <td key={j} 
                  onClick={() => {cellClickHandler(i, j)}}
                  style={{ 
                    width: "20px", 
                    height: "20px", 
                    backgroundColor: getCellColor(i, j)
                  }}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MakeGrid