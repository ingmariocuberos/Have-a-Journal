import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { firebase } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from '../actions/login';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) =>{
            
            if(user?.uid){
                dispatch( login( user.uid , user.displayName ));
                setIsLoggedIn(true);

                dispatch( startLoadingNotes(user.uid) );
               
            } else {
                setIsLoggedIn(false);
            }

            setIsLoading(false);            
        })
    }, []);

    if(isLoading){
        return (
            <h1>Espere por favor...</h1>
        )
    }

    return (
        <>
            <Router>
                <div>
                    <Switch>
                        <PublicRoute isAutenticated={ isLoggedIn } path='/auth' component={ AuthRouter }/>
                        <PrivateRoute isAutenticated={ isLoggedIn } exact path="/" component={ JournalScreen }/>

                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </Router>
        </>
    )
}
