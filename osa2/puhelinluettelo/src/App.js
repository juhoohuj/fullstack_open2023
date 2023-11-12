import { useState } from 'react'

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
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


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState()
  const [filterTerm, setFilterTerm] = useState('')

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterTerm.toLowerCase()))

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



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
    
  )

}

export default App