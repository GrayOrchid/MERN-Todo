import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../forms/form.css';

export default function Form({ children, title, submit, error }) {
    return (
        <AnimatePresence>
            <motion.div
                className='form'
                initial={{ scale: 1 }}
                animate={{ scale: error ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                exit={{ scale: 1 }}
            >
                <h3 className='form__title'>{title}</h3>
                <form className='form__form' onSubmit={submit}>
                    {children}
                </form>
            </motion.div>
        </AnimatePresence>
    );
}
