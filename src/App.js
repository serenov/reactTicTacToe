import './App.css';
import React, {useState, useRef, useEffect} from 'react';
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
  const copyBoard = useRef([...board]);
  const activeCell = useRef();

  function handler(index){
    const con = map(moveNumber.current);
    setBoard(prevVal => {
      if(prevVal[index] === ' '){
        activeCell.current = index;
        prevVal[index] = con;
        copyBoard.current[index] = con;
        moveNumber.current = moveNumber.current + 1;
        return [...prevVal];
      }
      return prevVal;
    });
  }
  function map(moveNumber){
    return ((moveNumber % 2) === 0)? 'X': 'O';
  }
  function hasEnded(board){
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
    copyBoard.current.fill(' ');
    setBoard(new Array(9).fill(' '));
  }
  function comp(turn = 1, movecnt = moveNumber.current){

    if(hasEnded(copyBoard.current)) return (movecnt % 2 === 0)? -1: 1;
    if(movecnt > 8) return 0;

    var evalulation = turn * -1;
    var tempEval;
    if(movecnt === moveNumber.current) {var index; 
      // console.log(copyBoard.current);
    }

    for(var i = 0; i < 9; i++){
      if(copyBoard.current[i] === ' '){
        copyBoard.current[i] = map(movecnt);
        tempEval = comp(-1 * turn, movecnt + 1);
        if(tempEval * turn >= evalulation * turn){
          evalulation = tempEval;
          if(movecnt === moveNumber.current){
            index = i;
            if(evalulation === turn) break;
          }
        }
        copyBoard.current[i] = ' ';
      }
    }
    if(movecnt === moveNumber.current) return index;
    else return evalulation;
  }

  useEffect(() => {
    if(moveNumber.current % 2 === 1)
    setTimeout(() => handler(comp(-1)), 210);
    // console.log(activeCell.current)
  })

  result.current = hasEnded(board)? 1: moveNumber.current > 8? 0: 2
  return (
    <>
      <div className="App">
        {/* <Button/> */}
        <Board boardState={board} handler={handler} activeCell={activeCell.current}/>

      </div>
      {result.current === 2 && <p>Turn: {map(moveNumber.current)}</p>}
      {result.current < 2 && <Result result={result.current} symbol={map(moveNumber.current - 1)} reset={reset}/> }
    </>
  );
}

export default App;
