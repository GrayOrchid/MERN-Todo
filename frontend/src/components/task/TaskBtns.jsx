import { Link } from "react-router-dom";
import { MdNavigateNext, MdOutlineDelete } from "react-icons/md";
import EditTaskForm from "../forms/taskForm/EditTaskForm";

export function TaskBtns({ task, handleDelete }) {

    return (
        <div className='todos__task-btns'>
            <div className="todos__task-btns-inner">
                <MdOutlineDelete className='todos__task-btn __red' onClick={() => handleDelete(task)} />
                <EditTaskForm taskId={task._id} />
                <Link className='todos__task-btn __green' to={`/task/${task._id}`}> <MdNavigateNext /></Link>
            </div>
        </div >
    );
}
