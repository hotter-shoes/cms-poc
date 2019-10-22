import React from 'react';

import {Link} from 'react-router-dom';
import BannerLinks from './bannerLinks';

import {getImageURL,getImageOptionsParams} from '../../lib/amplience.helper';

function DefaultBanner(props){
    const imageConf = props.bannerImage
    /*Amplience dynamic image parameters*/
    const imageOptions = {
        w:1350,
        qlt:80
    }
    /*uses helper functions to generate the amplience image request url*/
    const imageParams = getImageOptionsParams(imageOptions);
    const imageUrl = getImageURL(imageConf)
    const backgroundImageStyle = {backgroundImage:`url(${imageUrl}${imageParams})`}
   
    return(       
        <div className="banner">
            <Link className="background" to={props.bannerLink} style={backgroundImageStyle}/>
            {props.links && <BannerLinks links={props.links}/>}

        </div>
    )
}

export default DefaultBanner