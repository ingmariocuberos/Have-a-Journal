import React, { useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { saveInFirestore, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const { active } = useSelector( state => state.notes );

    const { date } = active;

    const momentDate = moment(date).format("dddd, MMMM Do YYYY");

   

    const handleSave = () =>{
        
        dispatch( saveInFirestore( active ) );
        
    }

    const refUploadPicture = useRef(null)

    const handlePictureClick = () =>{
        refUploadPicture.current.click();
        console.log("Picture");

    }

    const handleFileChange = (e) =>{

        const file = e.target.files;

        if(file){
            dispatch( startUploading(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>{ momentDate }</span>

            <input 
                type="file"
                style={{display: 'none'}}
                onChange={ handleFileChange }
                ref={ refUploadPicture } />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }>
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleSave }>
                    Save
                </button>
            </div>
            
        </div>
    )
}
