import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/data'
import Filter from './components/filter'
import Add from './components/add'
import List from './components/list'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      update(newNumber, newName)
    }else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification([`Added ${returnedPerson.name}`,'green'])
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          })
      }
    }
  
  const removeName = (id,name) => {
    if (window.confirm(`Delete ${name}?`)){
      personService
        .remove(id)
        .then(updatedPerson=> {setPersons(persons.filter(p => p.id !== id))
          setNotification([`Removed ${name}`,'red'])
          setTimeout(() => {
            setNotification(null)
          }, 5000)})
        .catch(error => {
          setNotification([`${name} has already been deleted from the server`,'red'])
          setTimeout(() => {
            setNotification(null)
          }, 5000)})
          setPersons(persons.filter(p => p.name !== name))
    }
  }

  const update = (number, name) => {
    if (window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)){
      const id = persons.find(p => p.name === name)?.id
      const object = {'number': number, 'name':name}
      personService
        .update(id, object)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification([`Updated ${returnedPerson.name}`,'green'])
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          })
        .catch(error => {
          setNotification([`${name} has already been deleted from the server`,'red'])
          setTimeout(() => {
            setNotification(null)
          }, 5000)})
          setPersons(persons.filter(p => p.name !== name))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const searchResult = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter onChange={handleSearchChange} search={search} />
      <h2>add a new</h2>
      <Add
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addName={addName}
      />
      <h2>Numbers</h2>
      <List searchResult={searchResult} removeName={removeName}/>
    </div>
  )

}

export default App