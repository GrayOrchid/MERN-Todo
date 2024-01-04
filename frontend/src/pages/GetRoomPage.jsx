import React from 'react'
import GetRoom from '../components/forms/roomForms/GetRoom'
import AnimatePage from '../components/animate/AnimatePage'

export default function LoginPage() {
    return (
        <AnimatePage>
            <div className='page'>
                <GetRoom />
            </div>
        </AnimatePage>
    )
}
