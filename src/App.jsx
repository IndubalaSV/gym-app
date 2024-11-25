import React from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import { useState } from 'react'
import { generateWorkout } from './utils/function'

function App() {
  let [workoutPlan, setWorkoutPlan] = useState([])
  let [workout, setWorkout] = useState('individual');
  let [muscles, setMuscles] = useState([]);
  let [goals, setGoals] = useState('strength_power');

  function updateWorkoutPlan() {
    if (muscles.length < 1) {
      return
    }
    let newWorkoutPlan = generateWorkout({ workout, muscles, goal: goals });
    setWorkoutPlan(newWorkoutPlan);
    window.location.href = '#workout';
  }

  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      <Hero />
      <Generator
        workout={workout}
        muscles={muscles}
        goals={goals}
        setWorkout={setWorkout}
        setMuscles={setMuscles}
        setGoals={setGoals}
        updateWorkoutPlan={updateWorkoutPlan}
      />
      {workout && <Workout workoutPlan={workoutPlan} />}
    </main>
  )
}

export default App
