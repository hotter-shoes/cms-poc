
import React from 'react';

import TableOfContents from './tableOfContents';
import ArticleSections from './articleSections';
import history from '../../lib/history';

import './article.css'
    
function Article(props){

  if(typeof props.article === "undefined"){
    console.error("Incorrect data sent to Article",props);
    return false;
}

    //assign each section its own reference, this enables Table of Content scrolling and Scroll on Load
    props.article.sections.forEach(section=>{section.ref = React.createRef()})
    return(
    <div id="article">
      <TableOfContents {...props.article}/>
      <div  id="contents" onClick={(event)=>handleClick(event)}>
        <h1>{props.article.title}</h1>
        <ArticleSections {...props.article}/>
      </div>
    </div>
    )
}

  
//Intercepts <a> tags from markup and handles the way they resolve in react
//Internal links will update history (so they don't refresh the page)
//External links open new tabs
function handleClick(e) {
  if (e.target.nodeName === "A") {
    e.preventDefault();
    console.log("markdown link click")
    if (e.target.href) {
      const url = new URL(e.target.href);
      //if it is an internal link, push to history so page doesnt refresh
      if (url.hostname.indexOf(".hotter.com") > -1 || url.hostname === "localhost" || url.hostname.indexOf("hotter-amplience-poc.herokuapp.com") > -1) {
        history.push(e.target.pathname);
      } else {
        //otherwise open new tab
        window.open(url.href, "_blank")
      }
    }
  }
}

export default Article