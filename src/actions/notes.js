import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { types } from "../types/types";
import Swal from "sweetalert2";


export const addNewNotes = () =>{
    return async(dispatch, getState) =>{
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activeNote( doc.id, newNote ))
    }
}

export const activeNote = ( id, note ) =>({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const saveInFirestore = ( note ) =>{
    return async( dispatch, getState) =>{

        const { uid } = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;
        
        await db.doc(`${uid}/journal/notes/${ note.id }`).update( noteToFirestore );

        Swal.fire(
            'Saving',
            'Your note was saved',
            'success'
          );

        dispatch(startLoadingNotes(uid));
        
    }
} 


export const loadNotes = async( uid ) =>{
    
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();

    const notes = [];

    notesSnap.forEach( snapHijo =>{
        
        notes.push({
            id: snapHijo.id,
            note: snapHijo.data()
        })
    });

    return notes;
};

const setNotes = ( notes )=>({
    type: types.notesLoad,
    payload: notes
});

export const startLoadingNotes = ( uid ) =>{
    return async (dispatch) =>{
        const notes = await loadNotes( uid );        
        dispatch(setNotes( notes ));
    }
}

export const startUploading = ( file ) =>{
    return async( dispatch, getState ) =>{
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () =>{
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch( saveInFirestore( activeNote ))

        Swal.close();
        

    }
}

export const startDeleting = (id) =>{
    return async(dispatch, getState) =>{

        const uid = getState().auth.uid;

            await db.doc(`${uid}/journal/notes/${id}`).delete();

            dispatch( deleteNote( id ) );


    }
}

export const deleteNote = ( id ) =>({
    type: types.notesDelete,
    payload: id
});

export const logoutNotes = () =>({
    type: types.notesLogoutCleaning,
})
