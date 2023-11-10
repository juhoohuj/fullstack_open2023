
const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }
  const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
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
        {props.parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <div>
        <h3>Number of exercises {total}</h3>
      </div>
    )
  }

  export default Course