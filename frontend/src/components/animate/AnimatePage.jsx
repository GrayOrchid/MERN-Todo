import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'


export default function AnimatePage({ children }) {

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 100, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: .2 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
