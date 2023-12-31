import React from 'react'
import './pages.css'
import UserRegisterForm from '../components/forms/authForm/UserRegisterForm'
import AnimatePage from '../components/animate/AnimatePage'

export default function RegisterPage() {
    return (
        <AnimatePage>
            <div className='page'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1000, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
            >
                <UserRegisterForm />
            </div>
        </AnimatePage>
    )
}
