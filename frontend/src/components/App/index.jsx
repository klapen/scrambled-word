import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import React from 'react';

import Scrabble from '../Scrabble';

function App() {
  return (
    <div className="App">
      <section id="main-content">
        <div id="scrabble" className="container-fluid">
          <div id="title" className="row mt-2 justify-content-md-center">
            <div className="col">
              <h1>English spelling exercises</h1>
            </div>
          </div>
          <Scrabble></Scrabble>
        </div>
      </section>
    </div>
  );
}

export default App;
