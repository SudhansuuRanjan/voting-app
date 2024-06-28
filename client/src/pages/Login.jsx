import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', data)
      console.log(response.data)
      setResponse(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }



  return (
    <div className='pt-20'>
      <h1 className='text-black text-2xl font-bold'>Login</h1>

      {response && <p className='text-gray-800 text-lg'>{response.message}</p>}

      <form onSubmit={handleSubmit}>
        <input className='bg-slate-100 rounded-lg outline-none p-2 text-gray-800' type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input className='bg-slate-100 rounded-lg outline-none p-2 text-gray-800' type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button className='bg-sky-700 p-2 text-gray-900 rounded-lg' type="submit">Login</button>
      </form>

    </div>
  )
}

export default Login