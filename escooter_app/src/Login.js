import React from 'react'
import './Login.css'

function Login() {
    return (
        <div className="login">
           <h1>WELCOME!</h1> 
<p>Would you like to sign up or continue as a guest?</p>
<button class="login_button">LOGIN</button>
<button class="login_guest">GUEST</button>
        </div>
    )
}

export default Login
