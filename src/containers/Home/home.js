import { useState } from "react"
import MakeGrid from "../../components/Grid/grid";

// rand50 returns 0 or 1 with a 50 - 50 probability
const rand50 = () => {
  return Math.floor(Math.random() * 10) & 1;
}

// rand75 returns 0 with 75% probability and 1 with 25% probability
function rand75() {
  return rand50() & rand50(); // & truth table operation gives us '0' 3/4 times and '1' 1/4 times
}

// getRandomArray generates a random array of 0s and 1s with only 1/4th ones
const getRandomArray = (rows, cols) => {

  let grid = []
  for(let i=0; i<rows; ++i) {
    
    let tempArr = []
    for(let j=0; j<cols; ++j) {
      tempArr.push(rand75())
    }

    grid.push(tempArr)
  }

  return grid
}

const Home = () => {

  const [startingPosition, setStartingPosition] = useState([])
  const [endingPosition, setEndingPosition] = useState([])

  const [grid, setGrid] = useState(getRandomArray(25, 50))

  const findPath = () => {
    
  }

  return (
    <div>

      <h1 style={{ textAlign: 'center', fontWeight: 700 }}>Path Finder</h1>

      <div style={{
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center'}}>
        <MakeGrid 
          startingPosition = {startingPosition} setStartingPosition={setStartingPosition}
          endingPosition = {endingPosition} setEndingPosition={setEndingPosition}
          rows={25} cols={50}
          grid = {grid} />
      </div>

      <div style={{
        display: 'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop: '30px'}}>
        <button
          onClick={() => findPath()} 
          style={{
            padding: '10px',
            paddingLeft: '13px',
            paddingRight: '13px', 
            borderRadius: '3px',
            outline: '0',
            border: '0',
            cursor: 'pointer',
            backgroundColor: 'lightgrey',
            display: startingPosition.length !== 0 && endingPosition.length !== 0 ? 'inherit' : 'none'
          }}>
          Find Path
        </button>
      </div>

    </div>
  )
}

export default Home