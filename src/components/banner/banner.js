import React from 'react';

import BannerWithLinks from './bannerWithLinks';

function Banner(props){
    console.log(props)
    switch(props.banner['@type']){
        case 'https://banner.withLinks':
            return <BannerWithLinks {...props.banner}/>
        default:
            return false;
    }
}

export default Banner