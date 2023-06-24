import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show role="alert" text-sel alert-fixed`}>
            {props.alert.type === 'danger'?  <strong>ERROR</strong>: ''} {props.alert.msg}
        </div>
    )
}
