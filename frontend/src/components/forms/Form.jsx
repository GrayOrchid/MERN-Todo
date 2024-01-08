import React from 'react'
import '../../forms/form.css';
export default function Form({ children }) {
    return (
        <div className='form'>
            <h3 className='form__title'>Создать задачу</h3>
            <form action="">
                {children}
            </form>
        </div>
    )
}
