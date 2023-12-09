import React from 'react'

export default function FormErrors({ error }) {
    return (
        <>
            {error?.length > 0 && (
                <ul className='form__errors'>
                    {error.map((err, index) => (
                        <li className='form__error' key={index}>{err.msg}</li>
                    ))}
                </ul>
            )}
        </>
    )
}
