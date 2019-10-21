import React from 'react';

import Loader from 'react-loader-spinner'

function LoadingSplash(){
    return (<Loader className="loader"
        type="ThreeDots"
        color="#ddd"
        height={500}
    />)
}

export default LoadingSplash;