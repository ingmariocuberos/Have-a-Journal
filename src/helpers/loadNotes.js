import { db } from "../firebase/firebase-config"
import { types } from "../types/types";

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
}

const setNotes = ( notes )=>({
    type: types.notesLoad,
    payload: notes
})

