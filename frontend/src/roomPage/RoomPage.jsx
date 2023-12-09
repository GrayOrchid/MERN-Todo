import './roompage.css'
import { useDispatch, useSelector } from 'react-redux'
import TaskAddForm from '../components/forms/taskForm/TaskAddForm'
import Boards from '../components/boards/Boards'
import { getRoom, removeTag } from '../redux/reducers/roomSlicer'
import { MdOutlineDelete } from "react-icons/md";

export default function RoomPage() {

    let { room, tag } = useSelector(state => state.room)
    let dispatch = useDispatch()
    let clearTagsFilter = () => {
        dispatch(getRoom(room.name))
        dispatch(removeTag())
    }
    return (
        <div className='room-page'>
            <TaskAddForm />
            {tag && (<span className='room-page__tag' >{tag} <MdOutlineDelete className='room-page__tag-clear' onClick={() => clearTagsFilter()} /> </span>)}
            {room && room._id ? <Boards /> : null}
        </div>
    )
}