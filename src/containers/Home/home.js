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

  const [grid, setGrid] = useState(getRandomArray(35, 70))

  return (
    <div>
      <MakeGrid 
        rows={35} cols={70}
        grid = {grid} />
    </div>
  )
}

export default Home