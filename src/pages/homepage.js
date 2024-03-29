import React from 'react'

import Banner from '../components/banner/banner';
import Hotspots from '../components/hotspot/hotspots';

import AmplienceSlot from '../components/amplienceSlot';

import LoadingIndicator from '../components/loadingIndicator';

function HomePage(){
    return (
        <div id="homepage">
            <AmplienceSlot contentToRender={Banner} slotId='2cb34398-4170-4694-a3f0-5d85de451537' slotType='https://www.banner.slot' loadingIndicator={()=><LoadingIndicator height={400}/>}/>
            <AmplienceSlot contentToRender={Hotspots} slotId='b2f83a21-c630-4f0f-9cc7-53af4800e8e6' slotType='https://www.hotspot.slot' loadingIndicator={()=><LoadingIndicator height={800}/>}/>
        </div>
    )
}

export default HomePage