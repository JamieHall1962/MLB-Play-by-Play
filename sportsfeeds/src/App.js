import React, { Component } from "react";
import  Table from "react-bootstrap/Table";

import "./App.css";
import axios from "axios";
import Gamelog from "./Plays";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pBp: {},
      results: [],
      batterId: [],
      batterName: [],
      batterLR: [],
      pitcherId: [],
      pitcherName: [],
      pitcherLR: []
    };
  }
  // 2018/10/01/milmlb-chnmlb-1R
  componentDidMount() {
    const gameId = "20180608-kc-oak"
    
    const requestOptions = {
      headers: {
        Authorization:
          "Basic " + btoa(`a9e283b4-6f81-46f7-b2e8-6bd635:MYSPORTSFEEDS`)
      }
    };
    axios
      .get(
        `https://api.mysportsfeeds.com/v2.0/pull/mlb/2018-regular/games/${gameId}/playbyplay.json`,
        requestOptions
      )

      .then(res => {
        this.setState({ pBp: res.data });

        const allData = res.data;
        console.log(allData);

        const tempResults = [];
        const tempBatterId = [];
        const tempBatterName = [];
        const tempBatterLR = [];
        const tempPitcherId = [];
        const tempPitcherName = [];
        const tempPitcherLR = [];

        for (let x = 0; x < allData.atBats.length; x++) {
          allData.atBats[x].atBatPlay[0].batterUp.result !== null
            ? tempResults.push(allData.atBats[x].atBatPlay[0].batterUp.result)
            : tempResults.push("*** NO PLAY ***");
          tempBatterId.push(
            allData.atBats[x].atBatPlay[0].batterUp.battingPlayer.id
          );

          tempBatterName.push(
            `${
              allData.atBats[x].atBatPlay[0].batterUp.battingPlayer.firstName
            } ${allData.atBats[x].atBatPlay[0].batterUp.battingPlayer.lastName}`
          );

          tempBatterLR.push(
            allData.atBats[x].atBatPlay[0].batterUp.standingLeftOrRight
          );

          for (let y = 0; y < allData.atBats[x].atBatPlay.length; y++) {
            try {
              tempPitcherLR.push(
                allData.atBats[x].atBatPlay[y + 1].pitch.throwingLeftOrRight
              );
              tempPitcherId.push(
                allData.atBats[x].atBatPlay[y + 1].pitch.pitchingPlayer.id
              );
              tempPitcherName.push(
                `${
                  allData.atBats[x].atBatPlay[y + 1].pitch.pitchingPlayer
                    .firstName
                } ${
                  allData.atBats[x].atBatPlay[y + 1].pitch.pitchingPlayer
                    .lastName
                }`
              );
              console.log("X before break ", x, tempPitcherLR[x]);
              break;
            } catch (err) {
              if (y + 1 === allData.atBats[x].atBatPlay.length) {
                tempPitcherLR.push("IRR");
                tempPitcherId.push(0);
                tempPitcherName.push("IRRELEVANT");
              } else {
                continue;
              }
            } finally {
              console.log("X in finally  ", x, tempPitcherLR[x]);
            }
          }
        }
        this.setState({
          results: tempResults,
          batterId: tempBatterId,
          batterName: tempBatterName,
          batterLR: tempBatterLR,
          pitcherId: tempPitcherId,
          pitcherName: tempPitcherName,
          pitcherLR: tempPitcherLR
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    // let ab = 26; used to test a single at-bat
    return (
      // <div>
      //   <p>
      //     {`Result:      `}
      //     {this.state.pBp.atBats &&
      //       this.state.pBp.atBats[ab].atBatPlay[0].batterUp.result}
      //   </p>
      //   <p>
      //     {`Batter (L/R): `}
      //     {this.state.pBp.atBats &&
      //       this.state.pBp.atBats[ab].atBatPlay[0].batterUp.standingLeftOrRight}
      //   </p>
      //   <p>
      //     {`Batter ID: `}
      //     {this.state.pBp.atBats &&
      //       this.state.pBp.atBats[ab].atBatPlay[0].batterUp.battingPlayer.id}
      //   </p>
      //   <p>
      //     {`Batter Name: `}
      //     {`${this.state.pBp.atBats &&
      //       this.state.pBp.atBats[ab].atBatPlay[0].batterUp.battingPlayer
      //         .firstName}
      //        ${this.state.pBp.atBats &&
      //          this.state.pBp.atBats[ab].atBatPlay[0].batterUp.battingPlayer
      //            .lastName}`}
      //   </p>
      //   <p>
      //     {`Pitcher ID: `}
      //     {this.state.pBp.atBats &&
      //       this.state.pBp.atBats[ab].atBatPlay[1].pitch.pitchingPlayer.id}
      //   </p>
      //   <p>
      //     {`Pitcher Name: `}
      //     {` ${this.state.pBp.atBats &&
      //       this.state.pBp.atBats[ab].atBatPlay[1].pitch.pitchingPlayer
      //         .firstName}
      //       ${this.state.pBp.atBats &&
      //         this.state.pBp.atBats[ab].atBatPlay[1].pitch.pitchingPlayer
      //           .lastName}`}
      //   </p>
      //   <p>
      //     {`Pitcher (L/R): `}
      //     {this.state.pBp.atBats &&
      //       this.state.pBp.atBats[ab].atBatPlay[1].pitch.throwingLeftOrRight}
      //   </p>

      <>
        {/* <Container className="mt-5 pt-5"> */}
        {/* <Row className="card-columns"> */}

        <Table hover striped size="sm">
          <thead>
            <tr>
              <th>PA #</th>
              <th>Batter</th>
              <th>(L/R)</th>
              <th>Batter Id</th>
              <th>Pitcher</th>
              <th>(L/R)</th>
              <th>Pitcher Id</th>
              <th>Result</th>
            </tr>
          </thead>

          {this.state.pBp.atBats &&
            this.state.results.map((ab, i) => (
              // <Col key={i} xs="3" style={{ marginBottom: "1rem" }}>
              <tbody key={i}>
                <tr>
                  <Gamelog
                    key={i}
                    counter={i}
                    result={ab}
                    batterId={this.state.batterId[i]}
                    batterName={this.state.batterName[i]}
                    batterLR={this.state.batterLR[i]}
                    pitcherId={this.state.pitcherId[i]}
                    pitcherName={this.state.pitcherName[i]}
                    pitcherLR={this.state.pitcherLR[i]}
                  />
                  {/* </Col> */}
                </tr>
              </tbody>
            ))}
        </Table>
        {/* </Row> */}
        {/* </Container> */}
      </>
    );
  }
}

export default App;
