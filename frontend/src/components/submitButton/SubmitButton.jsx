import React from 'react';
import './submitButton.css'
export default function SubmitButton({ status, text, disabled }) {


    return (
        <>
            {status === 'loading' ?
                <span className='form__submitting'>
                    Загрузка
                </span>
                :
                <button className='form__btn' disabled={disabled}>
                    {text}
                </button>
            }
        </>
    )

}