const Course = ({ course }) => {
    const list = course.parts.map(part =>
      <li key={part.id}>
        {part.name} {part.exercises}
      </li>
      )
  
    const total = course.parts.reduce((a, b) => a + b.exercises, 0)
  
    return (
      <div>
        <h2>{course.name}</h2>
        <ul>
          {list}
        </ul>
        <h3>total of {total} exercises</h3>
      </div>
    )
  }

export default Course