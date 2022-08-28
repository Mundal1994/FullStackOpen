import React from 'react'

/*  prints the header of the course to the website */

const Header = ({ course }) => <h1>{course}</h1>

/*  prints the total amount of exercises to the website */

const Total = ({ parts }) => {
    const initialValue = 0  
    const total = parts.reduce(
      (previousValue, currentValue) => previousValue + currentValue.exercises,
      initialValue)
    return (
      <p><b>Total of {total} exercises</b></p>
    )
}

/*  prints information about a course and its exercises */

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

/*
**  calls the above function to make sure everything
**  is printed in the right order
*/

const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name}/>
        {props.course.parts.map(part => <Part key={part.id} part={part} />)}
        <Total parts={props.course.parts}/>
      </div>
    )
}

export default Course
