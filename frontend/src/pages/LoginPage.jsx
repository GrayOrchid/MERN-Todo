import React from 'react'
import LoginForm from '../components/forms/authForm/LoginFrom'
import AnimatePage from '../components/animate/AnimatePage'

export default function LoginPage() {
    return (
        <AnimatePage>
            <div className='page'>
                <LoginForm />
            </div>
        </AnimatePage>
    )
}
