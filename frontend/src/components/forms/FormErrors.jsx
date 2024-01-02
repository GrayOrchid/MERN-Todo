import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FormErrors({ error }) {
    return (
        <>
            {
                error?.message && (
                    <AnimatePresence>
                        <span className='form__error-login form__error'
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                        > {error?.message} </span>
                    </AnimatePresence>
                )
            }
            {error?.length > 0 && (
                <ul className='form__errors'>
                    <AnimatePresence>
                        {error?.map((err, index) => (
                            <motion.li
                                className='form__error'
                                key={index}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                            >
                                {err.msg}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            )}
        </>
    );
}
