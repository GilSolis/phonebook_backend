const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

// const Contact = mongoose.model('Phonebook', phonebookSchema)

module.exports = mongoose.model('Phonebook', phonebookSchema)
