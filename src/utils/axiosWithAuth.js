import axios from 'axios'

const axiosWithAuth = () => {
  const token = localStorage.getItem('token')
  return axios.create({
    baseURL: 'https://lambda-mud-test.herokuapp.com/',
    headers: {
      Authorization: {'token': "e1f5dd85f87b0312ee31b096abbe08890ee06e30"}
    },
  })
}

export default axiosWithAuth
