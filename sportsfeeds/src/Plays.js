import React from "react";

import "./plays.css";

const Gamelog = props => {
  return (
    <>
      <th scope="row">{props.counter}</th>
      <td>{props.batterName}</td>
      <td>{props.batterLR}</td>
      <td>{props.batterId}</td>
      <td>{props.pitcherName}</td>
      <td>{props.pitcherLR}</td>
      <td>{props.pitcherId}</td>

      <td
        style={{
          backgroundColor: props.result === "*** NO PLAY ***" ? "red" : "none"
        }}
      >
        {" "}
        {props.result}{" "}
      </td>
    </>
  );
};

export default Gamelog;
