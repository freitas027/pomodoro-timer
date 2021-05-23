//import React, {useState} from 'react';
'use strict';


const e = React.createElement;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        timeLeft: 25*60,
        currentTime: Date.now(),
        running: false,
        // Pomodoro state can be p (pomodoro), s(short break), l (long break)
        pomodoroState: "p",
        pomodoroCounter: 0,
    }
    setTheme('theme-pomodoro');
    ;
    this.timer = this.timer.bind(this)
    //let intervalId = setInterval(this.timer, 1000)
  }
  timer (){
      if(this.state.running){  
        let now = Date.now();
        let diff = (now - this.state.currentTime)/1000;
        let timeLeft = this.state.timeLeft-diff;
        if (timeLeft<=0){
            this.runOut();
        }else {
            this.setState({timeLeft: timeLeft, currentTime: Date.now()});
        }
        
      }
  }

  runOut(){
        if (this.state.pomodoroState === 'p'){
            let counter = this.state.pomodoroCounter +1;
            if (counter < 4){
                alert("Time for a short break!")
                this.setPomodoroState('s');
                this.setState({pomodoroCounter: counter});
            }else{
                alert("Time for a long break!")
                this.setPomodoroState('l');
                this.setState({pomodoroCounter: 0});
            }
        } else {
            alert("Time to get to work!")
            this.setPomodoroState('p');
        }
  }
  formatTimer (){
    let minutes = localeTwoDigits(Math.floor(this.state.timeLeft/60));
    let seconds = localeTwoDigits(Math.floor(this.state.timeLeft %60));
    return `${minutes}:${seconds}`;
  }

  startStop(){
    if (!this.state.running){
        this.intervalId = setInterval(this.timer, 50);
    }else{
        clearInterval(this.intervalId);
    }
    this.setState({running: !this.state.running, currentTime: Date.now()});
  }

  getPomodoroClassName(pomodoroState){
    if (this.state.pomodoroState === pomodoroState){
        return "small-button small-button-selected"
    }
    else{
        return "small-button"
    }
  }
  setPomodoroState(state){
      if (state ==="p" && this.state.pomodoroState !== 'p'){
        this.setState({pomodoroState: state, timeLeft: 25*60, running: false});
        setTheme('theme-pomodoro');
      }
      else if (state === 's' && this.state.pomodoroState !== 's'){
        this.setState({pomodoroState: state, timeLeft: 5*60, running: false});
        setTheme('theme-short-break');
      }
      else if (state === 'l' && this.state.pomodoroState !== 'l'){
        this.setState({pomodoroState: state, timeLeft: 15*60, running: false});
        setTheme('theme-long-break');
      }
        
  }
  render() {
    return (
        <div className="box">
                <div className="flex-row">
                    <button className={this.getPomodoroClassName('p')} onClick={() => this.setPomodoroState('p')}>Pomodoro</button>
                    <button className={this.getPomodoroClassName('s')} onClick={() => this.setPomodoroState('s')}>Short Break</button>
                    <button className={this.getPomodoroClassName('l')} onClick={() => this.setPomodoroState('l')}>Long Break</button>
                </div>
                <div className="flex-column timer">{this.formatTimer()}</div>
            <div id="buttons" className="flex-row">
                <div className="box">
                    <button onClick={() => this.startStop()}>{this.state.running? "Stop": "Start"}</button>
                </div>
            </div>
        </div>
        
            );
  }
}

function localeTwoDigits (number){
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
}

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}


const domContainer = document.querySelector('#timer');
ReactDOM.render(e(Timer), domContainer);

