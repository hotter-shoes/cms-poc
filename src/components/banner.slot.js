import React, {useState,useEffect} from 'react'

import {getContentBySlotId} from '../lib/amplience.helper';

import LoadingSplash from './LoadingSplash';
import Banner from './banner/banner';


var amp = require('../lib/cms-javascript-sdk.js');

function BannerSlot(){
   
    const slotID = '2cb34398-4170-4694-a3f0-5d85de451537';
  
    const [bannerConfig,setBannerConfig] = useState({});
    const [loaded,setLoaded] = useState(false);
  
    useEffect(()=>{
      getContentBySlotId(slotID)
      .then(res => res.json())
      .then((data)=>{
        if(data.result.length>0){
            const contentTree = amp.inlineContent(data)[0];
            setBannerConfig(contentTree.banner||{})
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience","Banner",slotID,data)
        }
      },error=>console.error(error))
  
    },[])

  



    return (
        <>
        {loaded?<Banner {...bannerConfig}/> : <LoadingSplash/>}
        </>
    )
}

export default BannerSlot