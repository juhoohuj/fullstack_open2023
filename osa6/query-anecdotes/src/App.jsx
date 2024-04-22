import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNotification } from './components/NotificationContext'



const App = () => {
  const { dispatch } = useNotification()
  const queryClient = useQueryClient();
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: false,  // Consider setting retry to a small number or handling retries more dynamically based on the error
    onError: (error) => {
      // Optional: Log errors or handle additional side effects
      console.error("Error fetching anecdotes:", error);
    }
  });

  const updateVote = async (anecdote) => {
    try {
      await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 });
    } catch (error) {
      console.error("Failed to update vote:", error);
    }
  };

  const updateAnecdoteMutation = useMutation({ mutationFn: updateVote, onSuccess: () => queryClient.invalidateQueries(['anecdotes']) });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote);
    dispatch({ type: 'ADD_NOTIFICATION', message: `You voted for '${anecdote.content}'` });
  };

  //if no connection to server
  if (result.isError) {
    return <div>Anecdote server not available due to problems in server</div>;
  }

  //if connection but data is loading
  if (result.isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  return (
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {result.data?.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
  );
};

export default App;
