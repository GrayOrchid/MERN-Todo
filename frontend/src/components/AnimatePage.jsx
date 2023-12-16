import React from 'react'
import { motion } from 'framer-motion'
export default function AnimatePage({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1000, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
        >
            {children}
        </motion.div>
    )
}
