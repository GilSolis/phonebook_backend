
const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://admin:${password}@cluster0.qjxfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

const Contact = mongoose.model('Phonebook', phonebookSchema)

const contact = new Contact({
    name: 'Billy Bob',
    number: '111-111-1111'
    
  })

// contact.save().then(result => {
//   console.log(`added ${contact.name} number ${contact.number} to phonebook`)
//   mongoose.connection.close()
// })

Contact.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })