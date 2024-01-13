import React, { useState } from 'react';
import { IoCaretDownSharp } from 'react-icons/io5';
import { FaRegCopy } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

export default function Select({ storedOptions, setStoredOptions, setSelectedRoom }) {
    const [isOpen, setIsOpen] = useState(false);

    const copyToClipboard = (option) => {
        navigator.clipboard.writeText(option);
    };

    const removeOption = (option) => {
        const newOptions = storedOptions.filter((storedOption) => storedOption !== option);
        setStoredOptions(newOptions);
        window.localStorage.setItem('options', JSON.stringify(newOptions));
    };

    return (
        <div className='dropdown'>
            <div className='dropdown__btn' onClick={() => setIsOpen(!isOpen)}>
                Выбрать <IoCaretDownSharp className={isOpen ? 'dropdown__btn-arrow __active-dropdown__btn-arrow' : 'dropdown__btn-arrow'} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='dropdown__content'
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.2,
                            damping: 20
                        }}
                        exit={{ opacity: 0, y: -100 }}
                    >
                        {storedOptions?.map((option) => (
                            <div className='dropdown__item' key={option}>
                                <div
                                    className='dropdown__item-text'
                                    onClick={() => {
                                        setSelectedRoom(option);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option}
                                </div>
                                <div className='dropdown__item-btns'>
                                    <FaRegCopy className='dropdown__item-btn __purple-dropdown__item-btn' onClick={() => copyToClipboard(option)} />
                                    <MdOutlineDelete className='dropdown__item-btn __red-dropdown__item-btn' onClick={() => removeOption(option)} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
