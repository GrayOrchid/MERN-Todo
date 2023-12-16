import React from 'react'
import './homepage.css'
import AnimatePage from '../components/AnimatePage'
import { Link } from 'react-router-dom'
export default function HomePage() {

    return (
        <AnimatePage>
            <div className='homepage'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1000, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
            >
                <div className="homepage__text">
                    <h1 className='homepage__title'>React Todolist</h1>
                    <p className='homepage__subtitle'>Создавайте комнаты ,  зовите туда членов своей команды и комментируйте задачи  для оптизации своей работы.</p>
                </div>
                <div className="homepage__btns">
                    <Link to='create-room'>CJPLFNM</Link>
                    <Link to='get-room'>Найти</Link>
                </div>
            </div>
        </AnimatePage>
    )
}
