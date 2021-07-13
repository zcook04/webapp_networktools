import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { register, clearErrors } from '../actions/authActions'

function Register(props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registered, setRegistered] = useState(false)
    const [error, setError] = useState(false)

    const {register, clearErrors} = props
    const history = useHistory()

    const submitHandler = async (e) => {
        e.preventDefault()
            await register({'username': username, 'password': password, 'email': email})
            if (props.auth.isAuthenticated){
                setRegistered(true)
                setTimeout(()=> {history.push('/')}, 2000)
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
            case 'username':
                setUsername(e.target.value)
                break;
            default:
                break;
            }
    }

    useEffect(() => {
        if(props.auth.error) {
            switch(props.auth.error.message){
                case 'Request failed with status code 409':
                    setErrorMessage('A User With That Email Already Exists')
                    break;
                default:
                    setErrorMessage(props.auth.error.message)
                    break;
            }
            setTimeout(() => clearErrors(), 2000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.auth.error])

    const setErrorMessage =(msg) => {
        setError(msg)
        setTimeout(()=> setError(false), 2500)
    }



    return (
        <div className="page-wrapper">
            <form className="login-form-wrapper" action="/api/v1/user/login">
                {!registered ? <h2>REGISTER</h2> : <h2>SUCCESS! Logging In...</h2>}
                {error && error}
                <input placeholder="Name" className="login-email-pass" type="text" name="username" value={username} onChange={changeHandler}/>
                <input placeholder="Email" className="login-email-pass" type="text" name="email" value={email} onChange={changeHandler}/>
                <input placeholder="Password" className="login-email-pass" type="password" name="password" value={password} onChange={changeHandler}/>
                <input className="login-submit-btn" type="submit" onClick={submitHandler} value="Register"/>
                <p>Already Have An Account? <Link to="/login">Login Instead</Link></p>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    register,
    clearErrors
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
