import { useState } from "react";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function TaskBtns({ task, handleDelete }) {
    let [openDeleteModal, setOpenDeleteModal] = useState(false)
    let { error, status } = useSelector(state => state.todo)
    console.log(status);
    return (
        <div className='todos__task-btns'>
            <div className="todos__task-btns-inner">
                <h5 className='todos__task-btn __red' onClick={() => setOpenDeleteModal(true)}>Удалить</h5>
                <h5 className='todos__task-btn __green'><Link to={`/task/${task._id}`}>Открыть</Link></h5>
            </div>
            <Modal open={openDeleteModal} status={status} setOpen={setOpenDeleteModal} >
                <div className="todos__task-delete-btns">
                    <h3 className='todos__task-delete-btn __red' onClick={() => handleDelete(task)}>Удалить</h3>
                    <h3 className='todos__task-delete-btn __green' onClick={() => setOpenDeleteModal(false)}>Закрыть</h3>
                </div>
            </Modal>
        </div >
    );
}
