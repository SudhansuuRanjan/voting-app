import './App.css'
import Layout from './components/Layout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { About, Dashboard, Home, Login, Signup, NotFound, EnterCandidates, ForgotPassword } from './pages'


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/enter-candidates' element={<EnterCandidates />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
