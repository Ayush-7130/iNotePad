import React, { useContext } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import notecontext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const context = useContext(notecontext);
    const { deleteNotes } = context;
    const { note, updateNote } = props;

    const onDelete = () => {
        deleteNotes(note._id);
        props.showAlert("Note Deleted", "success");
    };

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className='mx-2' ><AiOutlineEdit onClick={() => { updateNote(note) }} /></i>
                        <i className='mx-2' ><AiOutlineDelete onClick={onDelete} /></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem