import React from 'react';

import {Link} from 'react-router-dom';
import BannerLinks from './bannerLinks';

import './banner.css';

import {getImageURL,getImageOptionsParams} from '../../lib/amplience.helper';

function Banner(props){

    if(typeof props.banner === "undefined"){
        console.error("Incorrect data sent to Banner",props);
        return false;
    }

    const imageConf = props.banner.bannerImage
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
            <Link className="background" to={props.banner.bannerLink} style={backgroundImageStyle}/>
            {props.banner.links && <BannerLinks links={props.banner.links}/>}

        </div>
    )
}

export default Banner