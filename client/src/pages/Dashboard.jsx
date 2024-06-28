import React, { useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/profile')
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }



  return (
    <div>
      <h1 className='text-black text-2xl font-bold'>Dashboard</h1>
      <button onClick={fetchData} className='bg-sky-700 p-2 text-gray-900 rounded-lg'>Fetch Data</button>
      {data && <p className='text-gray-800 text-lg'>{data.message}</p>}
    </div>
  )
}

export default Dashboard