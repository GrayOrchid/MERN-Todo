import React from 'react'
import './pages.css'
import AnimatePage from '../components/animate/AnimatePage'
import { Link } from 'react-router-dom'
export default function HomePage() {

    return (
        <AnimatePage>
            <div className='page homepage'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1000, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
            >
                <div className="homepage__text">
                    <h1 className='homepage__title'>React Todolist</h1>
                    <p className='homepage__subtitle'>Сотрудничайте в реальном времени эффективно управляйте задачами, координируйте команды и обсуждайте детали с комментариями для максимальной продуктивности.</p>
                </div>
                <div className="homepage__room-links">
                    <Link className='hompage__room-link' to='/create-room'>Создать</Link>
                    <Link className='hompage__room-link' to='/get-room'>Найти</Link>
                </div>
            </div>
        </AnimatePage>
    )
}
