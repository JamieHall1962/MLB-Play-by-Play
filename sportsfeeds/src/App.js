import React, { Component } from "react";

import "./App.css";
import axios from "axios";
import Gamelog from "./Plays"; // This is because I eventually intend to send down the data to a presentational component

class App extends Component {
  constructor() {
    super();
    this.state = {
      pBp: {}, // originally had all data going here
      results: [], // later tried breaking it down into individual arrays
      batterId: [],
      batterName: [],
      BatterLR: [],
      pitcherId: [],
      pitcherName: [],
      pitcherLR: []
    };
  }

  componentDidMount() {
    const requestOptions = {
      headers: {
        Authorization:
          "Basic " + btoa(`a9e283b4-6f81-46f7-b2e8-6bd635:MYSPORTSFEEDS`) // had this in an .env file but hard coded it in in case you need to look for yourself
      }
    };
    axios
      .get(
        "https://api.mysportsfeeds.com/v2.0/pull/mlb/2018-regular/games/20180514-CLE-DET/playbyplay.json",
        requestOptions
      )

      .then(res => {
        this.setState({ pBp: res.data }); // leftover from having all data in the pBp object in state. A console.log here shows all data

        const allData = res.data; // as does this

        const tempResults = []; // this little section breaks out data into individual arrays. I deleted all but two because that will give you an idea and the other 5 arrays are the same idea
        const tempBatterId = [];
        for (let x = 0; x < allData.atBats.length; x++) {
          tempResults.push(allData.atBats[x].atBatPlay[0].batterUp.result);
          tempBatterId.push(
            allData.atBats[x].atBatPlay[0].batterUp.battingPlayer.id
          );
        }
        this.setState({
          // sets state with an object of arrays. Yet another failed attempt
          pBp: {
            ...this.state.pBp,
            results: tempResults,
            batterId: tempBatterId
          }
        });
        console.log(
          // returns arrays with expected results. Or maybe I'm reading them wrong. Could be.
          "State holds: ",
          this.state.pBp.results,
          this.state.pBp.batterId
        );
        console.log("Object values:  ", Object.values(this.state.pBp.results)); // part of an attempt to use objects. Works here. Fails in rendering
      })
      .catch(err => console.log(err));
  }

  render() {
    this.state.pBp.atBats && console.log("Hello", this.state.pBp.atBats); // returns an array

    // this next section renders the data that I need. It works, which shows I can get to the needed data. But I need to find a way to map over it because there are a variable number of at-bats in any given game. This particular at bat was #18 of 75. If you change let ab=18 to another number <=75 you will see other at-bats from this random game from last May

    let ab = 26;
    return (
      <div>
        <p>
          {`Result:      `}
          {this.state.pBp.atBats &&
            this.state.pBp.atBats[ab].atBatPlay[0].batterUp.result}
        </p>
        <p>
          {`Batter (L/R): `}
          {this.state.pBp.atBats &&
            this.state.pBp.atBats[ab].atBatPlay[0].batterUp.standingLeftOrRight}
        </p>
        <p>
          {`Batter ID: `}
          {this.state.pBp.atBats &&
            this.state.pBp.atBats[ab].atBatPlay[0].batterUp.battingPlayer.id}
        </p>
        <p>
          {`Batter Name: `}
          {`${this.state.pBp.atBats &&
            this.state.pBp.atBats[ab].atBatPlay[0].batterUp.battingPlayer
              .firstName} 
             ${this.state.pBp.atBats &&
               this.state.pBp.atBats[ab].atBatPlay[0].batterUp.battingPlayer
                 .lastName}`}
        </p>
        <p>
          {`Pitcher ID: `}
          {this.state.pBp.atBats &&
            this.state.pBp.atBats[ab].atBatPlay[1].pitch.pitchingPlayer.id}
        </p>
        <p>
          {`Pitcher Name: `}
          {` ${this.state.pBp.atBats &&
            this.state.pBp.atBats[ab].atBatPlay[1].pitch.pitchingPlayer
              .firstName} 
            ${this.state.pBp.atBats &&
              this.state.pBp.atBats[ab].atBatPlay[1].pitch.pitchingPlayer
                .lastName}`}
        </p>
        <p>
          {`Pitcher (L/R): `}
          {this.state.pBp.atBats &&
            this.state.pBp.atBats[ab].atBatPlay[1].pitch.throwingLeftOrRight}
        </p>

        {/* end of section breaking out one at-bat. 
        
        Here is where the map function needs to come into play. The map attempt here fails miserably and I have tried literally hundreds of permutations including mapping Object.values and Object.keys. The 'this.state.pBp.atBats && ' is there because before I added it, the program was trying to render before the data was ready. If you comment out the next little section (before the </div>) you will see an individual at-bat rendered, otherwise an error will be generated. This one will give 'Uncaught TypeError: Cannot read property 'map' of undefined' but other attempts have given different errors */}

        {/* {this.state.pBp.atBats &&
          this.state.results.map((ab, i) => {
            <Gamelog key={i} results={ab} />;
          })} */}
      </div>
    );
  }
}

export default App;
