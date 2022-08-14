import { useState } from 'react'
import React from 'react'

const MostVoted = (props) => {
  var i = 0
  var mostVotes = -1
  var votes = 0
  while (i < 7)
  {
      if (votes < props.points[i] && props.points[i] > 0)
      {
          votes = props.points[i]
          mostVotes = i
      }
      ++i
  }
  if (mostVotes === -1)
      return (
          <p>No votes given</p>
      )
  else
      return (
          <p>{props.anecdotes[mostVotes]}</p>
      )
}

const Votetext = (props) => {
    return (
        <p>has {props.points} votes</p>
    )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const min = 0;
  const max = 7;
  var rand = min + Math.floor(Math.random() * (max - min));
  const [points, setPoints] = useState([
    0, 0, 0, 0, 0, 0, 0
  ])
  const [selected, setSelected] = useState(rand)

  const chooseAnecdote = () => {
    rand = min + Math.floor(Math.random() * (max - min));
    console.log(rand)
    setSelected(rand)
  }

  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Votetext points={points[selected]}/>
      <Button handleClick={addVote} text="vote"/>
      <Button handleClick={chooseAnecdote} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} points={points}/>
    </div>
  )
}

export default App;
