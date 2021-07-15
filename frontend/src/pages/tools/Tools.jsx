import React from 'react'

import ConstructionPage from '../../imgs/icons/page-under-construction.png'

function Tools(props) {
    return (
        <div className="page-wrapper">
            <div className="page-under-construction">
            <h1>Sorry, Page Under Construction</h1>
                <img src={ConstructionPage} alt="Page Under Construction" />
            </div>
        </div>
    )
}

export default Tools
