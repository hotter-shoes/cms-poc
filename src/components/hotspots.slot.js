import React, {useState,useEffect} from 'react';

import Hotspots from './hotspot/hotspots';
import LoadingSplash from './LoadingSplash.js';

import {getContentBySlotId} from '../lib/amplience.helper';

var amp = require('../lib/cms-javascript-sdk.js');

function HotspotsSlot(){
  
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
   
    return (
        <>
            {loaded?<Hotspots hotspots={hotspotConfig}/> : <LoadingSplash/>}
        </>
    )
}

export default HotspotsSlot