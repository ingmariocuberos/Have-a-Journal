import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from "react-redux";
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset] = useForm( active );
    const { id: activeId, title, body, url } = formValues;
    const activeNoteId = useRef( active.id )

    useEffect(() => {
        if( active.id !== activeNoteId.current){
            reset(active);
            activeNoteId.current = active.id;
        }
    }, [active, reset])

    useEffect(() => {

        dispatch( activeNote( activeId, {...formValues}) );
        
    }, [activeId, dispatch, formValues]);

    const handleDelete = ( ) =>{

        dispatch(startDeleting(activeId));

    }

    
    
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange={ handleInputChange }
                    value= { title }
                />
                <textarea
                    placeholder="What happened today"
                    name='body'
                    className="notes__textarea"
                    onChange={ handleInputChange }
                    value={ body }
                ></textarea>

                <div className="notes__image">
                    
                    {
                        url &&
                        <img
                            name='url'
                            src={ url }
                            alt="imagen" />
                    }
                    
                </div>


            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
            
        </div>
    )
}
