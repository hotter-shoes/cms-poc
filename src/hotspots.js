

import React, {useState,useEffect} from 'react'
import Loader from 'react-loader-spinner'
var amp = require('./cms-javascript-sdk.js');

function Hotspots(){
    const sysiri = 'http://content.cms.amplience.com'
    const slotID = 'fc1efc03-131d-47d5-b389-5bab7c90f185';
    const store = 'salmonsandbox';
    const encodedQuery = encodeURIComponent(JSON.stringify({'sys.iri':`${sysiri}/${slotID}`}));
    const contentDeliveryUrl = `https://c1.adis.ws/cms/content/query?fullBodyObject=true&query=${encodedQuery}&scope=tree&store=${store}`;
  
    const [hotspotConfig,setHotspotConfig] = useState({});
    const [loaded,setLoaded] = useState(false);
  
    useEffect(()=>{
      fetch(contentDeliveryUrl)
      .then(res => res.json())
      .then((data)=>{
        if(data.result.length>0){
            const contentTree = amp.inlineContent(data)[0];
            console.log(contentTree)
            setHotspotConfig(contentTree)
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience",slotID,data)
        }

      },error=>console.error(error))
  
    },[])
   
    function LoadingSplash(){
        return (<Loader className="loader"
            type="ThreeDots"
            color="#ddd"
            height={500}
        />)
    }


    function Hotspot(props){

        const imageUrl = `https://${props.image.defaultHost}/i/${props.image.endpoint}/${props.image.name}?w=1350&sm=aspect&aspect=3:1&scaleFit=poi&poi={$this.metadata.pointOfInterest.x},{$this.metadata.pointOfInterest.y},{$this.metadata.pointOfInterest.w},{$this.metadata.pointOfInterest.h}`

        const backgroundImageStyle = {backgroundImage:`url(${imageUrl})`}
       
        return(       
        
                <a className="hotspot" href={props.link.url}>
                    <div className="background-image" style={backgroundImageStyle}></div>
                    <div className="text">
                        <p className="headline">{props.text.headline}</p>
                        <p className="subtext">{props.text.subtext}</p>
                        <p className="cta">{props.link.text}</p>
                    </div>
                </a>
       
        )
    }

    function HomepageHotspots(){

        const hotspots = hotspotConfig.hotspots.map((hotspot,index)=><Hotspot key={index} {...hotspot}/>)

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