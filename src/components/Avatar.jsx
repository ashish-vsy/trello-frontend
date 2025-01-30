import React from 'react'

function Avatar({ firstname, color, small, big }) {
    return (
        <div
            className={`rounded-full border border-gray-500 flex justify-center items-center cursor-pointer ${small ? 'w-6 h-6' : big ? 'w-20 h-20' : 'w-12 h-12'}`}
            style={{ backgroundColor: color }}
        >
            <p className={`text-white ${small ? 'text-md' : big ? 'text-3xl' : 'text-2xl'}`}>{firstname?.charAt(0).toUpperCase()}</p>
        </div>

    )
}

export default Avatar
