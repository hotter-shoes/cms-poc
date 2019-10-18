import React from 'react'

import Banner from './banner'
import Hotspots from './hotspots';

function HomePage(){

    const slotId = '1f0fe60d-7b4b-4a39-a757-a1b221944443'

    return (
        <div id="homepage">
            <Banner slot-id={slotId}/>
            <Hotspots></Hotspots>
        </div>
    )
}

export default HomePage