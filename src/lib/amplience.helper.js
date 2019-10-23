export async function getContentBySlotId(slotId,store){
        //this needs to be a bit smarter so that we're not constantly querying the url parms for every content request
        const params = getUrlParams();
        let amplienceURL = 'c1.adis.ws';

        if(params.api){
           let vseDomainQueryURL = `https://virtual-staging.adis.ws/domain/${params.api}`;
           if(params.timestamp){
               vseDomainQueryURL += `?timestamp=${params.timestamp}`;
           }
            const requestBody = await fetch(vseDomainQueryURL);
            amplienceURL  = await requestBody.text();
            console.info("VSE URL:" ,amplienceURL,new Date(parseInt(params.timestamp)))
        }

        const encodedQuery = encodeURIComponent(JSON.stringify({'sys.iri':`content.cms.amplience.com/${slotId}`}));
        const contentDeliveryUrl = `https://${amplienceURL}/cms/content/query?fullBodyObject=true&query=${encodedQuery}&scope=tree&store=${store||'salmonsandbox'}`;
        return await fetch(contentDeliveryUrl)
}

function getUrlParams(){
    let params = {}   
    window.location.search.replace("?","").split("&").forEach(param=>{
            const [key,value] = param.split("=");
            params[key]=value;
            })
    return params
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