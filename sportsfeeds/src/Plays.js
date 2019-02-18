import React from "react";

import "./plays.css";

const Gamelog = props => {
  return (
    <>
      
          {/* <Card
            className="shadow"
            style={{ marginBottom: "1rem", borderRadius: "12" }}
          >
            <CardBody>
              <CardTitle>
                <h5> {props.result}</h5>{" "}
              </CardTitle>

              <CardSubtitle>
                {" "}
                {`${props.batterName} (${props.batterLR})`}{" "}
              </CardSubtitle>
            </CardBody>

            <CardFooter style={{ color: "#5A6169", marginBottom: "1rem" }}>
              {`${props.pitcherName} (${props.pitcherLR}) ${props.counter}`}{" "}
            </CardFooter>
          </Card> */}

<th scope="row">{props.counter}</th>
            <td>{props.batterName}</td>
            <td>{props.batterLR}</td>
            <td>{props.batterId}</td>
            <td>{props.pitcherName}</td>
            <td>{props.pitcherLR}</td>
            <td>{props.pitcherId}</td>
            
            <td style={{ backgroundColor: props.result === '*** NO PLAY ***' ? 'red': 'none'}}> {props.result} </td>
          
           
       
    </>
  );
};

export default Gamelog;
