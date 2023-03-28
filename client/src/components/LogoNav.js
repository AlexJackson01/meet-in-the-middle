import React, { useState } from 'react'
import Logo from '../images/meet-logo.png'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function LogoNav () {
  const [user, setUser] = useState({})
  const [menu, setMenu] = useState(false)

  const auth = getAuth()
  const navigate = useNavigate() // useNavigate is a feature from React Router which redirects the user if they successfully login/log out

  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser) // details of the current user are assigned to the user state
  })

  const logOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  const toggleMenu = () => {
    setMenu(!menu) // toggles menu on smaller screen sizes as the Bootstrap toggle wasn't working as well
  }

  let show = menu ? 'show' : ''

  return (
    <div className=''>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <a className='navbar-brand' href='/home'>
          <img src={Logo} alt='' className='logo-image' />
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <a className='nav-item nav-link active' href='/home'>
              HOME
            </a>
            <a className='nav-item nav-link' href='/favourites'>
              FAVOURITES
            </a>
            <a className='nav-item nav-link' href='/about'>
              HOW IT WORKS
            </a>
            <a className='nav-item nav-link' href='/contact'>
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* The user will be greeted either by name (if logged in with Google) or by their email address */}
      {user && (
        <p className='user-greeting'>
          Hello, {user.displayName ? user.displayName : user?.email}!
          <button className='logout-button' onClick={logOut}>
            LOG OUT
          </button>
        </p>
      )}
    </div>
  )
}
