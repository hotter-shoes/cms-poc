import React from 'react';

import Hotspot from './hotspot';

import './hotspot.css'

function Hotspots(props){

    const hotspotsConf = props.hotspots || [];
    
    const hotspots = hotspotsConf.map((hotspot,index)=><Hotspot key={index} {...hotspot}/>)
    return(
        <div id="hotspots">
            {hotspots}
        </div>
    )
}

export default Hotspots;