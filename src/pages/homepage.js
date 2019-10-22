import React from 'react'

import Banner from '../components/banner.slot.js';
import Hotspots from '../components/hotspots.slot.js';

function HomePage(){
    return (
        <div id="homepage">
            <Banner/>
            <Hotspots/>
        </div>
    )
}

export default HomePage