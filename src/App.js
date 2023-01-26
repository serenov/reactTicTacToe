import './App.css';
import React, {useState, useRef} from 'react';
import Board from './components/Board'
import Result from './components/Result';

const presets = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
]

function App() {
  const [board, setBoard] = useState(new Array(9).fill(' '));
  const moveNumber = useRef(0);
  const result = useRef(2);

  function handler(index){
    var con = map(moveNumber.current);
    setBoard(prevVal => {
      if(prevVal[index] === ' '){
        prevVal[index] = con;
        moveNumber.current = moveNumber.current + 1;
        return [...prevVal];
      }
      return prevVal;
    })
  }
  function map(moveNumber){
    return ((moveNumber % 2) === 0)? 'X': 'O';
  }
  function hasEnded(){
    var symbol;
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 3; j++){
        if(j === 0) symbol = board[presets[i][j]];
        if(board[presets[i][j]] === ' ' || board[presets[i][j]] !== symbol) break;
        if(j === 2) return true;
      }
    }
    return false;
  }
  function reset(){
    moveNumber.current = 0;
    result.current = 2;
    setBoard(new Array(9).fill(' '));
  }

  result.current = hasEnded()? 1: moveNumber.current > 8? 0: 2;

  return (
    <>
      <div className="App">
        <Board boardState={board} handler={handler}/>
      </div>
      {result.current === 2 && <p>Turn: {map(moveNumber.current)}</p>}
      {result.current < 2 && <Result result={result.current} symbol={map(moveNumber.current - 1)} reset={reset}/> }
    </>
  );
}

export default App;
