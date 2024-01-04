import React from 'react';
import './submitButton.css'
import { Button } from '@mui/material';
export default function SubmitButton({ status, text }) {
    return (
        <>
            {status === 'loading' ?
                <Button sx={{ marginTop: '5px' }} variant="outlined" type='submit' disabled >
                    {text}
                </Button>
                :
                <Button sx={{ marginTop: '5px' }} variant="outlined" type='submit' >
                    {text}
                </Button>
            }
        </>
    )
}