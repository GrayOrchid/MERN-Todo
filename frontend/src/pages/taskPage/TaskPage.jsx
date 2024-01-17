import React from 'react'
import './taskPage.css'
import { Link, useParams } from 'react-router-dom'
import SubtaskForm from '../../components/forms/subtaskForm/SubtaskForm';
import SubTaskBoard from '../../components/subtasks/SubTaskBoard';


export default function TaskPage() {
    let { _id } = useParams()
    return (
        <div className='task-page'>
            <Link to='/'>BACK</Link>
            <SubtaskForm _id={_id} />
            <SubTaskBoard _id={_id} />
        </div>
    );
}
