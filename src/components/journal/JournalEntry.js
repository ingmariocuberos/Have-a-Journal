import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

const JournalEntry = ( { id, note } ) => {

    const {date, title, body, url} = note;

    const dispatch = useDispatch();

    const handleActive = () =>{

        dispatch( activeNote(id, {
            date, title, body, url
        }) 
        );

    }

    return (
        <>
        <div 
            className="journal__entry pointer"
            onClick={ handleActive }>

            {
                url &&
                <div 
                    className="journal_entry-picture"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${url})`
                    }}></div>
            }
            

                <div className="journal__entry-body">
                    <p className="journal__entry-title">
                        { title }
                    </p>
                    <p className="journal__entry-content">
                        { body } 
                    </p>
                </div>
                <div className="journal__entry-date-box">
                    <span> { moment(date).format('dddd') } </span>
                    <h4>{ moment(date).format('Do') }</h4>
                </div>
            
        </div>
        </>
    )
}

JournalEntry.propTypes = {

}

export default JournalEntry
