// MakeGrid renders a table of dimensions rows x cols, as per the values in grid 
const MakeGrid = ({rows, cols, grid}) => {
  return (
    <table>
      <tbody>
        {Array(rows).fill(0).map((_, i) => (
          <tr key={i}>
            {Array(cols).fill(1).map((_, j) => (
              <td key={j} 
                  style={{ 
                    width: "20px", 
                    height: "20px", 
                    backgroundColor: grid[i][j] === 0 ? "lightgrey" : "black"
                  }}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MakeGrid