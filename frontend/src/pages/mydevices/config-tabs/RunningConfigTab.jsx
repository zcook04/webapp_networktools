import React from 'react'

function RunningConfigTab(props) {
    return (
        <>
            {props.cfg && props.cfg.map((i, key) => <div key={key}>{i}</div>)}
        </>
    )
}

export default RunningConfigTab
