
import React from 'react';

import TableOfContents from './tableOfContents';
import ArticleSections from './articleSections';
import history from '../../lib/history';
    
function Article(props){

    props.sections.forEach(section=>{section.ref = React.createRef()})

    return(
    <div id="article">
      <h1>{props.title}</h1>
      <TableOfContents {...props}/>
      <div  onClick={(event)=>handleClick(event)}>
      <ArticleSections {...props}/>
      </div>
    </div>
    )
}

  
function handleClick(e) {
  if (e.target.nodeName == "A") {
    e.preventDefault();
    console.log("markdown link click")
    if (e.target.href) {
      const url = new URL(e.target.href);
      //if it is an internal link, push to history so page doesnt refresh
      if (url.hostname.indexOf(".hotter.com") > -1 || url.hostname === "localhost") {
        history.push(e.target.pathname);
      } else {
        //otherwise open new tab
        window.open(url.href, "_blank")
      }
    }
  }
}

export default Article