import React from 'react'
import './pageheader.css'
import {FaSearch} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import Navbar from '../nav/Navbar'

function PageHeader(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const currBtn = props.page

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <div className='header-container'>
            <div className="search-container">
                <div className="search-icon">
                    <FaSearch className='search' size={20}/>
                </div>
                <input className='search-input'></input>
            </div>
            {currBtn === 'login' ? 
                <button className='signup-btn' onClick={() => navigate('/register')}>Sign Up</button>
            :
                currBtn === 'register' ? <button className='login-btn' onClick={() => navigate('/login')}>Login</button> 
            : 
                !user ? (
                    <>
                        <button className='signup-btn' onClick={() => navigate('/register')}>Sign Up</button>
                        <button className='login-btn' onClick={() => navigate('/login')}>Login</button>
                    </>
                ) 
            :
                <button className='login-btn' onClick={onLogout}>Logout</button>
            }
        </div>
    )
}

export default PageHeader