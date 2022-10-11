import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'
import './login.css'
import PageHeader from '../../components/pageHeader/PageHeader'
import Navbar from '../../components/nav/Navbar'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {

    if(isError) {
      console.log(message)
    }

    //if request is successful we navigate to the users dashboard
    if(isSuccess && user) {
      navigate('/')
    }

    //after everything has been shecked we then reset back to initial state
    dispatch(reset)
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
        email,
        password
    }

    dispatch(login(userData))
  }

  return (
    <section className='login-page'>
      <PageHeader page={'login'}/>
      <div className='login-body'>
        <div className="login-container">       
          <div className='login-form-container'>
            <form onSubmit={onSubmit} className='login-form'>
              <div className="form-group-login">
                <label for="email" className='form-label'>Username or Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email"
                  name="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group-login">
                <label for="password" className='form-label'>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password"
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group-login">
                <button className="btn-login" type="submit">Login</button>
              </div>
            </form>
          </div>
          <div className='login-divider'>
            <hr/>
            <h3>OR</h3>
            <hr/>
          </div>
          <div className='other-logins'>
            <button className='other-btns' id='googleBtn'>Login with Google</button>
            <button className='other-btns' id='githubBtn'>Login with Github</button>
            <button className='other-btns' id='twitterBtn'>Login with Twitter</button>
          </div>
        </div>
        <div id='signup-link'>Need an account? <a href='/register' id='a'><span id='link'>Sign up now!</span></a></div>
      </div>
    </section>
  )
}

export default Login