import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import {loadUser} from '../actions/authActions'

function Login(props) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const history = useHistory()
    const {loadUser} = props

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post('/api/v1/user/login', {"email": email, "password": password})
            if (result.data.isAuthenticated) {
                loadUser(result)
                history.push('/')
            } else {
                console.log('Unauthorized')
            }
        } catch (err){
            console.log(err)
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
            <form action="/api/v1/user/login">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={email} onChange={changeHandler}/>
                <label htmlFor="password"></label>
                <input type="password" name="password" value={password} onChange={changeHandler}/>
                <input type="submit" onClick={submitHandler}/>

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
