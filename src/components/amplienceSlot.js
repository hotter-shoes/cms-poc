import React , {useEffect,useState} from 'react';
import {getContentBySlotId} from '../lib/amplience.helper';


var amp = require('../lib/cms-javascript-sdk.js');

function AmplienceSlot(props){

    const slotId = props.slotId || false;
    const slotType = props.slotType || 'Not Provided';
    const ContentToRender = props.contentToRender || false;
    const LoadingSplash = props.LoadingSplash || false;

    const [slotConfig,setSlotConfig] = useState({});
    const [loaded,setLoaded] = useState(false);
  
    useEffect(()=>{
      getContentBySlotId(slotId)
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
            if(contentTree['@type']!==slotType){
                console.error("Amplience Content type mismatch",contentTree['@type'],slotType)
            }else{
                setSlotConfig(contentTree||{})
                setLoaded(true)
            }
        
        }else{
            console.error("Un-expected response from Amplience",slotId,data)
        }
      },error=>console.error(error))
      .catch(error=>{
        console.error(error)
      })
  
    },[])

    return (
        <>
        {loaded?(ContentToRender && <ContentToRender {...slotConfig}/>) : (LoadingSplash && <LoadingSplash/>)} 
        </>
    )


}

export default AmplienceSlot;