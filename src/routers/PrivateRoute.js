import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {
    
    return (
        <Route {...rest} isAutenticated={ isAutenticated } component={ (props) => (
            isAutenticated
            ?
            <Component {...props} />
            :
            <Redirect to="/auth/login" />
        )} 

            
        />
            
    )
}

PrivateRoute.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
}

export default PrivateRoute
