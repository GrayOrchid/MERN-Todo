import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './modal.css';

export default function Modal({ children, open, setOpen, status }) {
    useEffect(() => {
        if (status === 'resolved' && !open) {
            setOpen(false);
        }
    }, [status, open, setOpen]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="modal modal--active"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.5
                    }}
                    onClick={handleClose}
                >
                    <div className="modal__body" onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
