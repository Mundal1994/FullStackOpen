const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(express.json())
//app.use(morgan("tiny"))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let notes = [
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
    }
]

app.get('/info', (request, response) => {
    const people = '<p>Phonebook has info for ' + notes.length + ' people</p>'
    var dateString = new Date().toUTCString();
    response.send(people + dateString)
  })

app.get('/api/persons', (request, response) => {
    response.json(notes)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
  })

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}

function valueExist(name)
{
    for (var i = 0; i < notes.length; i++)
    {
        if (notes[i].name == name)
            return (1)
    }
    return (0)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    else if (valueExist(body.name) == 1) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const note = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    
    notes = notes.concat(note)
    response.json(note)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
