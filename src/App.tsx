import { useEffect, useState } from 'react'
import { healthCheck, testDBConn } from './services/health';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Auth from './pages/Auth';
import Dashboard from './pages/_authenticated/Dashboard';
import Users from './pages/_authenticated/Users';
import Portfolios from './pages/_authenticated/portfolios';
import Chatbot from './pages/_authenticated/Chatbot';
import Conversations from './pages/_authenticated/Conversations';
import Visitors from './pages/_authenticated/Visitors';
import SettingsPage from './pages/_authenticated/Settings';

function App() {
  const [status, setStatus] = useState('')
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  useEffect(()=>{
    const health = async() =>{
      try{
        const health = await healthCheck()
        setStatus(health.message)
      }catch(err){
        console.error(err)
      }
    }
    // health();
    const testDb = async() =>{
      try{
        const health = await testDBConn()
        setStatus(health.message)
      }catch(err){
        console.error(err)
      }
    }
    // testDb();
  },[]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/dashboard' element={<Dashboard /> } />
      <Route path='/users' element={<Users /> } />
      <Route path='/portfolios' element={<Portfolios /> } />
      <Route path='/chatbot' element={<Chatbot /> } />
      <Route path='/conversations' element={<Conversations /> } />
      <Route path='/visitors' element={<Visitors /> } />
      <Route path='/settings' element={<SettingsPage /> } />
    </Routes>
  )
}

export default App
