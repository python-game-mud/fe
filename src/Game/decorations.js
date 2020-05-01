import React, {useEffect, useState} from 'react'
import { ReactComponent as Cat} from "../sprites/cat.svg";
import { ReactComponent as Skull } from "../sprites/skull.svg";
import { ReactComponent as Red} from "../sprites/red.svg";
import { ReactComponent as Green } from "../sprites/green.svg";
import { ReactComponent as Chest } from "../sprites/chest.svg";
import { ReactComponent as Apple} from "../sprites/apple.svg";
import { ReactComponent as Book } from "../sprites/book.svg";
import { ReactComponent as Happy } from "../sprites/happy.svg";

import styled from 'styled-components';



export default function Decorations(props) {
    const [top, setTop] = useState()
    const [left, setLeft] = useState()
    const [icon, setIcon] = useState()

    function random(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }

    useEffect(() => {
        setTop(random(20, 40))
        setLeft(random(20, 55))
        setIcon(random(0, 10))
    }, [props.id])
    const Fancy = styled.div`
    position: fixed;
    left: ${left}%;
    top: ${top}%;
    z-index: 3;
    `;



    return(
        <Fancy> 
            {icon === 0 ? <Cat height="500px" width="500px" />: null}
            {icon === 1 ? <Skull height="500px" width="500px" />: null}
            {icon === 2 ? <Red height="500px" width="500px" />: null}
            {icon === 3 ? <Green height="500px" width="500px" />: null}
            {icon === 4 ? <Chest height="500px" width="500px" />: null}
            {icon === 5 ? <Apple height="500px" width="500px" />: null}
            {icon === 6 ? <Book height="500px" width="500px" />: null}
            {icon === 7 ? <Happy height="500px" width="500px" />: null}
            {icon === 8 ? <img src={require("../sprites/unicorn.png")} height="300px" width="300px" />: null}
            {icon === 9 ? <img src={require("../sprites/Crocodile.png")} height="300px" width="300px" />: null}
            {icon === 10 ? <img src={require("../sprites/Dragon.png")} height="300px" width="300px" />: null}
        </Fancy>
    )
}