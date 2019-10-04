import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import React from 'react';

import Scrabble from '../Scrabble';

function App() {
  return (
    <div className="App">
      <section id="main-content">
        <Scrabble></Scrabble>
      </section>
    </div>
  );
}

export default App;
