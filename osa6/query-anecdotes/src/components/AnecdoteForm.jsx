import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useNotification } from "./NotificationContext"


const AnecdoteForm = () => {

  const { dispatch } = useNotification()

  const queryClient = useQueryClient()

  const createAnecdote = newAnecdote => {
    return axios.post('http://localhost:3001/anecdotes', { content: newAnecdote, votes: 0 })
  }

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes'),
      dispatch({ type: 'ADD_NOTIFICATION', message: `new anecdote created` })},
    onError: (error) => 
      dispatch({ type: 'ADD_NOTIFICATION', message: `Failed to create anecdote: ${error.message}`})
    })

  const onCreate = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(anecdote)
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
