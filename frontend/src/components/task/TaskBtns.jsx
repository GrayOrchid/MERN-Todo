import { Link } from "react-router-dom";

export function TaskBtns({ task, handleDelete }) {
    return (
        <div className='todos__task-btns'>
            <div className="todos__task-btns-inner">
                <h5 className='todos__task-btn __red' onClick={() => handleDelete(task)}>Удалить</h5>
                <h5 className='todos__task-btn __green'><Link to={`/task/${task._id}`}>Открыть</Link></h5>
            </div>
        </div >
    );
}
