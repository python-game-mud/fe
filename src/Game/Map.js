import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import axios from 'axios'
import styled from 'styled-components'
import img from './man.png'
import Pusher from './Pusher'

export default function Map() {
    const [left, setLeft] = useState(10)
    const [top, setTop] = useState(10)

    const Maps = styled.div`
    background: green;
    min-height: 100vh;
    width: 80vw;
  `
    const Person = styled.div`
    background-image: url(${img});
    height: 9vh;
    width: 5vw;
    position: absolute;
    left: ${left}%;
    top: ${top}%;
  `

    axiosWithAuth()
        .get('api/adv/init')
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    return (
        <Maps>
            <Pusher left ={left} top={top} setLeft={setLeft} setTop={setTop}/>
            <Person />
        </Maps>
    )
}
