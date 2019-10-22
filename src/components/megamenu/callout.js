import React from 'react';

import {Link} from 'react-router-dom';

function Callout(props){

    const defaultProps = {
        "links": [{
            "text": "Missing Links",
            "url": "#"
        }]
    }

    const links = props.links || defaultProps.links

    const linkList = links.map((link,index)=>{
        return(
            <Link key={index} to={link.url || '#'} onClick={()=>props.closeMenu()}>
                {link.text || 'Missing Link Text'}
            </Link>
        )
    });

    return(
        <section className="mm-callout">
            {linkList}
        </section>
    )
}

export default Callout;