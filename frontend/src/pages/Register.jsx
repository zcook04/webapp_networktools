import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import { connect } from 'react-redux'
import { loadUser } from '../actions/authActions'

function Register(props) {
    const {loadUser} = props
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registered, setRegistered] = useState(false)
    const history = useHistory()

    const submitHandler = async (e) => {
        e.preventDefault()
        const result = await axios.post('/api/v1/user/register', {'username': username, 'password': password, 'email': email})
        if (result.data.isAuthenticated){
            setRegistered(true)
            loadUser(result)
            setTimeout(()=> {history.push('/')}, 3000)
        } else {
            console.log('Error Registering')
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

    return (
        <div className="page-wrapper">
            <form className="login-form-wrapper" action="/api/v1/user/login">
                {!registered ? <h2>REGISTER</h2> : <h2>SUCCESS! Logging In...</h2>}
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
    loadUser
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
