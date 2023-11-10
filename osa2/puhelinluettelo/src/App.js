import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState()

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      phone: phoneNumber,
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setPhoneNumber('')
  }

  const filterPersons = (event) => {
    console.log(event.target.value)
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    console.log(filteredPersons)
    setPersons(filteredPersons)
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input type='text' onChange={filterPersons} />
      </div>
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
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name} {person.phone}</div>)}
      </div>
    </div>
    
  )

}

export default App