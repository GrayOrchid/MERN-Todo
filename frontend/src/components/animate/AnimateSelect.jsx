import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function AnimateSelect({ children, y }) {
    console.log(y);
    return (
        <motion.div
            initial={{ opacity: 0, y: y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: y }}
            transition={{ duration: 0.1 }}>
            {children}
        </motion.div>

    )
}
