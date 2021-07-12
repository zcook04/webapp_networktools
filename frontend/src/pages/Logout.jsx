import React from 'react'
import {connect} from 'react-redux'

function Logout(props) {
    const { isAuthenticated } = props.auth
    return (
        <div className="page-wrapper">
            {!isAuthenticated && <h3>You are currently logged out</h3>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.authState
})

export default connect(mapStateToProps)(Logout)