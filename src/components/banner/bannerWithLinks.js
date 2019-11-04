import React ,{useState,useEffect} from 'react';

import {Link} from 'react-router-dom';

import {getImageURL} from '../../lib/amplience.helper';
import PropTypes from 'prop-types'; // ES6

import './bannerWithLinks.css'

BannerWithLinks.propTypes = {
    images:PropTypes.shape({
        desktop:PropTypes.object.isRequired,
        tablet:PropTypes.object.isRequired,
        mobile:PropTypes.object.isRequired,
        alt:PropTypes.string.isRequired,
    }).isRequired,
    links:PropTypes.shape({
        main:PropTypes.string.isRequired,
        secondary:PropTypes.arrayOf(PropTypes.shape({
            link:PropTypes.string.isRequired,
            text:PropTypes.string.isRequired
        })).isRequired
    }),
    style:PropTypes.object
}

BannerWithLinks.defaultProps = {
    images:{
        alt:"not provided",
        desktop:{},
        mobile:{},
        tablet:{}
    },
    links:{
        main:'/#',
        secondary:[{link:'/#1','text':"Link 1"},{link:'/#2','text':"Link 2"}]
    },
    style:{}
}

function BannerWithLinks(props){
    const [breakpoint,setBreakpoint] = useState(determineBreakpoint());
    const [bgImage,setBGImage] = useState(setBackgroundImage());

    let resizeDebounceTimer;


    /* code relies on knowing the current breakpoint, so this code should use the global state for this in production*/
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    });

    useEffect(()=>{
        setBGImage(setBackgroundImage())
        // eslint-disable-next-line
    },[breakpoint])

    function handleResize() {
        clearTimeout(resizeDebounceTimer)
        resizeDebounceTimer = setTimeout(() => {
            setBreakpoint(determineBreakpoint());
        }, 100)
    }

    function determineBreakpoint(){
        let breakpoint = "desktop"

        if(window){
            const width = window.innerWidth;      
                if( width < 767){
                    breakpoint = "mobile";
                }else if(width >=768 && width <991){
                    breakpoint = "tablet";
                }else if(width >= 991){
                    breakpoint = "desktop";
                }                
        }
        return breakpoint;

    }

    function setBackgroundImage() {
        switch (breakpoint) {
            case "mobile":
                return props.images.mobile;
            case "tablet":
                return props.images.tablet;
            case "desktop":
                return props.images.desktop;
            default:
                return props.images.desktop
        }
    }



    const links = props.links.secondary.map((link,i)=>{
        return (<Link to={link.link} key={i} style={props.style}>{link.text}</Link>)
    })

    const bgStyle = {backgroundImage:`url(${getImageURL(bgImage)}?fmt.jpeg.interlaced=true)`}

    return(       
        <div id="banner" className="with-links">
            <Link to={props.links.main } className="background" style={bgStyle}>
            </Link>
            <div className="links-container">
                <div className="links">{links}</div>
            </div>
        </div>
    )
}

export default BannerWithLinks