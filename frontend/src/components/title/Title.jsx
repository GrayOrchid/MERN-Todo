import React from 'react'

export default function Title() {
    let MERNtext = [{
        text: 'M',
        color: '#599636'
    },
    {
        text: ' E',
        color: ' #FF914D'
    },
    {
        text: 'R ',
        color: ' #00D8FF'
    },
    {
        text: 'N',
        color: '#6CAC48 '
    },]
    return (
        <div className='title' style={{ display: 'flex', gap: '0 10px' }}>
            {
                MERNtext.map((item) => (
                    <h5 className='title-items' style={{ color: item.color }}>{item.text}</h5>
                ))
            }
        </div>
    )
}
