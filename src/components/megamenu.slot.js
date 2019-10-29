import React,{useState,useEffect} from 'react'

import MegaMenu from './megamenu/megamenu.js';
import {getContentBySlotId} from '../lib/amplience.helper';
import './../css/megamenu.css';

import LoadingSplash from './LoadingSplash';
var amp = require('../lib/cms-javascript-sdk.js');

function MegaMenuSlot(props){
    const slotID = '4fddb07e-1b7d-435c-9b9b-511a6a5360de';
    const [loaded,setLoaded] = useState(false);
    const [megaMenuConfig,setMegaMenuConfig] = useState(false);


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
                setMegaMenuConfig(contentTree||{})
                setLoaded(true)
            }else{
                console.error("Un-expected response from Amplience","Mega Menu",slotID,data)
            }
        },error=>console.error(error))
        .catch(error=>{
            console.error(error)
          })
    },[])
    return(
        <section id="megamenu">
            {loaded?<MegaMenu sections={megaMenuConfig.sections||{}}/>:<LoadingSplash/>}
        </section>
    )
}

export default MegaMenuSlot;