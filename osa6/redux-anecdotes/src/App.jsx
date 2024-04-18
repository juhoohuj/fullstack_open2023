import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  },[])

  const [notification, setNotification] = useState("")
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification notification={notification} />
      <AnecdoteList />
      <h2>Create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App