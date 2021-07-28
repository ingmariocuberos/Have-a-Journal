import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginWithEmailAndPassWord, startGoogleLogin } from '../../actions/login';
import { useForm } from '../../hooks/useForm';
import v from "validator";
import { removeError, setError } from '../../actions/error';

export const LoginScreen = () => {

    const initialForm = {
        email: 'undefined@gmail.com',
        password: '123456'
    };
    
    const [ formValues, handleInputChange ] = useForm( initialForm );

    const { email, password } = formValues;
    
    const dispatch = useDispatch();    

    const { loading } = useSelector( state => state.auth );

    const valida = ( email, password ) =>{

        if( !v.isEmail(email)){
            dispatch( setError( 'Email incorrecto' ) );
            return false;
        } else if( v.isEmpty(password) ){
            dispatch( setError( 'Password incorrecto' ) );
            return false;
        }

        dispatch( removeError());
        return true;
    }

    const handleLogin = (e) =>{
        e.preventDefault();

        if( valida(email, password) ){
            dispatch( loginWithEmailAndPassWord( email, password ));
        } 
    }

    const handleGoogleLogin = () =>{
        dispatch( startGoogleLogin() );
    }


    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={ handleLogin }>

                <input 
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                    autoComplete="off" />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                    className="auth__input" />

                <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={ loading }
                > Login
                </button>
                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </>
    )
}
