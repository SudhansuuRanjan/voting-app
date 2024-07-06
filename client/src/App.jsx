import './App.css'
import Layout from './components/Layout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { About, Dashboard, Home, Login, Signup, NotFound, EnterCandidates, ForgotPassword, Campaign } from './pages'
import { AuthProvider } from './context/AuthContext'
import PrivateComponent from './components/PrivateComponent'


function App() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout></Layout>}>

            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/enter-candidates' element={<EnterCandidates />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/*' element={<NotFound />} />


            <Route path="/dashboard" element={<PrivateComponent />} >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/campaign/:campaignId" element={<PrivateComponent />} >
              <Route path="/campaign/:campaignId" element={<Campaign />} />
            </Route>

          </Route>
        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App
