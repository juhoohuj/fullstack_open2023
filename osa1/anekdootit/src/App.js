import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [mostVotes, setMostVotes] = useState()

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomAnecdote () {
    const randomNumber = randomNumberInRange(0, anecdotes.length - 1)
    setSelected([randomNumber])
  }

  function vote () {
    const copy = [...points]
    copy[selected] +=1
    setPoints([...copy])

    const mostVotes = Math.max(...copy)
    const ind = copy.indexOf(mostVotes)
    setMostVotes(anecdotes[ind])
  }



  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <button onClick={randomAnecdote}>Random quote</button>
        <p>{anecdotes[selected]}</p>
        <p>Votes {points[selected]}</p>
        <button onClick={vote}>Vote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{mostVotes}</p>
      </div>
    </div>
  )
}

export default App;
