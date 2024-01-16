import React from 'react'
import './taskPage.css'
import { Link, useParams } from 'react-router-dom'
import SubtaskForm from '../../components/forms/subtaskForm/SubtaskForm';
import TaskBoard from '../../components/taskBoard/TaskBoard';

export default function TaskPage() {
    let { _id } = useParams()
    return (
        <div className='task-page'>
            <Link to='/'>BACK</Link>
            <SubtaskForm _id={_id} />
            <TaskBoard _id={_id} />
        </div>
    );
}
