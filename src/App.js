import React from 'react';
import HomePage from './pages/homepage';
import Page from './pages/page';

import MegaMenuSlot from './components/megamenu.slot.js';

import {Router, Route,Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import './App.css';

const customHistory = createBrowserHistory();
function App(){

return(
    <div id="page">
      <Router history={customHistory}>
        <header>
          <Link to={"/"}><img src="https://i1.adis.ws/i/salmonsandbox/logo-full?h=60" alt="Hotter Logo"></img> </Link> <MegaMenuSlot customHistory={customHistory}/>
        </header>
        
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/gb/en/:title" component={Page}></Route>
        <Route path="/:title" exact component={Page}></Route>

        <footer>
          FOOTER
        </footer>
      </Router>
    </div>
)

}

export default App;