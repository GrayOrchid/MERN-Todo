import React from 'react'
import './pages.css'
import UserRegisterForm from '../components/forms/authForm/UserRegisterForm'
import AnimatePage from '../components/animate/AnimatePage'

export default function RegisterPage() {
    return (
        <AnimatePage>
            <div className='page'>
                <UserRegisterForm />
            </div>
        </AnimatePage>
    )
}
