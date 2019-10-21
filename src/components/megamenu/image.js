import React from 'react';
import {Link} from 'react-router-dom';
import get from 'lodash.get'

function MegaMenuImage(props){

const defaultProps = {
    link:"#image",
    image:{
        '@id': "http://image.cms.amplience.com/ba173baf-4c5d-43d2-a2f8-d10f51287fe1",
'defaultHost': "i1.adis.ws",
'endpoint': "salmonsandbox",
'id': "ba173baf-4c5d-43d2-a2f8-d10f51287fe1",
'mediaType': "image",
'name': "1469709889818_Blue_set_a"
    },
    alt:"mm alt"
}

const link = get(props,'link',defaultProps.href)
const imageConf = get(props,'src',defaultProps.image)
const alt = get(props,'alt',defaultProps.alt)

const imageUrl = `https://${imageConf.defaultHost}/i/${imageConf.endpoint}/${imageConf.name}?w=380&h=260&qlt=80`

    return(<section className="mm-image">
        <Link to={link} onClick={()=>props.closeMenu()}>
            <img src={imageUrl} alt={alt}/>
        </Link>
    </section>
    )
}

export default MegaMenuImage;