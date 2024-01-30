import './roompage.css'
import { useDispatch } from 'react-redux'
import TaskAddForm from '../../components/forms/taskForm/TaskAddForm'
import Boards from '../../components/boards/Boards'
import { getRoom } from '../../redux/reducers/roomSlicer'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AnimatePage from '../../components/animate/AnimatePage';

export default function RoomPage() {

    const { name } = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRoom(name))
    }, [])


    function leave(params) {
        navigate(`/`)
    }

    return (
        <AnimatePage>
            <div className='room-page'>
                <div className="room-page__info">
                    <h1 className='room-page__name'>{name}</h1>
                    <button className='room-page__leave' onClick={leave}>Покинуть Комнату</button>
                </div>
                <div className="room-page__task-bords">
                    <TaskAddForm />
                    <Boards />
                </div>
            </div>
        </AnimatePage>
    )
}
