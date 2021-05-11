// React Imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Component Imports
import NavBar from './components/navbar.js';

// Views Imports 
import Homepage from './components/homepage.js';

// CSS
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className = "header">
          <NavBar/>
        </div>
        <div className = "container">
          <Switch>
            <Route path = "/" exact component = {Homepage}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Apollo Music x Ethereum
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

