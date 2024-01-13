import './roompage.css'
import { useDispatch, useSelector } from 'react-redux'
import TaskAddForm from '../../components/forms/taskForm/TaskAddForm'
import Boards from '../../components/boards/Boards'
import { getRoom, removeTag } from '../../redux/reducers/roomSlicer'
import { MdOutlineDelete } from "react-icons/md";
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function RoomPage() {

    const { room, tag } = useSelector(state => state.room)
    const { name } = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoom(name))
    }, [])

    const clearTagsFilter = () => {
        dispatch(getRoom(room.name))
        dispatch(removeTag())
    }

    function leave(params) {
        navigate(`/`)
    }

    return (
        <div className='room-page'>
            <div className="room-page__info">
                <h1 className='room-page__name'>{name}</h1>
                <button className='room-page__leave' onClick={leave}>Покинуть Комнату</button>
            </div>
            <div className="room-page__task-bords">
                <TaskAddForm />
                {tag && (<span className='room-page__tag' >{tag} <MdOutlineDelete className='room-page__tag-clear' onClick={() => clearTagsFilter()} /> </span>)}
                <Boards />
            </div>
        </div>
    )
}
