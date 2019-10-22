import React, {useState,useEffect} from 'react';

import Hotspot from './hotspot/hotspot';

import {getContentBySlotId} from '../lib/amplience.helper';

import LoadingSplash from './LoadingSplash.js'

var amp = require('../lib/cms-javascript-sdk.js');

function Hotspots(){
  
    const slotID = 'fc1efc03-131d-47d5-b389-5bab7c90f185';
    const [hotspotConfig,setHotspotConfig] = useState({});
    const [loaded,setLoaded] = useState(false);
  
    useEffect(()=>{
        getContentBySlotId(slotID)
      .then(res => res.json())
      .then((data)=>{
        if(data.result.length>0){
            const contentTree = amp.inlineContent(data)[0];
            setHotspotConfig(contentTree.hotspots)
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience","Hotspots",slotID,data)
        }
      },error=>console.error(error))
    },[])
   
    function HomepageHotspots(){

        const hotspots = hotspotConfig.map((hotspot,index)=><Hotspot key={index} {...hotspot}/>)
        return(
            <div id="hotspots">
                {hotspots}
            </div>
        )
    }

    return (
        <>
            {loaded?<HomepageHotspots/> : <LoadingSplash/>}
        </>
    )
}

export default Hotspots