// React Imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Component Imports
import GridNavBar from './components/gridnavbar.js';
import Sidebar from './components/sidebar.js';

// Views Imports
import Homepage from './views/homepage.js';
import Metamask from './views/metamask.js';
import CreateSC from './views/createSC.js';
import ConfirmSC from './views/confirmSC.js';
import DetailSC from './views/detailSC.js';
import ShareSC from './views/shareSC.js';
import InviteSC from './views/inviteSC.js';
import Contracts from './views/contracts.js';

// CSS
import "./css/general.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <GridNavBar/>
        <Sidebar/>
        <div className = "content-wrapper">
          <Switch>
            <Route path = "/" exact component = {Homepage}/>
            <Route path = "/metamask" exact component = {Metamask}/>
            <Route path = "/create" exact component = {CreateSC}/>
            <Route path = "/confirm" exact component = {ConfirmSC}/>
            <Route path = "/contractDetail" exact component = {DetailSC}/>
            <Route path = "/success" exact component = {ShareSC}/>
            <Route path = "/invite/:id" component = {InviteSC}/>
            <Route path = "/contracts" exact component = {Contracts}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Apollo Music x Ethereum
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
