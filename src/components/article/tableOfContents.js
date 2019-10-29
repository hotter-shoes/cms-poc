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

  const scrollToRef = (ref) => window.scrollTo({
    top: ref.current.offsetTop,
    left: 0,
    behavior: 'smooth'
  })  

  export default TableOfContents;