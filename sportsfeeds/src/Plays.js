import React from "react";

const Gamelog = props => {
    
    console.log("Got here", {props})
    return (
        <>
        
    <h5>{props.result}</h5>
  {/*   <h5>{props.batterId}</h5>
    <h5>{props.gotHere}</h5> */}
    </>
    )
}

export default Gamelog;