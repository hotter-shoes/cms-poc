import React, { useEffect, useState } from 'react'

function Page({match}){
    const [style, setStyle] = useState({
        page: {
            backgroundColor: 'rgb(255,255,255)'
        },
        header: {
            color: 'rgb(0,0,0)'
        }
    })

    function stringToRGB(string) {
     
        let stringTotal = {
            r: 0,
            g: 0,
            b: 0
        }
        let colour = {
            r: 0,
            g: 0,
            b: 0
        }
        let count = 0;

        if(typeof string !== "string"){
            console.error("argument is not string");
            return colour;
        }

        for (let i = 0; i < string.length; i++) {
            stringTotal.r += count === 0 ? string.charCodeAt(i) : 0;
            stringTotal.g += count === 1 ? string.charCodeAt(i) : 0;
            stringTotal.b += count === 2 ? string.charCodeAt(i) : 0;
            count = count === 2 ? 0 : count + 1
        }

        colour = {
            r: stringTotal.r % 255,
            g: stringTotal.g % 255,
            b: stringTotal.b % 255
        }
        return colour;
    }



    useEffect(() => {
        setStyle({
            page: {
                backgroundColor: colourToCSS(stringToRGB(match.params.title), true)
            },
            header: {
                color: colourToCSS(stringToRGB(match.params.title), false),
            }
        })
    }, [match.params.title])



    function colourToCSS(colour, invert) {
        if (invert) {
            return "rgb(" + (255 - colour.r || 0) + "," + (255 - colour.g || 0) + "," + (255 - colour.b || 0) + ")"
        } else {
            return "rgb(" + (colour.r || 0) + "," + (colour.g || 0) + "," + (colour.b || 0) + ")"
        }
    }
    return(
        <div className="placeholder" style={style.page}>
            <div className="container">
            <h1 style={style.header}>{match.params.title}</h1>
            </div>
          
        </div>
    )


}

export default Page