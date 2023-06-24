import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
    // const a = useContext(NoteContext);

    // useEffect(() => {
    //     a.update();
    // }, []);

    return (
        // <div>This is About {a.state.name} and he is in Class {a.state.Class}.</div>
        <div className='text-sel'>This is About</div>
    )
}

export default About