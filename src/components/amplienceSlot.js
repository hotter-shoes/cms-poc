import React , {useEffect,useState} from 'react';
import {getContentBySlotId} from '../lib/amplience.helper';
import PropTypes from 'prop-types';

var amp = require('../lib/cms-javascript-sdk.js');

AmplienceSlot.propTypes = {
    slotId:PropTypes.string.isRequired,
    slotType:PropTypes.string.isRequired,
    contentToRender:PropTypes.func.isRequired,
    loadingIndicator:PropTypes.func
}

AmplienceSlot.defaultProps = {
    slotId:false,
    slotType:'Not Provided',
    contentToRender:false
}

function AmplienceSlot(props){

    //renderable function which is expecting the data from amplience
    const ContentToRender = props.contentToRender;
    //optional renderable function which will be shown whilst the amplience request is in progress
    const LoadingIndicator = props.loadingIndicator;

    const [slotConfig,setSlotConfig] = useState({});
    const [loaded,setLoaded] = useState(false);
  
    useEffect(() => {
        //helper function which encapsulates the request to amplience for slot information, returns fetch promise
        getContentBySlotId(props.slotId)
            .then(res => {
                //preliminary response validation - TODO - Needs Improving
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return res.json()
                } else {
                    return [];
                }
            })
            .then((data) => {
                if (data.result && data.result.length > 0) {
                    //convert JSON-LD  to JSON using Amplience SDK helper
                    const contentTree = amp.inlineContent(data)[0];
                    //check that the recieved slot data matches what is expected
                    if (contentTree['@type'] !== props.slotType) {
                        //if it doesnt match, don't render
                        console.error("Amplience Content type mismatch", contentTree['@type'], props.slotType)
                    } else {
                        setSlotConfig(contentTree)
                        setLoaded(true)
                    }
                } else {
                    console.error("Un-expected response from Amplience", props.slotId, data)
                }
            }, error => console.error(error))
            .catch(error => {
                console.error(error)
            })

    }, [props.slotId,props.slotType])

    return (
        <>
            {loaded?(props.contentToRender && <ContentToRender {...slotConfig}/>) : (props.loadingIndicator && <LoadingIndicator/>)} 
        </>
    )


}

export default AmplienceSlot;