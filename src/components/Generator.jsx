import { useState } from 'react';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { WORKOUTS, SCHEMES } from '../utils/swoldier';
import Button from './Button';

function Header(props) {
    const { index, title, description } = props;
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center gap-2'>
                <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
                <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
            </div>
            <p className='text-sm sm:text-base mx-auto'>{description}</p>
        </div>
    )
}

export default function Generator(props) {
    const { workout, muscles, goals, setWorkout, setMuscles, setGoals, updateWorkoutPlan } = props;
    let [showModal, setShowModal] = useState(false);
    function toggleModal() {
        setShowModal(!showModal);
    }
    function updateMuscles(muscle) {
        let updatedMuscles;
        if (muscles.includes(muscle)) {
            updatedMuscles = muscles.filter(m => m !== muscle);
        } else {
            // Prevent adding more than 3 muscles
            if (muscles.length >= 3) {
                return;
            }
            updatedMuscles = [...muscles, muscle];
        }

        if (workout !== 'individual') {
            setMuscles([muscle]);
            setShowModal(false);
            return;
        }

        setMuscles(updatedMuscles);

        if (updatedMuscles.length === 3) {
            setShowModal(false);
        }
    }
    return (
        <SectionWrapper id={'generate'} header={'generate your workout'} title={["It's", "Huge", "o'clock"]}>
            <Header index={'01'} title={'Pick your workout'} description={'Select the workout you wish to endure'} />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {Object.keys(WORKOUTS).map((type, typeIndex) => {
                    return (
                        <button onClick={() => { setWorkout(type); setMuscles([]); }} className={'bg-slate-950 border duration-200 hover:border-blue-600 py-4 rounded-lg ' + (type === workout ? 'border-blue-600 ' : 'border-blue-400 ')} key={typeIndex}>
                            <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
                        </button>
                    )
                })}
            </div>
            <Header index={'02'} title={'Lock on targets'} description={'Select the muscles judged for annihilation'} />
            <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
                <button onClick={toggleModal} className='relative p-3 flex items-center justify-center'>
                    <p className='capitalize'>{muscles.length === 0 ? 'Select muscle groups' : muscles.join(' ')}</p>
                    <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
                </button>
                {showModal && (
                    <div className='flex flex-col p-3 gap-4'>{(workout === 'individual' ? WORKOUTS['individual'] : Object.keys(WORKOUTS[workout])).map((muscle, muscleIndex) => {
                        return (
                            <button key={muscleIndex} className={'hover:text-blue-400 duration-200' + (muscles.includes(muscle) ? ' text-blue-400' : ' ')} onClick={() => updateMuscles(muscle)}>
                                <p className='text-center uppercase'>{muscle.replaceAll('_', ' ')}</p>
                            </button>
                        )
                    })}</div>
                )}
            </div>
            <Header index={'03'} title={'Become Juggernaut'} description={'Select the scheme you wish to endure'} />
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
                    return (
                        <button onClick={() => setGoals(scheme)} className={'bg-slate-950 border duration-200 hover:border-blue-600 py-4 rounded-lg ' + (scheme === goals ? 'border-blue-600 ' : 'border-blue-400 ')} key={schemeIndex}>
                            <p className='capitalize'>{scheme.replaceAll('_', ' ')}</p>
                        </button>
                    )
                })}
            </div>
            <Button func={updateWorkoutPlan} text={'Generate Workout'} />
        </SectionWrapper>

    )
}
