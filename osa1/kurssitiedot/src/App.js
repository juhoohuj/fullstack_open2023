
const Header = (props) => {
  return (
    <div>
      <h1> {props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
      <p> {props.part.name} {props.part.exercises} </p>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  const total = props.first + props.second + props.third
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      
      <Content parts={[parts[0], parts[1], parts[2]]} />

      <Total first={parts[0].exercises} second={parts[1].exercises} third={parts[2].exercises} />
    </div>
  )
}

export default App
