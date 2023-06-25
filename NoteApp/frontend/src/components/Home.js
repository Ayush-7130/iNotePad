import React from 'react'
import Notes from "./Notes";

const Home = (props) => {
    return (
        <div>
            <div className='container my-3 space-t'>
                <Notes showAlert={props.showAlert} />
            </div>
        </div>
    )
}

export default Home