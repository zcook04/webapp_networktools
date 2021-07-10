import React from 'react'
import '../css/header.css'

function header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-logo">LOGO</div>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <a href="/">HOME</a>
                        </li>
                        <li>
                            <a href="/tools">TOOLS</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default header
