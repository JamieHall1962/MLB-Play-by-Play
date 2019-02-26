import React, { Component } from "react";
import Table from "react-bootstrap/Table";

import axios from "axios";
import Gamelog from "./Plays";

class CleanData extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    const Mlbplayers = require('mlbplays');

    const options = {
      path: 'year_2018/month_06/day_08/'
    };
    
    const mlbplayers = new Mlbplayers(options);
    mlbplayers.get((err, players) => {
    console.log("MLB PLAYERS:  ",mlbplayers);
      //... do something
    });


//console.log("Props:  ", this.state.props);

  //  const gameId = {props.gId};
  const gameId='20180608-kc-oak';
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
        const allData = res.data;
        console.log(allData);

        const tempResults = [];
        const tempBatterId = [];
        const tempBatterName = [];
        const tempBatterLR = [];
        const tempPitcherId = [];
        const tempPitcherName = [];
        const tempPitcherLR = [];
        let tempStr='';

        for (let x = 0; x < allData.atBats.length; x++) {
          tempStr=JSON.stringify(allData.atBats[x]); //search for events not listed (errors, intentional walks, stolen bases, caught stealing, etc.)
          console.log(tempStr.includes("isError: false"));
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
              //console.log("X in finally  ", x, tempPitcherLR[x]);
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
    return (
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

          {this.state.results.map((ab, i) => (
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
              </tr>
            </tbody>
          ))}
        </Table>
      </>
    );
  }
}

export default CleanData;
