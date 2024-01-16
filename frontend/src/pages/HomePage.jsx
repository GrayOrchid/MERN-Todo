import React from 'react'
import './pages.css'
import AnimatePage from '../components/animate/AnimatePage'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../redux/reducers/authReducer'
export default function HomePage() {
    let isAuth = useSelector(selectIsAuth)
    return (

        <AnimatePage>
            <div className='page homepage'>
                <div className="homepage__text">
                    <h1 className='homepage__title'>React Todolist</h1>
                    <p className='homepage__subtitle'>Сотрудничайте в реальном времени эффективно управляйте задачами, координируйте команды и обсуждайте детали с комментариями для максимальной продуктивности.</p>
                </div>
                {isAuth ? <div className="homepage__room-links">
                    <Link className='hompage__room-link' to='/create-room'>Создать</Link>
                    <Link className='hompage__room-link' to='/get-room'>Найти</Link>
                </div> : <Link className='hompage__room-need-auth' to={'/login-page'}>Необходима авторизация</Link>}
            </div>
        </AnimatePage>
    )
}
