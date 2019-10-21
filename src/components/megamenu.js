import React,{useState,useEffect} from 'react'

import SubMenu from './megamenu/submenu';

import './../css/megamenu.css';

import defaultJson from './defaults/megamenu.json'
import LoadingSplash from './LoadingSplash';
var amp = require('../lib/cms-javascript-sdk.js');

const interactionTimeout = 300;
const breakpoint = 992;

function MegaMenu(props){

    const sysiri = 'http://content.cms.amplience.com'
    const slotID = '4d73f7d6-1958-416e-833d-7990a3ee4d23';
    const store = 'salmonsandbox';
    const encodedQuery = encodeURIComponent(JSON.stringify({'sys.iri':`${sysiri}/${slotID}`}));
    const contentDeliveryUrl = `https://c1.adis.ws/cms/content/query?fullBodyObject=true&query=${encodedQuery}&scope=tree&store=${store}`;
  
    const [megaMenuConfig,setMegaMenuConfig] = useState({});
    const [loaded,setLoaded] = useState(false);
    const [open,setOpen] = useState(false);
  
    useEffect(()=>{
      fetch(contentDeliveryUrl)
      .then(res => res.json())
      .then((data)=>{
        if(data.result.length>0){
            const contentTree = amp.inlineContent(data)[0];
            console.log(contentTree)
            setMegaMenuConfig(contentTree.sections||{})
            setLoaded(true)
        }else{
            console.error("Un-expected response from Amplience","Mega Menu",slotID,data)
        }

      },error=>console.error(error))
  
    },[])



    //used for debugging, needs to be tied into a button in the header
    function toggleMenu(){
        setOpen(!open);
    }
    
    //hover events for desktop
    function handleMouseEnter(event, index) {
        if (window.innerWidth >= breakpoint) {
            handleIntent(index, true)
        }
    }

    //hover events for desktop
    function handleMouseLeave(event, index) {
        if (window.innerWidth >= breakpoint) {
            let newConfig = Object.assign([], megaMenuConfig);
            //give section interactionTimeout ms to regain mouse over, otherwise close section.
            newConfig[index].timer = setTimeout(() => {
                handleIntent()
            }, interactionTimeout)
        }
    }

    function handleOnMouseUp(event, index) {
        console.log("mouse",window.innerWidth);
        //mobile
        if (window.innerWidth <= breakpoint) {
            //do not navigate when clicking on menu titles
            event.preventDefault();
            const oldIntent = megaMenuConfig[index].intent;
            handleIntent(index, !oldIntent)
        } else {
            handleIntent()
        }
    }

    function handleOnTouchEnd(event, index , href) {

        //to prevent the browser firing extra mouse events on touch, we have to block it bubbling in all cases.
        event.preventDefault();
        console.log("tap", window.innerWidth,megaMenuConfig[index].titleClicked,href);
        const oldIntent = megaMenuConfig[index].intent;
        //mobile
        if (window.innerWidth <= breakpoint) {
            //do not navigate when clicking on menu titles
            handleIntent(index, !oldIntent)
        } else {
            //tablet landscape
            //if the menu is already open, navigate
            if (megaMenuConfig[index].titleClicked) {
                console.log("navigate and close")
                //use history so that the page doesnt refresh (react-router)
                props.history.push(href)
                //reset the intent to close all menus
                handleTitleClicked();
                handleIntent();
            } else {
                console.log("open and wait")
                //stop navigating and prepare to navigate if clicked again
                handleTitleClicked(index);
                handleIntent(index, !oldIntent)
            }
        }
    }


    function handleIntent(index, intent) {
        //go through each section and reset timer and intent
        let newConfig = Object.assign([], megaMenuConfig);
        newConfig.forEach(section => {
            section.intent = false;
            clearTimeout(section.timer);
        });
        if (typeof index !== "undefined" && typeof intent !== "undefined") {
            newConfig[index].intent = intent
        }
        setMegaMenuConfig(newConfig);
    }

    function handleTitleClicked(index) {
        let newConfig = Object.assign([], megaMenuConfig);
        newConfig.forEach(section => {
            section.titleClicked = false;
        });
        if (typeof index !== "undefined") {
            newConfig[index].titleClicked = true
        }
        setMegaMenuConfig(newConfig);
    }

    /**
     * pointer events are changed depending on what mode the menu is in
     * Mobile mode supports tap events
     * Desktop mode supports hover events, with added support for tap events for landscape tablet.
     * */
    const pointerEvents = {
        leave: handleMouseLeave,
        enter: handleMouseEnter,
        click: handleOnMouseUp,
        tap: handleOnTouchEnd
    }

    function closeMenu(){
        handleIntent();
        toggleMenu();
    }
   


    function LoadedMegaMenu(){
        const subMenues = megaMenuConfig.map((submenu,index)=>{
            return <SubMenu 
            key={index} 
            index={index} 
            title={submenu.title} 
            link={submenu.link} 
            subsections={submenu.subsections} 
            intent={submenu.intent} 
            pointerEvents = {pointerEvents}
            closeMenu = {closeMenu}
            />
        })


        return(
            <>
        <button onClick={()=>toggleMenu()}>{open?"Close":"Open"}</button>
        <section id="sub-menus" className={open?"open":""}>
            {subMenues}
        </section>
        </>
        )
    }

    return(
    <section id="megamenu">
        {loaded?<LoadedMegaMenu/>:<LoadingSplash/>}

    </section>)
}

export default MegaMenu;