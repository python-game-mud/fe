import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import wcc from 'world-countries-capitals'


const People = styled.h1`

`

const Chat = styled.div`
width: 80%;
margin-left: 10%;
margin-bottom: 5%;
background-color: white;
color: green;
height: 50%;
padding: 5px;
border: 3px solid black;
`
export default function Info(props) {
    const [country, setCountry] = useState([])
    useEffect(() => {
        setCountry(wcc.getNRandomCountriesData(1))
    }, [props.id])
    console.log(country)
    console.log(props)
    return (
        <Chat>
            {country.map(country =>{ 
                return (<h1>Hello {props.info.name}! You just arived in {country.country} the capital here is {country.capital}. We are known for {country.famous_for}.</h1>)
            })}


        </Chat>
    )
}
