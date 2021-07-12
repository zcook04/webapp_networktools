import React from 'react'
import '../css/header.css'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'

function Header(props) {
    const { isAuthenticated, user } = props.auth
    const { logout } = props
    const history = useHistory()

    const logoutHandler = () => {
        logout()
        history.push('/logout')
    }

    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-logo">
                    {isAuthenticated ? <Link to="/">{user.toUpperCase()}</Link> : <Link to="/">GUEST</Link>}
                </div>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <Link to="/mydevices">MY-DEVICES</Link>
                        </li>
                        <li>
                            <Link to="/configure" >CONFIGURE</Link>
                        </li>
                        <li>
                            <Link to="/tools">TOOLS</Link>
                        </li>
                        <li>
                            {isAuthenticated ? <Link onClick={logoutHandler}>LOGOUT</Link> : <Link to="/login">LOGIN</Link>}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

const mapDispatchToProps = {
    logout
}

const mapStateToProps = (state) => ({
    auth: state.authState
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
