import { useState, useEffect } from 'react'
import axios from 'axios'
import personComponent from './components/Server'
import './index.css'

/*  deletes element from both webpage and server */

const Delete = (props) => {
  const deleteUser = (props) => {
    if (window.confirm(`Do you wish to delete '${props.person.name}' ?`)) {
      let temp = props.persons.filter((elem) => {
        return elem.id !== props.person.id;
      })
      personComponent.DeletePerson(props.person.id)
      props.setPersons(temp)
      props.showListFunction(props.filterBy, temp)
    }
  }
  return (
    <button onClick={() => deleteUser(props)}>
      Delete
    </button>
  )
}

/*  Displays a filtered list of the people and numbers */

const Persons = (props) => (
  <ul>
    {props.showList.map(person =>
      <p key={person.id}>{person.name} {person.number} <Delete person={person} persons={props.persons} setPersons={props.setPersons} showListFunction={props.showListFunction} filterBy={props.filterBy}/></p>
    )}
  </ul>
)

/*  Takes care of the logic of registrering what to filter by */

const Filter = (props) => (
  <div>
    filter shown with <input 
    value={props.filterBy} 
    onChange={props.handleFilterChange}
    />
  </div>
)

/*  Takes care of submitting a new name and number */

const PersonForm = (props) => (
  <form onSubmit={props.addName}>
    <div>
      name: <input 
      value={props.newName.name} 
      onChange={props.handleNameChange}
      />
    </div>
    <div>
      number: <input 
      value={props.newName.number} 
      onChange={props.handleNumberChange}
      />
    </div>
    <button type="submit">add</button>
  </form>
)

/*  Notification that is displayed for a few seconds at the top of the page */

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }
  else if (messageType === null){
    return (
      <div className='added'>
        {message}
      </div>
    )
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

/*  Core logic and defined functions */

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({name: '', number: '', id: ''})
  const [filterBy, setFilterBy] = useState('')
  const [showList, setShowList] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShowList(response.data)
      })
  }, [])

  const showListFunction = (str, persons) => {
    if (str === '')
      setShowList(persons)
    else
      setShowList(persons.filter(person => person.name.toLowerCase().includes(str.toLowerCase())))
  }

  const addName = (event) => {
    event.preventDefault()
    const element = persons.filter((person) => person.name === newName.name)

    if (element.length){
      if (window.confirm(`${newName.name} is already added to phonebook, replace the old number with a new one?`)) {
        element[0].number = newName.number
        personComponent
          .update(element[0].id, element[0]).then(setPersons(persons.map((person) =>
          person.id !== element[0].id ? person : element[0])
        ))
          .catch(error => {
            setMessageType('error')
            setMessage(
              `'${newName.name}' was already removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          setMessageType(null)
          setMessage(
            `'${newName.name}'s' number has been changed`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      }
    }
    else
    {
      let lastId = persons[persons.length - 1].id
      const nameObject = {
        name: newName.name,
        number: newName.number,
        id: lastId + 1,
      }
      personComponent
        .create(nameObject)
      setPersons(persons.concat(nameObject))
      showListFunction(filterBy, persons.concat(nameObject))
      setMessageType(null)
      setMessage(
        `Added '${newName.name}'`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setNewName({name: '', number: ''})
  }

  const handleNameChange = (event) => {
    const nameObject = {
      ...newName,
      name: event.target.value
    }
    setNewName(nameObject)
  }

  const handleNumberChange = (event) => {
    const numberObject = {
      ...newName,
      number: event.target.value
    }
    setNewName(numberObject)
  }

  const handleFilterChange = (event) => {

    setFilterBy(event.target.value)
    showListFunction(event.target.value, persons)
  }
console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
      <Filter filterBy={filterBy} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons
        showList={showList}
        persons={persons}
        setPersons={setPersons}
        showListFunction={showListFunction}
        filterBy={filterBy}
      />
    </div>
  )
}

export default App
