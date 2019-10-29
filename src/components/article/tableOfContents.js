import React from 'react';
import {Link} from 'react-router-dom'
  
function TableOfContents(props){
    const tableOfContents = props.sections.map((section,index)=>{
      return (
        <li key={index} onClick={()=>scrollToRef(section.ref)}><Link to={section.hash}>{section.subheader}</Link></li>
      )
    })
    return(<ul id="toc">{tableOfContents}</ul> )
  }

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

  export default TableOfContents;