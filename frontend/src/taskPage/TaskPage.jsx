import React from 'react'
import './taskPage.css'
import { Link, useParams } from 'react-router-dom'
import SubtaskForm from '../components/forms/subtaskForm/SubtaskForm';
import TaskBoard from '../components/taskBoard/TaskBoard';
import AnimatePage from '../components/animate/AnimatePage';

export default function TaskPage() {
    let { _id } = useParams()
    return (
        <AnimatePage>
            <div className='task-page'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1000, x: 0 }}
                exit={{ opacity: 0, x: -100 }}>
                <Link to='/'>BACK</Link>
                <SubtaskForm _id={_id} />
                <TaskBoard _id={_id} />
            </div>
        </AnimatePage>
    );
}
