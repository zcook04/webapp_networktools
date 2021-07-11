import React from 'react'
import { Link } from 'react-router-dom'

function IosTools() {
    return (
        <div className="page-wrapper">
            <Link to='/tools/ios/running-config'>Get Running Configuration</Link>
        </div>
    )
}

export default IosTools
