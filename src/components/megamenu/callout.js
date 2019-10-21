import React from 'react';

import {Link} from 'react-router-dom';

import get from 'lodash.get';

function Callout(props){

    const defaultProps = {
        "links": [{
                "text": "Link 1",
                "url": "#1"
            },
            {
                "text": "Link 2",
                "url": "#2"
            }, {
                "text": "Link 3",
                "url": "#3"
            }
        ]
    }

    const links = get(props,'links',defaultProps.links);

    const linkList = links.map((link,index)=><Link key={index} to={link.url} onClick={()=>props.closeMenu()}>{link.text}</Link>);

    return(<section className="mm-callout">
        {linkList}
    </section>
    )
}

export default Callout;