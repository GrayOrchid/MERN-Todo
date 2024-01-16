import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import { MdOutlineDelete } from "react-icons/md";

export default function Tags({ tags, removeTag, addTag, watch, disabled }) {
    return (
        <>
            <div className='tags'>
                <AnimatePresence>
                    {tags?.map((item) => (
                        <motion.div className='tags_tag' key={item.id}
                            layout
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            transition={{
                                duration: .3
                            }}
                            exit={{ opacity: 0, }}
                        >
                            <span className='tags__text' >{item.tag}</span>
                            <MdOutlineDelete className='tags__remove' onClick={(e) => removeTag(item.id)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {!disabled && (<motion.span className='form-page__btn-tag '
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    transition={{
                        duration: .3
                    }}
                    exit={{ opacity: 0, }} onClick={() => addTag(watch('tag'))}  >Добавить тег</motion.span>)}
            </AnimatePresence>
        </>
    )
}
