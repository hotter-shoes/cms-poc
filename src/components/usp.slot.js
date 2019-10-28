import React, {useState,useEffect} from 'react'

import {getContentBySlotId} from '../lib/amplience.helper';

import USP from './USP/usp';

var amp = require('../lib/cms-javascript-sdk.js');

function USPSlot(){
   
    const slotID = '38a1a157-8d87-4f4b-b301-11f7a472c216';
  
    const [uspConfig,setUSPConfig] = useState({});
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
            console.log(contentTree)
            setUSPConfig(contentTree.usp||{})
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience","USP",slotID,data)
        }
      },error=>console.error(error))
      .catch(error=>{
        console.error(error)
      })
  
    },[])

  
    return (
        <>
        {loaded?<USP {...uspConfig}/> : false}
        </>
    )
}

export default USPSlot