import React from 'react'
import '../css/header.css'
import { Link } from 'react-router-dom'

function header(props) {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-logo">ZACK-COOK</div>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <Link to="/about">ABOUT</Link>
                        </li>
                        <li>
                            <Link to="/blog">BLOG</Link>
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
