import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { register } from '../serviceWorker'

export default function Register(props) {
  const history = useHistory()
  const [user, setUser] = useState({
    username: '',
    password1: '',
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('https://lambda-mud-test.herokuapp.com/api/login', user)
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.key)
        history.push('/game')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const register= (e) =>{
    e.preventDefault()
    console.log('hi')
    history.push('/register')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Username:</h1>
        <input
          name='username'
          value={user.username}
          onChange={handleChange}
        ></input>
        <h1>Password:</h1>
        <input
          name='password1'
          value={user.password1}
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit}> LETS GOOOOOOO </button>
      </form>
      <h1 onClick={register}>Don't have an account???</h1>
    </div>
  )
}
