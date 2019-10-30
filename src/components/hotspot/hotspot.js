import React from 'react';

import {Link} from 'react-router-dom';

import {getImageURL,getImageOptionsParams} from '../../lib/amplience.helper';




/*TODO Need to change the default props to provide a 404 image placeholder*/
import image404 from '../defaults/404image';

function Hotspot(props){

    /*Amplience dynamic image parameters*/
    const imageOptions = {
        w:1350,
        qlt:80,
        sm:'aspect',
        aspect:'3:2',
        scaleFit:'poi',
        poi:'{$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}'
    }
    /*uses helper functions to generate the amplience image request url*/
    const imageParams = getImageOptionsParams(imageOptions);
    const imageUrl = getImageURL(props.image || image404)
    const backgroundImageStyle = {backgroundImage:`url(${imageUrl}${imageParams})`}

    const hotspotText = props.text || {'headline':'Missing Headline!','subtext':'Missing Subtext!'}
    const hotspotLink = props.link || {'text':'Missing Link!','url':'#'}
   
    return(       
            <Link className="hotspot" to={hotspotLink.url}>
                <div className="background-image" style={backgroundImageStyle}></div>
                <div className="text">
                        <p className="headline">{hotspotText.headline}</p>
                        <p className="subtext">{hotspotText.subtext}</p>
                    <p className="cta">{hotspotLink.text}</p>
                </div>
            </Link>
    )
}

export default Hotspot