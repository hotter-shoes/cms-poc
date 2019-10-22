import React,{useState,useEffect} from 'react'

import MegaMenu from './megamenu/megamenu.js';
import {getContentBySlotId} from '../lib/amplience.helper';
import './../css/megamenu.css';

import LoadingSplash from './LoadingSplash';
var amp = require('../lib/cms-javascript-sdk.js');



function MegaMenuSlot(props){
    const slotID = '4d73f7d6-1958-416e-833d-7990a3ee4d23';
    const [loaded,setLoaded] = useState(false);
    const [megaMenuConfig,setMegaMenuConfig] = useState(false);


    useEffect(()=>{
        getContentBySlotId(slotID)
        .then(res => res.json())
        .then((data)=>{
            if(data.result.length>0){
                const contentTree = amp.inlineContent(data)[0];
                setMegaMenuConfig(contentTree||{})
                setLoaded(true)
            }else{
                console.error("Un-expected response from Amplience","Mega Menu",slotID,data)
            }
        },error=>console.error(error))
    },[])
    return(
        <section id="megamenu">
            {loaded?<MegaMenu sections={megaMenuConfig.sections||{}} customHistory={props.customHistory}/>:<LoadingSplash/>}
        </section>
    )
}

export default MegaMenuSlot;