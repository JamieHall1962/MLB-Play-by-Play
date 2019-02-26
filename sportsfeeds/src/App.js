import React, { Component } from "react";
import Table from "react-bootstrap/Table";

import Gamelog from "./Plays";

class App extends Component {
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

onSort (e, sortKey) {
  const data = this.state.batterName;
  data.sort((a,b)=> a[sortKey].localCompare(b[sortKey]));
  this.setState({data});
}



  componentDidMount() {
    const MLBApi = require("node-mlb-api");
    let tb = 0;
    const tempResults = [];
    const tempBatterId = [];
    const tempBatterName = [];
    const tempBatterLR = [];
    const tempPitcherId = [];
    const tempPitcherName = [];
    const tempPitcherLR = [];

    for (let y = 531053; y < 531057; y++) {
      //console.log(y);
      MLBApi.getGameFeed(`${y}`)
        .then(result => {
          const games = result.liveData.plays.allPlays;
          // console.log(games);
          for (let x = 0; x < games.length; x++) {
            tempBatterName.push(games[x].matchup.batter.fullName);
            tempBatterLR.push(games[x].matchup.batSide.code);
            tempBatterId.push(games[x].matchup.batter.id);
            tempPitcherName.push(games[x].matchup.pitcher.fullName);
            tempPitcherLR.push(games[x].matchup.pitchHand.code);
            tempPitcherId.push(games[x].matchup.pitcher.id);
            tempResults.push(games[x].result.event);

            // console.log(games[x].result.event.toLowerCase());
            if (games[x].result.event.toLowerCase() === "single") tb = tb + 1;
            if (games[x].result.event.toLowerCase() === "double") tb = tb + 2;
            if (games[x].result.event.toLowerCase() === "triple") tb = tb + 3;
            if (games[x].result.event.toLowerCase() === "home run") tb = tb + 4;
          }
          //console.log("TR Length:  ", tempResults.length);

          // // mysportsfeed stuff
          // const gameId='20180608-kc-oak';
          //     const requestOptions = {
          //       headers: {
          //         Authorization:
          //           "Basic " + btoa(`a9e283b4-6f81-46f7-b2e8-6bd635:MYSPORTSFEEDS`)
          //       }
          //     };
          //     axios
          //       .get(
          //         `https://api.mysportsfeeds.com/v2.0/pull/mlb/2018-regular/games/${gameId}/playbyplay.json`,
          //         requestOptions
          //       )

          //       .then(res => {
          // // end mysportsfeedstuff

          this.setState({
            results: tempResults,
            batterId: tempBatterId,
            batterName: tempBatterName,
            batterLR: tempBatterLR,
            pitcherId: tempPitcherId,
            pitcherName: tempPitcherName,
            pitcherLR: tempPitcherLR
          });
          console.log("Total Bases:  ", tb);
          //console.log("Total Nasty:  ", totalNasty);
        })

        .catch(err => console.log(err));
    } // next y
  }

  render() {
    return (
      <>
        <Table hover striped size="sm">
          <thead>
            <tr>
              <th>PA #</th>
              <th onClick={e => this.onSort(e, 'batterName')}>Batter</th>
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

export default App;
