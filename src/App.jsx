import React, { useState, useEffect, useRef } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const beepAudio = useRef(null);

  useEffect(() => {
    let interval;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timerRunning && timeLeft === 0) {
      beepAudio.current.play();
      setOnBreak(!onBreak);
      setTimeLeft(onBreak ? sessionLength * 60 : breakLength * 60);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, onBreak, breakLength, sessionLength]);

  const handleReset = () => {
    beepAudio.current.pause();
    beepAudio.current.currentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerRunning(false);
    setOnBreak(false);
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const handleStartStop = () => {
    setTimerRunning(!timerRunning);
  };

  const formatTimeLeft = (timeLeft) => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div id="container">
      <div id="timer-container">
        <div id="timer-label">{onBreak ? "Break" : "Session"}</div>
        <div id="time-left">{formatTimeLeft(timeLeft)}</div>
      </div>
      <div id="break-container">
        <div id="break-label">Break Length</div>
        <div id="break-controls">
          <button id="break-decrement" onClick={handleBreakDecrement}>
            -
          </button>
          <div id="break-length">{breakLength}</div>
          <button id="break-increment" onClick={handleBreakIncrement}>
            +
          </button>
        </div>
      </div>
      <div id="session-container">
        <div id="session-label">Session Length</div>
        <div id="session-controls">
          <button id="session-decrement" onClick={handleSessionDecrement}>
            -
          </button>
          <div id="session-length">{sessionLength}</div>
          <button id="session-increment" onClick={handleSessionIncrement}>
            +
          </button>
        </div>
      </div>
      <div id="button-container">
        <button id="start_stop" onClick={handleStartStop}>
          Start/Stop
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio
        id="beep"
        ref={beepAudio}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        type="audio/wav"
      />
    </div>
  );
}

export default App;
