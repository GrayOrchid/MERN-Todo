import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FormErrors({ error }) {
    return (
        <AnimatePresence>
            {error?.length > 0 && (
                <motion.ul
                    className='form-page__form-errors'
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {error.map((err, index) => (
                        <motion.li
                            className='form-page__error'
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {err.msg}
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    );
}
