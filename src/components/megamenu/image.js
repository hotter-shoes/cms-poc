import React from 'react';
import {Link} from 'react-router-dom';

import {getImageURL,getImageOptionsParams} from '../../lib/amplience.helper';

/*TODO Need to change the default props to provide a 404 image placeholder*/
import image404 from '../defaults/404image';

function MegaMenuImage(props){

const link = props.link || "#"
const alt = props.alt || "";
const image = props.image || image404;

/*Amplience dynamic image parameters*/
const imageOptions = {
    w:380,
    h:260,
    qlt:80
}

/*uses helper functions to generate the amplience image request url*/
const imageParams = getImageOptionsParams(imageOptions);
const imageUrl = getImageURL(image)
const imageSRC = imageUrl + imageParams;

    return(
        <section className="mm-image">
            <Link to={link} onClick={()=>props.closeMenu()}>
                <img src={imageSRC} alt={alt}/>
            </Link>
        </section>
    )
}

export default MegaMenuImage;