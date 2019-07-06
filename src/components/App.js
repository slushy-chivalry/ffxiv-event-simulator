import React, { useState } from 'react';

import { simulate, SKILLS } from '../simulator';
import './App.scss';

function App() {
  // simulation duration (in seconds)
  const [duration, setDuration] = useState("10");
  const [log, setLog] = useState([]);
  return (
    <div className="App">
      <h1>FFXIV Event Simulator</h1>
      <p>
        This repo contains a work-in-progress version of a discrete event simulator that allows you to simulate
        combo attacks, figure out the best rotations, calculate average potency, and much more.
      </p>
      <p>
        The current (hacky) version has a demo for dancer with 4 skills (Cascade, Fountain, Reverse Cascade, and Fountainfall)
        that can simulate combo events and procs.
      </p>
      <p>
        Please let me know if you're interested in contributing!
      </p>
      <a href="https://slushy-chivalry.github.io/ffxiv-event-simulator">Github</a>
      <label>
        <span>Simulation duration:</span>
        <input type="number" min="0" value={duration} onChange={e => setDuration(e.target.value)} />
      </label>
      <button onClick={() => setLog(simulate(Number(duration), '1'))}>Simulate</button>
      <h2>Action log</h2>
      <ul className="log">
        {log.map(([t, actionId], i) => (
          <li key={i} className="entry">
            <p><span className="time">{t.toFixed(2)}s</span><span className="dmg">{SKILLS[actionId].effect.potency} potency</span><span className="label">{SKILLS[actionId].name}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
