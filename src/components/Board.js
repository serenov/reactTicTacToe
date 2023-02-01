import React from 'react'
export default function Board({boardState, handler, activeCell}) {
    // console.log("this is what you think it is" + boardState);
    console.log(activeCell);
    return (
    <>
        {boardState.map((value, index) =>{
            return (
                <button className="cell" key={index} onClick={() => handler(index)}>
                    {activeCell === index && <p className= "active">{value}</p>}
                    {activeCell !== index && <>{value}</>}
                </button>
            );
            
        })}
    </>
    )
    }
