import AnimatePage from '../components/animate/AnimatePage'
import GetRoom from '../components/forms/roomForms/GetRoom'
import './pages.css'
import React from 'react'

export default function GetRoomPage() {
    return (
        <AnimatePage>
            <div className='page'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1000, x: 0 }}
                exit={{ opacity: 0, x: -100 }}>
                <GetRoom />
            </div>
        </AnimatePage>
    )
}

