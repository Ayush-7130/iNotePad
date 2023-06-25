import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const noteInitial = [];
    const [Notes, setNotes] = useState(noteInitial);


    // GET Notes
    const getNotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    };


    // ADD Notes
    const addNotes = async (title, description, tag) => {
        const url = `${host}/api/notes/addnotes`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(Notes.concat(note));
    };


    // DELETE Notes
    const deleteNotes = async (id) => {
        const url = `${host}/api/notes/deletenotes/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        
        const newNotes = Notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        // console.log(id);
    };


    // EDIT Notes
    const editNotes = async (id, title, description, tag) => {
        const url = `${host}/api/notes/updatenotes/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);

        // New Updated Notes
        let newNotes = JSON.parse(JSON.stringify(Notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };


    return (
        <NoteContext.Provider value={{ Notes, addNotes, deleteNotes, editNotes, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;