import { Link } from "react-router-dom";
import { MdNavigateNext, MdOutlineDelete, MdCheckCircleOutline } from "react-icons/md";
import EditTaskForm from "../forms/taskForm/EditTaskForm";
import './uiComponents.css'
import SubtaskFormEditor from "../forms/subtaskForm/SubtaskEditorForm";

export function TaskBtns({ taskData, handleDelete, completeSubtask, type }) {
    return (
        <div className='task__btns'>
            <div className="task__btns-inner">
                <MdOutlineDelete className='task__btn __red' onClick={() => handleDelete(taskData)} />
                {type === 'task' ?
                    <EditTaskForm className='task__btn' taskId={taskData._id} />
                    :
                    <SubtaskFormEditor className='task__btn' SubTaskId={taskData?._id} />}
                {type === 'subtask' && < MdCheckCircleOutline className='task__btn ' onClick={() => completeSubtask(taskData)} />}
                {type === 'task' && (<Link className='task__btn __green' to={`/task/${taskData?._id}`}> <MdNavigateNext /></Link>)}
            </div>
        </div >
    );
}
