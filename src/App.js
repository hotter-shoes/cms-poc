import React from 'react';
import HomePage from './pages/homepage';
import Page from './pages/page';

import AmplienceSlot from './components/amplienceSlot';
import Article from './components/article/article.js';
import MegaMenu from './components/megamenu/megamenu.js';
import USP from './components/USP/usp.js';

import { Router, Route,Link ,Switch} from "react-router-dom";

import history from './lib/history';


import './App.css';
function App(){

return(
    <div id="page">
      <Router history={history} onUpdate={hashLinkScroll}>
        <header>
          <Link to={"/"}><img src="https://i1.adis.ws/i/salmonsandbox/logo-full?h=60" alt="Hotter Logo"></img> </Link> 
          <AmplienceSlot contentToRender={MegaMenu} slotId='4fddb07e-1b7d-435c-9b9b-511a6a5360de' slotType='https://www.megamenu'/>
          <AmplienceSlot contentToRender={USP} slotId='38a1a157-8d87-4f4b-b301-11f7a472c216' slotType='https://header.usp.slot'/>
        </header>
        
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/gb/en/info/returning-goods" exact component={()=><AmplienceSlot contentToRender={Article} slotId='669d6fbb-76e6-41a7-a759-c75922621b05' slotType='https://article.slot'/>}></Route>
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