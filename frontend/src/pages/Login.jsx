import React, {useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import {loadUser} from '../actions/authActions'

import '../css/login.css'

function Login(props) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [authFailed, setAuthFailed] = useState(false)

    const history = useHistory()
    const {loadUser} = props

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post('/api/v1/user/login', {"email": email, "password": password})
            if (result.data.isAuthenticated) {
                console.log('was authed')
                loadUser(result)
                history.push('/')
            } else {
                setAuthFailed(true)
                setEmail('')
                setPassword('')
                setTimeout(() => setAuthFailed(false), 3000)
            }
        } catch (err){
            setAuthFailed(true)
            setEmail('')
            setPassword('')
            setTimeout(() => setAuthFailed(false), 3000)
        }
    }

    const changeHandler = (e) => {
        switch(e.target.name) {
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break;
            }
        }


    return (
        <div className="page-wrapper">
            <form className="login-form-wrapper" action="/api/v1/user/login">
                {!authFailed ? <h2>LOGIN</h2> : <h2>AUTH FAILED</h2>}
                <input placeholder="Email" className="login-email-pass" type="text" name="email" value={email} onChange={changeHandler}/>
                <input placeholder="Password" className="login-email-pass" type="password" name="password" value={password} onChange={changeHandler}/>
                <input className="login-submit-btn" type="submit" onClick={submitHandler} value="Login"/>
                <p>Don't have an account? <Link to="/register">Register Now</Link></p>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    loadUser
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
