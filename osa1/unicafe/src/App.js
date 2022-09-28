import './App.css';
import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handle}>{props.text}</button>
  )
}

const Statisticline = (props) => {
  return(
    <p>{props.line} {props.stat}</p>
  )
}


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad)  / all
  const pos = (good / all) * 100 + " %"

  if (all === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return(

    <table>
      <tbody>
        <tr>
          <td><Statisticline line ="Good" stat={good}/></td>
          <td><Statisticline line ="Neutral" stat={neutral}/></td>
          <td><Statisticline line ="Bad" stat={bad}/></td>
          <td><Statisticline line ="All" stat={all}/></td>
          <td><Statisticline line ="Average" stat={avg}/></td>
          <td><Statisticline line ="Positive" stat={pos}/></td>
        </tr>
      </tbody>
    </table>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  function handleGood () {
    setGood(good + 1)
    setAll(all + 1)
    
  }

  function handleNeutral () {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  
  function handleBad ()  {
    setBad(bad + 1)
    setAll(all + 1)
  }




  return (
    <div>
      <div>
      <h2>give feedback</h2>
      <Button handle={handleGood} text="good"/>
      <Button handle={handleNeutral} text="neutral"/>
      <Button handle={handleBad} text="bad"/>
      </div>

      <div>
        <h2>statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} /> 
      </div>
    </div>
  );
}

export default App;
