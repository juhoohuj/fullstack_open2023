
const Header = (props) => {
  return (
    <div>
      <h1> {props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
      <p> {props.part} {props.exercises} </p>
  )
}

const Content = () => {

  return (
    <div>
      <Part part="Fundamentals of React" exercises="10" />
      <Part part="Using props to pass data" exercises="7" />
      <Part part="State of a component" exercises="" />
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course={course} />
      <Content />
      <Total first={exercises1} second={exercises2} third={exercises3} />
    </div>
  )
}

export default App
