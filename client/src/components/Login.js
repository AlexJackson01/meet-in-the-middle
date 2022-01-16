import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Logo from '../images/Meet-in-Middle.png';


export default function Login() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorRegMsg, setErrorRegMsg] = useState("");
    const [errorLoginMsg, setErrorLoginMsg] = useState("");
    const [showLogin, setShowLogin] = useState(false);


    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            routeChange();
            console.log(result);
        }).catch((err) => {
            console.log(err);
        })
    }
    


    const routeChange = () => {
        navigate('/home');
    }

    const register = async (e) => {
        try {
            e.preventDefault();
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
            routeChange();
        } catch (error) {
            console.log(error.message);
            setErrorRegMsg(error.message);
        }
    }

    const login = async (e) => {
        try {
            e.preventDefault();
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            routeChange();
        } catch (error) {
            console.log(error.message);
            setErrorLoginMsg(error.message);
        }
    }


    return (
    <div className="container">
            {/* <img src={Logo} alt="" /> */}
            <h1>Register</h1>
      <form className="login-form">
        <div className="row">
      <div className="col-lg-6 col-xs-6 col-sm-6">
        <div className="form-group">
        <input onChange={(e) => { setRegisterEmail(e.target.value) }} className="form-control input-group-lg header" placeholder="Email" autoComplete="username" />
                        </div>
          </div>

    {/* <div className="row"> */}
      <div className="col-lg-6 col-xs-6 col-sm-6">
      <div className="form-group">
                    <input type="password" onChange={(e) => { setRegisterPassword(e.target.value) }} className="form-control input-group-lg header" placeholder="Password" autoComplete="current-password" />
            </div>
                        </div>
            <div className="row">
        <div className="login-error">{errorRegMsg}</div>
                        </div>          
      <div className="search-btn">
            <button onClick={register}>Register</button>
          </div>
                </div>

                <div className='remove-link' onClick={() => setShowLogin(true)}>Already have an account?</div>
      </form>              
                
                
            {showLogin ? (
                <div>
                    <h1>Login</h1>
                    <form className="login-form">
                        <div className="row">
                                  <div className="col-lg-12 col-xs-12 col-sm-12">
                                <button type="button" className="login-with-google-btn" onClick={() => signInWithGoogle()}>Sign in with Google</button>
                                <button type="button" className="loginBtn loginBtn--facebook">Sign in with Facebook</button>

</div></div>
        <div className="row">
      <div className="col-lg-6 col-xs-6 col-sm-6">
        <div className="form-group">
                    <input type="email" onChange={(e) => { setLoginEmail(e.target.value) }} className="form-control input-group-lg header" placeholder="Email" autoComplete="username" />
                        </div>
          </div>
      <div className="col-lg-6 col-xs-6 col-sm-6">
      <div className="form-group">
                    <input type="password" onChange={(e) => { setLoginPassword(e.target.value) }} className="form-control input-group-lg header" placeholder="Password" autoComplete="current-password" />
                    </div></div>
          <div className="login-error">{errorLoginMsg}</div>          
      <div className="search-btn">
                <button onClick={login}>Login</button>
          </div>
        </div>
                    </form>
                    </div>
                )
 : null
    }
    </div>


    )
}
