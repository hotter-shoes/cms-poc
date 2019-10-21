import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

import LoadingSplash from './LoadingSplash'
var amp = require('../lib/cms-javascript-sdk.js');

function Banner(){
    const sysiri = 'http://content.cms.amplience.com'
    const slotID = '49113ce6-d89a-41de-869a-6393ac3b7e24';
    const store = 'salmonsandbox';
    const encodedQuery = encodeURIComponent(JSON.stringify({'sys.iri':`${sysiri}/${slotID}`}));
    const contentDeliveryUrl = `https://c1.adis.ws/cms/content/query?fullBodyObject=true&query=${encodedQuery}&scope=tree&store=${store}`;
  
    const [bannerConfig,setBannerConfig] = useState({});
    const [loaded,setLoaded] = useState(false);
  
    useEffect(()=>{
      fetch(contentDeliveryUrl)
      .then(res => res.json())
      .then((data)=>{
        if(data.result.length>0){
            const contentTree = amp.inlineContent(data)[0];
            console.log(contentTree)
            setBannerConfig(contentTree)
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience",slotID,data)
        }

      },error=>console.error(error))
  
    },[])

    function BannerLinks(){

    const links = bannerConfig.banner.links.map((link,index)=>{
        const linkStyle = {backgroundColor:link.backgroundColour,color:link.textColour}
        return(<a key={index} href={link.link} style={linkStyle}>{link.text} </a> )
  
    })
        return (
            <div className="banner-links-container">
            <div className="banner-links">
            {links}
            </div>
            </div>
           
        )
    }

    function HomepageBanner(){

        const imageConf = bannerConfig.banner.bannerImage
        const imageUrl = `https://${imageConf.defaultHost}/i/${imageConf.endpoint}/${imageConf.name}?w=1350&qlt=80`

        const backgroundImageStyle = {backgroundImage:`url(${imageUrl})`}
       
        return(       
            <div className="banner">
                <Link className="background" to={bannerConfig.banner.bannerLink} style={backgroundImageStyle}/>
                {bannerConfig.banner.links && <BannerLinks/>}

            </div>
        )
    }

    return (
        <>
        {loaded?<HomepageBanner/> : <LoadingSplash/>}
        </>
    )
}

export default Banner