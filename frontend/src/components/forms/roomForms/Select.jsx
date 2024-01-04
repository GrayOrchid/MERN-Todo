import React, { useState } from 'react';
import { IoCaretDownSharp } from 'react-icons/io5';
import { FaRegCopy } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';

export default function Select({ storedOptions, setStoredOptions, setSelectedRoom }) {
    let [isOpen, setIsOpen] = React.useState(false);

    let copyToClipboard = (option) => {
        navigator.clipboard.writeText(option);
    };

    let removeOption = (option) => {
        let newOptions = storedOptions.filter((storedOption) => storedOption !== option);
        setStoredOptions(newOptions);
        window.localStorage.setItem('options', JSON.stringify(newOptions));
    };

    return (
        <div className='dropdown'>
            <div className='dropdown__btn' onClick={() => setIsOpen(!isOpen)}>
                Выбрать <IoCaretDownSharp className={isOpen ? 'dropdown__btn-arrow __active-dropdown__btn-arrow' : 'dropdown__btn-arrow'} />
            </div>
            <div className={isOpen ? 'dropdown__content __dropdown-active' : 'dropdown__content'}>
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
            </div>
        </div>
    );
}
