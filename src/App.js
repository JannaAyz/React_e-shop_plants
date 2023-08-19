import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomeHeader from './Home';
import Plants from './PlantsPresentation';
import {Routes, Route} from "react-router-dom";
// import {Link} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeHeader/>} />
        <Route path="/HomeHeader" element={<HomeHeader />} />
        <Route path="/Plants/:switchSearchData/:searchText/:specificPlant" element={<Plants />} />
        {/* <Route path="/Plants/*" element={<Plants />} /> */}
      </Routes>
      {/* <Link to="/Plants">VoirPlantes</Link> */}
      {/* <Link to="/HomeHeader">VoirHome</Link> */}
      {/* <HomeHeader /> */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
