import React from 'react';

import Loader from 'react-loader-spinner'

function LoadingSplash(props){
    return (<Loader className="loader"
        type={props.type || "ThreeDots"}
        color={props.colour || "#ddd"}
        height={props.height || 50}
    />)
}

export default LoadingSplash;