import React from 'react'
import './homepage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import PageHeader from '../../components/pageHeader/PageHeader'
import './homepage.css'

function HomePage() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div className='home-page'>
      <PageHeader page={'home'}/>
      {/* { user ? (
        <>
          <button onClick={onLogout}>Logout</button>
          <button>Start Coding!</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </>
      )} */}
    </div>
  )
}

export default HomePage