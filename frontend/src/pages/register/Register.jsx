import React from 'react'
import './register.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../../features/auth/authSlice'
import PageHeader from '../../components/pageHeader/PageHeader'

function Register() {

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordV, setPasswordV] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //destructuring redux state
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
      //this displays error message if error is true
      if(isError) {
        console.log(message)
      }
  
      //if request is successful we navigate to the users dashboard
      if(isSuccess && user) {
          navigate('/')
      }
  
      //after everything has been shecked we then reset back to initial state
      dispatch(reset)
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== passwordV) {
        alert('Passwords do not match')
    } else {
        const userData = {
            username,
            email, 
            password,
        }

        //dispatching register user function from auth files
        dispatch(register(userData))
    }
  }

  return (
    <section className='register-page'>
      <PageHeader page={'register'}/>
      <div className="register-body">
        <div className="register-container">
          <div className="register-form-container">
            <form onSubmit={onSubmit} className='register-form'>
              <div className="form-group">
                  <label for="username" className='form-label'>Username</label>
                  <input 
                      type="name" 
                      className="form-control" 
                      id="username"
                      name="username" 
                      value={username} 
                      onChange={(e) => setUserName(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <label for="email" className='form-label'>Email</label>
                  <input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      name="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="form-group">
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
              <div className="form-group top-group">
                <label for="name" className='form-label'>Confirm password</label>
                  <input 
                      type="password" 
                      className="form-control" 
                      id="password"
                      name="password" 
                      value={passwordV} 
                      onChange={(e) => setPasswordV(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <button className="btn-register" type="submit">
                      Register
                  </button>
              </div>
            </form>
          </div>
          <div className='register-divider'>
            <hr/>
            <h3>OR</h3>
            <hr/>
          </div>
          <div className='other-options'>
            <button className='other-btns' id='googleBtn'>Sign up with Google</button>
            <button className='other-btns' id='githubBtn'>Sign up with Github</button>
            <button className='other-btns' id='twitterBtn'>Sign up with Twitter</button>
          </div>
        </div>
        <div id='login-link'>Already have an account? <a href='/login' id='a'><span id='link'>Login here!</span></a></div>
      </div>
    </section>
  )
}

export default Register