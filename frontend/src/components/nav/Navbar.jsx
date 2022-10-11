import React from 'react'
import './nav.css'

function Navbar() {
  return (
    <div className="nav-container">
        <div className='title-wrapper'>
            <h2 className='type'>Code-Bits</h2>
        </div>
        <h4 className='editor-text'>Try our online editor</h4>
        <a className='rainbow-button' alt='Start Coding'></a>
        <div className='tab-container'>
            <div className='nav-tabs'><span className='tab-text'>Search Bits</span></div>
            <div className='nav-tabs'><span className='tab-text'>Community Bits</span></div>
            <div className='nav-tabs'><span className='tab-text'>Your Bits</span></div>
        </div>
    </div>
  )
}

export default Navbar