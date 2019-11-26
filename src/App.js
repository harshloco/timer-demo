import React, { Component } from "react";
import Countdown from "./Countdown";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-title">Countdown Demo</div>
        <div className="Timers">
          <Countdown />
        </div>
      </div>
    );
  }
}
export default App;
