import React from 'react'
import CreateRoom from '../components/forms/roomForms/CreateRoom'
import AnimatePage from '../components/animate/AnimatePage'

export default function LoginPage() {
    return (
        <AnimatePage>
            <div className='page'>
                <CreateRoom />
            </div>
        </AnimatePage>
    )
}
