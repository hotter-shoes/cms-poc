import React from 'react';
import HomePage from './pages/homepage';
import Page from './pages/page';

import ArticleSlot from './components/article.slot.js';
import MegaMenuSlot from './components/megamenu.slot.js';
import USPSlot from './components/usp.slot.js';

import { Router, Route,Link ,Switch} from "react-router-dom";

import history from './lib/history';


import './App.css';
function App(){

return(
    <div id="page">
      <Router history={history} onUpdate={hashLinkScroll}>
        <header>
          <Link to={"/"}><img src="https://i1.adis.ws/i/salmonsandbox/logo-full?h=60" alt="Hotter Logo"></img> </Link> 
          <MegaMenuSlot/>
          <USPSlot/>
        </header>
        
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/gb/en/info/returning-goods" exact component={()=><ArticleSlot slotId='669d6fbb-76e6-41a7-a759-c75922621b05'/>}></Route>
          <Route path="/gb/en/info/:title" exact component={Page}></Route>
          <Route path="/gb/en/:title" exact component={Page}></Route>
          <Route path="/:title" exact component={Page}></Route>
        </Switch>
        <footer>
          FOOTER
        </footer>
      </Router>
    </div>
)

}

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    // Push onto callback queue so it runs after the DOM is updated,
    // this is required when navigating from a different page so that
    // the element is rendered on the page before trying to getElementById.
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

export default App;