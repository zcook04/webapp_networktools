import React from 'react'
import '../css/header.css'
import { Link } from 'react-router-dom'

function header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-logo">
                    <Link to="/">ZACK-COOK</Link>
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
                        <li><Link to="/login">LOGIN</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default (header)
