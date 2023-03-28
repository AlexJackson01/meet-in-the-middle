import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Logo from '../images/meet-logo.png'
import Fade from 'react-reveal/Fade'

export default function Login () {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [errorRegMsg, setErrorRegMsg] = useState('')
  const [errorLoginMsg, setErrorLoginMsg] = useState('')
  const [showLogin, setShowLogin] = useState(false)

  const navigate = useNavigate()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const signInWithGoogle = () => {
    // code that allows user to log in with their google account
    signInWithPopup(auth, provider)
      .then(result => {
        const name = result.user.displayName
        localStorage.setItem('greetingName', name)
        routeChange()
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const routeChange = () => {
    navigate('/home') // using React Router, once login is successful, the page will redirect to the home page
  }

  const register = async e => {
    // code that allows user to register with an email and password
    try {
      e.preventDefault()
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
      console.log(user)
      routeChange()
    } catch (error) {
      console.log(error.message)
      setErrorRegMsg(error.message) // error message shows from Firebase if registration unsuccessful
    }
  }

  const login = async e => {
    // code that allows user to login with registered email and password
    try {
      e.preventDefault()
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      console.log(user)
      routeChange()
    } catch (error) {
      console.log(error.message)
      setErrorLoginMsg(error.message) // error message shows from Firebase if login unsuccessful
    }
  }

  return (
    <div className='login-body'>
      <div className='login-container'>
        <Fade bottom>
          <img src={Logo} className='login-logo' alt='' />
          <h4>Register</h4>
          {/* REGISTRATION FORM */}
          <form className='login-form'>
            <div className='row'>
              <div className='col-lg-6 col-xs-6 col-sm-6'>
                <div className='form-group'>
                  <input
                    onChange={e => {
                      setRegisterEmail(e.target.value)
                    }}
                    className='form-control input-group-lg header'
                    placeholder='Email'
                    autoComplete='username'
                  />
                </div>
              </div>
              <div className='col-lg-6 col-xs-6 col-sm-6'>
                <div className='form-group'>
                  <input
                    type='password'
                    onChange={e => {
                      setRegisterPassword(e.target.value)
                    }}
                    className='form-control input-group-lg header'
                    placeholder='Password'
                    autoComplete='current-password'
                  />
                </div>
              </div>

              <div className='login-error'>{errorRegMsg}</div>
              <div className='col-lg-12 col-xs-12 col-sm-12'>
                <button className='login-btn' onClick={register}>
                  Register
                </button>
              </div>
            </div>
            <div
              className='rating-link place-url'
              onClick={() => setShowLogin(true)}
            >
              Already have an account? Click here to login.
            </div>
          </form>
        </Fade>

        {showLogin ? ( // login box will appear when user clicks the link
          <div>
            <h4>Login</h4>
            {/* LOGIN FORM */}
            <form className='login-form'>
              <div className='row'>
                <div className='col-lg-12 col-xs-12 col-sm-12'>
                  <button
                    type='button'
                    className='login-with-google-btn'
                    onClick={() => signInWithGoogle()}
                  >
                    Sign in with Google
                  </button>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-6 col-xs-6 col-sm-6'>
                  <div className='form-group'>
                    <input
                      type='email'
                      onChange={e => {
                        setLoginEmail(e.target.value)
                      }}
                      className='form-control input-group-lg header'
                      placeholder='Email'
                      autoComplete='username'
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-xs-6 col-sm-6'>
                  <div className='form-group'>
                    <input
                      type='password'
                      onChange={e => {
                        setLoginPassword(e.target.value)
                      }}
                      className='form-control input-group-lg header'
                      placeholder='Password'
                      autoComplete='current-password'
                    />
                  </div>
                </div>
                <div className='login-error'>{errorLoginMsg}</div>
                <div className='col-lg-12 col-xs-12 col-sm-12'>
                  <button className='login-btn' onClick={login}>
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  )
}
