import React, { useState } from 'react'
import './Homepage.css'

function Homepage() {
    const[isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div>
      <div className="navbar">
        <div>Website name</div>
        <div>
            {isLoggedIn ? <div>Dashboard</div> : <div>Login/Sign-Up</div>}
        </div>
      </div>
      <div className='PstCmp'>
        <div>Post a Competition</div>
      </div>
    </div>
  )
}

export default Homepage
