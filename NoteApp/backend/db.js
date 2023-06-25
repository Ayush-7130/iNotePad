const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/iNotePad'

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo successful')
    })
}

module.exports = connectToMongo;