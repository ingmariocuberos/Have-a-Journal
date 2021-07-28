import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./error";

export const startGoogleLogin = () =>{
    return ( dispatch ) =>{
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName ))
            });
    }
}

export const login = (uid, displayName) =>({
    type: types.login,
    payload: {
        uid: uid,
        displayName: displayName
    }
});

export const logout = () =>({
    type: types.logout
})

export const loginWithEmailAndPassWord = (email, password) =>{
    return (dispatch)=>{
        dispatch( startLoading() );
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user })=>{
                dispatch( login( user.uid, user.displayName ));
                dispatch( finishLoading() );
            }
                
            ).catch(err => {
                console.log(err);
                dispatch( finishLoading() );
                Swal.fire('Error', err.message, 'error');
            })
        

            

    }
}

export const registerWithEmailAndPassword = ( email, password, displayName ) =>{
    return (dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({user}) =>{
                await user.updateProfile({
                    displayName: displayName
                });
                dispatch( login(user.uid, user.displayName))
            }).catch(err =>{
                Swal.fire('Error', err.message, 'error');
            });
    }
}