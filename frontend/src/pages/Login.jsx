import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { loadUser, login } from '../actions/authActions'

import '../css/login.css'

function Login(props) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const history = useHistory()
    const { login } = props

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            login({ "email": email, "password": password })
        } catch (err) {
            setEmail('')
            setPassword('')
        }
    }

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            history.push('/')
        } else {
            setEmail('')
            setPassword('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.auth.isAuthenticated])

    const changeHandler = (e) => {
        switch (e.target.name) {
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
                {!props.auth.loading ? <h2>LOGIN</h2> : <h2>Logging In...</h2>}
                <input placeholder="Email" className="login-email-pass" type="text" name="email" value={email} onChange={changeHandler} />
                <input placeholder="Password" className="login-email-pass" type="password" name="password" value={password} onChange={changeHandler} />
                <input className="login-submit-btn" type="submit" onClick={submitHandler} value="Login" />
                <p>Don't have an account? <Link to="/register">Register Now</Link></p>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    loadUser,
    login
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
