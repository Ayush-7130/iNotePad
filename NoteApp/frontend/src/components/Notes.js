import React, { useContext, useState, useEffect, useRef } from 'react'
import notecontext from "../context/notes/NoteContext";

import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(notecontext);
    const { Notes, getNotes, editNotes } = context;

    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token') == null)
        {
            navigate('/login');
        }
        else
        {
            getNotes();
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    const updateNote = (currentNote) => {
        console.log("update");
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    
    const handleClick = (e) => {
        refClose.current.click();
        editNotes(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <AddNotes showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content edit-back">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-sel" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label text-sel">Title</label>
                                    <input type="email" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label text-sel">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label text-sel">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary text-sel" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary text-sel" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h2 className='text-sel'>Your Notes</h2>
                <div className='container mx-2 text-sel'>
                    {Notes.length === 0 && 'No Notes to Display'}
                </div>
                {Notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </div>
    )
}

export default Notes