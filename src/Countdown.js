import React, { Component } from "react";
import "./App.css";

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    workMinutes: 25,
    workSeconds: 0,
    restMinutes: 5,
    countdownStatus: true,
    workOrRest: "Working"
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    //if (this.state.timerOn === false) {
    this.setState({ timerTime: this.state.timerStart });
    //}
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  handleChange(event) {
    if (event.target.name === "work") {
      // alert(event.target.value);
      this.setState({ workMinutes: event.target.value });
      this.adjustTimer("incMinutes", event.target.value);
    } else if (event.target.name === "status-toggle") {
      if (this.state.countdownStatus) {
        this.setState({
          countdownStatus: false,
          workOrRest: "Resting"
          //  workMinutes: this.state.restMinutes
        });
      } else {
        this.setState({
          countdownStatus: true,
          workOrRest: "Working"
          //  workMinutes: this.state.workMinutes
        });
      }
    } else {
      this.setState({ restMinutes: event.target.value });
    }
  }

  adjustTimer = (input, value) => {
    const { timerTime, timerOn } = this.state;
    const max = 216000000;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < max) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < max) {
        //  this.setState({ timerTime: timerTime + 60000 });
        this.setState({ timerTime: value * 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < max) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };

  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    // console.log("timerTime :", timerTime);
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);
    // console.log("minutes :", Math.floor((timerTime / 60000) % 60));
    return (
      <div className="Countdown">
        <div className="container">
          <div className="timer">
            {/* <div id="hand"></div> */}
            <div className="controls">
              <label className="switch" htmlFor="status-toggle">
                <input
                  checked={this.state.countdownStatus}
                  type="checkbox"
                  name="status-toggle"
                  id="status-toggle"
                  onChange={this.handleChange.bind(this)}
                />
                <span className="slider"></span>
              </label>
              <div className="status">
                Status:{" "}
                <span name="workOrRest" id="status">
                  {this.state.workOrRest}
                </span>
              </div>
              <div className="time">
                <div id="minutes">{minutes}</div>
                <div id="seconds">{seconds}</div>
              </div>

              <div className="buttons">
                {timerOn === false &&
                  (timerStart === 0 || timerTime === timerStart) && (
                    <button
                      aria-label="play"
                      id="play"
                      onClick={this.startTimer}
                    >
                      <i className="fa fa-play-circle" aria-hidden="true"></i>
                    </button>
                  )}
                {timerOn === false &&
                  timerStart !== 0 &&
                  timerStart !== timerTime &&
                  timerTime !== 0 && (
                    <button
                      aria-label="pause"
                      id="resume"
                      onClick={this.stopTimer}
                    >
                      <i className="fa fa-pause-circle" aria-hidden="true"></i>
                    </button>
                  )}
              </div>
              <div className="buttons">
                {timerOn === true && timerTime >= 100 && (
                  <button aria-label="stop" id="stop" onClick={this.resetTimer}>
                    <i className="fa fa-stop" aria-hidden="true"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="inputs">
            <div className="input-group">
              <label htmlFor="work-minutes">Minutes of Work</label>
              <input
                type="number"
                name="work"
                id="work-minutes"
                value={this.state.workMinutes}
                onChange={this.handleChange.bind(this)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="rest-minutes">Minutes of Rest</label>
              <input
                type="number"
                name="rest"
                id="rest-minutes"
                value={this.state.restMinutes}
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Countdown;
