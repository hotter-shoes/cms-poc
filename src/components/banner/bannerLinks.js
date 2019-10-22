import React from 'react'

function BannerLinks(props){

    const links = props.links.map((link,index)=>{
        const linkStyle = {backgroundColor:link.backgroundColour,color:link.textColour}
        return(<a key={index} href={link.link} style={linkStyle}>{link.text} </a> )
  
    })
        return (
            <div className="banner-links-container">
            <div className="banner-links">
            {links}
            </div>
            </div>
           
        )
    }

 export default BannerLinks;