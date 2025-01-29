import React, { useState } from 'react';

function Avatar({ firstname, color, small, big }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`relative rounded-full border border-gray-500 flex justify-center items-center cursor-pointer 
                ${small ? 'w-6 h-6' : big ? 'w-20 h-20' : 'w-12 h-12'}`}
            style={{ backgroundColor: color }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {!hover ? (
                <p className={`text-white ${small ? 'text-md' : big ? 'text-3xl' : 'text-2xl'}`}>
                    {firstname?.charAt(0).toUpperCase()}
                </p>
            ) : (
                <>
                <p className={`text-white ${small ? 'text-md' : big ? 'text-3xl' : 'text-2xl'}`}>
                    {firstname?.charAt(0).toUpperCase()}
                </p>
                <p className={`absolute -top-8 left-1/2 -translate-x-1/2 text-white bg-gray-800 px-2 py-1 rounded-lg text-sm whitespace-nowrap z-10`}>
                    {firstname}
                </p>
                </>
            )}
        </div>
    );
}

export default Avatar;