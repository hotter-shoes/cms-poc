import React, {useState,useEffect} from 'react'

import {getContentBySlotId} from '../lib/amplience.helper';

import Article from './article/article';

import LoadingSplash from './LoadingSplash';

import '../css/article.css'

var amp = require('../lib/cms-javascript-sdk.js');


function ArticleSlot(props){

    const slotID = props.slotID || '669d6fbb-76e6-41a7-a759-c75922621b05';
  
    const [articleConfig,setArticleConfig] = useState({});
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
            setArticleConfig(contentTree.article||{})
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience","Article",slotID,data)
        }
      },error=>console.error(error))
      .catch(error=>{
        console.error(error)
      })
  
    },[])

    return (
      <>
        {loaded ? <Article {...articleConfig}/>:<LoadingSplash/>}
      </>
    )
}

export default ArticleSlot