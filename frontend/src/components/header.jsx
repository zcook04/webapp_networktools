import React from 'react'
import '../css/header.css'

function header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-logo">ZACK-COOK</div>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <a href="/about">ABOUT</a>
                        </li>
                        <li>
                            <a href="/">BLOG</a>
                        </li>
                        <li>
                            <a href="/tools">TOOLS</a>
                        </li>
                        <li><a href="/login">LOGIN</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default header
