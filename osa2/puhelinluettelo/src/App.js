import { useEffect, useState } from 'react'
import axios from 'axios'
import pService from './services/persons'

const Persons = ({ persons, deleteperson }) => {
  return (
    <div>
      {persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deleteperson(person.id)}>delete</button></p>)}
    </div>
  )
}

const Filter = ({ filterTerm, setFilterTerm }) => {
  return (
    <div>
      filter shown with <input type='text' onChange={e => setFilterTerm(e.target.value)} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, phoneNumber, setPhoneNumber, addPerson }) => {
  return (
    <form>
      <div>
        name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        phonenumber: <input type='text' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <div/>
        <button type="submit" onClick={addPerson}>add</button>
      </div>
    </form>
  )
}

const Notification = ({ message, notiColor }) => {

  const error = {
    color: notiColor,
    fontStyle: 'italic',
    fontSize: 16,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }
  return (
    <div style={error}>
      {message}
    </div>
  )

}





const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState()
  const [filterTerm, setFilterTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notiColor, setNotiColor] = useState('')

  useEffect(() => {
    pService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: phoneNumber,
    }

    const person = persons.find(p => p.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(person.id)
      }
      setNotiColor('green')
      return
    }

    pService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setPhoneNumber('')
        setNotiColor('green')
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotiColor('red')
        setErrorMessage(error.response.data.error)
        (console.log(error.response.data))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updatePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: phoneNumber }

    pService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== id ? p : response))
        setNewName('')
        setPhoneNumber('')
        setNotiColor('yellow')
        setErrorMessage(`Updated ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(error => {
        setNotiColor('red')
        setErrorMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      pService
        .deleteOne(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotiColor('red')
          setErrorMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }).catch(error => {
          setNotiColor('red')
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    }

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} notiColor={notiColor}/>
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} deleteperson={deletePerson} />
    </div>
    
  )

}



export default App