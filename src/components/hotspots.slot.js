import React, {useState,useEffect} from 'react';

import Hotspots from './hotspot/hotspots';
import LoadingSplash from './LoadingSplash.js';

import {getContentBySlotId} from '../lib/amplience.helper';

var amp = require('../lib/cms-javascript-sdk.js');

function HotspotsSlot(){
  
    const slotID = 'b2f83a21-c630-4f0f-9cc7-53af4800e8e6';
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