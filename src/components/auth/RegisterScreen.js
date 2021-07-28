import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from '../../hooks/useForm';
import v from "validator";
import { removeError, setError } from '../../actions/error';
import { registerWithEmailAndPassword } from '../../actions/login';

export const RegisterScreen = () => {

    const initialRegister = {
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    }

    const dispatch = useDispatch();

    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange] = useForm( initialRegister );

    const { name , email, password, password2 } = formValues;

    const validation = (name, email, password, password2) =>{

        if( v.isEmpty(name)){
            dispatch( setError('Debe ingresar un nombre'));
            return false;
        } else if( v.escape(name).includes(";") ){
            dispatch(setError('Ingrese un nombre válido'))
            return false;
        } else if( !v.isEmail(email) ){
            dispatch(setError('Ingrese un email válido'));
            return false;
        } else if( password !== password2 || password.length < 5 ){
            dispatch(setError('Passwords incorrectos'));
            return false;
        }

        dispatch(removeError());

        return true;
    }

    const handleRegister = (e) =>{
        e.preventDefault();

        const valida = validation(name, email, password, password2);
        

        if( valida ){
            dispatch(registerWithEmailAndPassword(email, password, name));
        }
        
    }

    

    return (
        <>
            <h3 className="auth__title">Register</h3>

            {
                msgError !== null 
                ?
                <div className="auth__alert-error">{ msgError }</div>
                :
                undefined
            }

            <form onSubmit={ handleRegister }>
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                    autoComplete="off" />
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

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    value={ password2 }
                    onChange={ handleInputChange }
                    className="auth__input" />

                <button
                        type="submit"
                        className="btn btn-primary btn-block mb-5"
                > Register
                </button>         
                

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    ¿Already registered?
                </Link>
            </form>
        </>
    )
}
