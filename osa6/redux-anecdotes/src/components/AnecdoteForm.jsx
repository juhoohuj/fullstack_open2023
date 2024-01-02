import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    dispatch(createAnecdote(content))
  }
  return (
    <div>
      <form onSubmit={createNew}>
        <input name="anecdote" />
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm