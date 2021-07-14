import React, {useEffect} from 'react'
import '../css/header.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, loadUser } from '../actions/authActions'
import { resetDevices } from '../actions/deviceActions'

function Header(props) {
    const { isAuthenticated, username } = props.auth
    const { logout, loadUser, resetDevices } = props

    const logoutHandler = () => {
        logout()
        resetDevices()
    }

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-logo">
                    {isAuthenticated ? <Link to="/">{username && username.toUpperCase()}</Link> : <Link to="/">GUEST</Link>}
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
                            {isAuthenticated ? <Link to="" onClick={logoutHandler}>LOGOUT</Link> : <Link to="/login">LOGIN</Link>}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

const mapDispatchToProps = {
    logout,
    loadUser,
    resetDevices
}

const mapStateToProps = (state) => ({
    auth: state.authState,
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
