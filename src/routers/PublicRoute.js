import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PublicRoute = ({
    isAutenticated,
    component:Component,
    ...rest
}) => {
    return (
        <Route {...rest} isAutenticated={ isAutenticated } component={ (props)=>(
            !isAutenticated
            ?
            <Component {...props} />
            :
            <Redirect to="/" />
        ) } />

    )
}

PublicRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

export default PublicRoute
