import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";



export default function Workout(props) {
    const { workoutPlan } = props;
    return (
        <SectionWrapper id={'workout'} header={'Welcome to'} title={["The", "Stronger", "zone"]}>
            <div className='flex flex-col gap-4'>
                {workoutPlan.map((exercise, index) => {
                    return (
                        <ExerciseCard i={index} exercise={exercise} />
                    )
                })}
            </div>
        </SectionWrapper>
    )
}