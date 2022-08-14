import { useState } from 'react'
import React from 'react'

/*  adds cells with corresponding values to the HTML table  */

const StatisticLine = props => {
  const text = props.text
  if (text === "positive")
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      )
  else
      return (
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      )
}

/*  Only displays the statistics if a button has been clicked */

const Statistics = (props) => {
  const showText = props.all
  if (showText)
      return (
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={props.all}/>
            <StatisticLine text="average" value={props.average}/>
            <StatisticLine text="positive" value={props.positive}/>
          </tbody>
        </table>
      )
  else
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
}

/* 
**  calls the passed in function through props.handleClick
**  and displays button with text
*/

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

/*  takes care of the main logic of the webpage */

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const setCommonValues = (newGood, newBad, newAll) => {
    setAll(newAll)
    setAverage((newGood - newBad) / newAll)
    setPositive((100 / newAll) * newGood)
  }

  const handleGoodClick = (newValue) => {
    newValue += 1
    setGood(newValue)
    setCommonValues(newValue, bad, all + 1)
  }

  const handleNeutralClick = (newValue) => {
    newValue += 1
    setNeutral(newValue)
    setCommonValues(good, bad, all + 1)
  }

  const handleBadClick = (newValue) => {
    newValue += 1
    setBad(newValue)
    setCommonValues(good, newValue, all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGoodClick(good)} text="good"/>
      <Button handleClick={() => handleNeutralClick(neutral)} text="neutral"/>
      <Button handleClick={() => handleBadClick(bad)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App;
