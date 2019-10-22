import React from 'react';

import Loader from 'react-loader-spinner'

function LoadingSplash(props){
    return (<Loader className="loader"
        type="ThreeDots"
        color="#ddd"
        height={props.height || 50}
    />)
}

export default LoadingSplash;