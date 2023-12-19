import React from 'react'
import CreateRoom from '../components/forms/roomForms/CreateRoom'
import './pages.css'
import AnimatePage from '../components/animate/AnimatePage'

export default function CreateRoomPage() {
    return (
        <AnimatePage>
            <div className='page'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1000, x: 0 }}
                exit={{ opacity: 0, x: -100 }}>
                <CreateRoom />
            </div>
        </AnimatePage>
    )
}
