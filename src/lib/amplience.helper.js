export async function getContentBySlotId(slotId,store){
        const sysiri = 'http://content.cms.amplience.com'
        const encodedQuery = encodeURIComponent(JSON.stringify({'sys.iri':`${sysiri}/${slotId}`}));
        const contentDeliveryUrl = `https://c1.adis.ws/cms/content/query?fullBodyObject=true&query=${encodedQuery}&scope=tree&store=${store||'salmonsandbox'}`;
        return await fetch(contentDeliveryUrl)
}

export function getImageURL(imageObj){
    // example
    // image: {
    //     '@id': "http://image.cms.amplience.com/ba173baf-4c5d-43d2-a2f8-d10f51287fe1",
    //     'defaultHost': "i1.adis.ws",
    //     'endpoint': "salmonsandbox",
    //     'id': "ba173baf-4c5d-43d2-a2f8-d10f51287fe1",
    //     'mediaType': "image",
    //     'name': "1469709889818_Blue_set_a"
    // }

    if(imageObj.defaultHost && imageObj.endpoint && imageObj.name){
        return `https://${imageObj.defaultHost}/i/${imageObj.endpoint}/${imageObj.name}`
    }else{
        return '404'
    } 
}


/*
const imageOptions = {
    w:80,
    h:260,
    qlt:80
}

output => "?w=80&h=260&qlt=80"
*/

export function getImageOptionsParams(optionsList){
    let options="";
    if(typeof optionsList  === 'object'){
        Object.entries(optionsList).forEach(([key,value],index)=>{
            const delimiter = index === 0 ? "?": "&";
            options += `${delimiter}${key}=${value}`
        })
    }
    return options
}