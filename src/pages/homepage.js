import React from 'react'

import Banner from '../components/banner/banner';
import Hotspots from '../components/hotspot/hotspots';

import AmplienceSlot from '../components/amplienceSlot';

import LoadingSplash from '../components/loadingSplash'

function HomePage(){
    return (
        <div id="homepage">
            <AmplienceSlot contentToRender={Banner} slotId='2cb34398-4170-4694-a3f0-5d85de451537' slotType='https://www.banner.slot' loadingSplash={LoadingSplash}/>
            <AmplienceSlot contentToRender={Hotspots} slotId='b2f83a21-c630-4f0f-9cc7-53af4800e8e6' slotType='https://www.hotspot.slot' loadingSplash={LoadingSplash}/>
        </div>
    )
}

export default HomePage