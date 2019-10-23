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
        .then(res => {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return res.json()
            }else{
              return [];
            }
          })
      .then((data)=>{
        if(data.result && data.result.length>0){
            const contentTree = amp.inlineContent(data)[0];
            setHotspotConfig(contentTree.hotspots)
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience","Hotspots",slotID,data)
        }
      },error=>console.error(error))
      .catch(error=>{
        console.error(error)
      })
    },[])
   
    return (
        <>
            {loaded?<Hotspots hotspots={hotspotConfig}/> : <LoadingSplash/>}
        </>
    )
}

export default HotspotsSlot