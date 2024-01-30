import React from 'react'
import './taskPage.css'
import { useParams } from 'react-router-dom'
import SubtaskForm from '../../components/forms/subtaskForm/SubtaskForm';
import TaskBoard from '../../components/subtasks/TaskBoard';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import AnimatePage from '../../components/animate/AnimatePage';



export default function TaskPage() {
    const { _id } = useParams()
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <AnimatePage>
            <div className='task-page'>
                <div className='task-page__content'>
                    <FaArrowLeft className='task-page__back' onClick={goBack} />
                    <SubtaskForm _id={_id} />
                    <TaskBoard _id={_id} />
                </div>
            </div>
        </AnimatePage>
    );
}
