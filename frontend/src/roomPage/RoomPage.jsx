import './roompage.css'
import { useDispatch, useSelector } from 'react-redux'
import TaskAddForm from '../components/forms/taskForm/TaskAddForm'
import Boards from '../components/boards/Boards'
import { getRoom, removeTag } from '../redux/reducers/roomSlicer'
import { MdOutlineDelete } from "react-icons/md";
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function RoomPage() {

    let { room, tag } = useSelector(state => state.room)
    let { name } = useParams()
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoom(name))
    }, [])

    let clearTagsFilter = () => {
        dispatch(getRoom(room.name))
        dispatch(removeTag())
    }

    function leave(params) {
        navigate(`/`)
    }
    return (

        <div className='room-page'>
            <h1>{name}</h1>
            <h1 onClick={leave}>Выйти Комнапта</h1>
            <TaskAddForm />
            {tag && (<span className='room-page__tag' >{tag} <MdOutlineDelete className='room-page__tag-clear' onClick={() => clearTagsFilter()} /> </span>)}
            {room && room._id ? <Boards /> : null}
        </div>
    )
}
