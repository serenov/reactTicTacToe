import React from 'react'
export default function Board({boardState, handler, activeCell}) {
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
