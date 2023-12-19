import React from 'react'
import LoginForm from '../components/forms/authPages/LoginForm'
import './pages.css'
import AnimatePage from '../components/animate/AnimatePage'

export default function LoginPage() {
    return (
        <AnimatePage>
            <div className='page'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1000, x: 0 }}
                exit={{ opacity: 0, x: -100 }}>
                <LoginForm />
            </div>
        </AnimatePage>
    )
}
