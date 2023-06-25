import React, {useState, useContext} from 'react'
import notecontext from "../context/notes/NoteContext";

const AddNotes = (props) => {
    const context = useContext(notecontext);
    const { addNotes } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2 className='text-sel'>Add New Notes</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label text-sel">Title</label>
                    <input type="email" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-sel">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label text-sel">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary text-sel" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNotes