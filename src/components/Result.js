import React from 'react'

export default function Result({result, symbol, reset}) {
  return (
    <div className='result'>
        {result === 1 && <p>{symbol} has won the game</p>}
        {result === 0 && <p>The game ended in a draw</p>}
        <button onClick={() => reset()}>replay</button>
    </div>
  )
}
