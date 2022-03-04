require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())

app.use(express.json())
morgan.token("data", (request) => JSON.stringify(request.body));
app.use(
  morgan(`:method :url :status :res[content-length] - :response-time ms `)
);

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
  
    },
    { 
      "id": 5,
      "name": "Tom Tom", 
      "number": "555-555-5555"
    }
]


// app.get('/api/persons', (request, response) => {
//     response.json(persons)
//   })

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
      response.json(notes)
    })
  }) 

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
    response.json(person)
    } else {
    response.status(404).end()
  }
  })

  app.get('/info', (request, response) =>{
    let date = new Date()
    response.send(`<h3>Phonebook has info for ${persons.length} people</h3> <p>${date}</p>`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const persontoAdd = request.body
    

  if (!persontoAdd.name || !persontoAdd.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  let newName = persontoAdd.name
  let hasPerson = persons.map(person => person.name).includes(newName)
  if(hasPerson){
    return response.status(400).json({ 
        error: 'name must be unique'
  })
}  

  const person = {
    name: persontoAdd.name,
    number: persontoAdd.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
  console.log(persontoAdd)
  })

  const generateId = () => {
      return Math.random()*1000
  }


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })