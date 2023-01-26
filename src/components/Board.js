import React from 'react'

export default function Board({boardState, handler}) {
    // console.log("this is what you think it is" + boardState);
    return (
    <>
        {boardState.map((value, index) =>{
            return <button className='cell' key={index} onClick={() => handler(index)}> {value} </button>;
        })}
    </>
    )
    }
