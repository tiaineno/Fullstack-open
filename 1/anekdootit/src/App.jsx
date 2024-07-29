import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <div>
    <button onClick={onClick}>
      {text}
    </button>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(Array(8).fill(0))
  const randomint = () => (Math.floor(Math.random() * 8))
  const [selected, setSelected] = useState(randomint)
  const newValue = () => setSelected(randomint())

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    if (points[maxVotes]<copy[selected]){
      setMaxVotes(selected)
    }
  }

  const [maxVotes, setMaxVotes] = useState(0)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p> {anecdotes[selected]}<br/>has {points[selected]} votes </p>
      <Button onClick={vote} text="vote" />
      <Button onClick={newValue} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotes]}<br/>has {points[maxVotes]} votes</p>
    </div>
  )
}

export default App