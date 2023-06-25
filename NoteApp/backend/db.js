const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/iNotePad'

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log('connected to mongo successful')
    })
}

module.exports = connectToMongo;