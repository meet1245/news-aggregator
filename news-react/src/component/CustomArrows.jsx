import React from 'react';

// Custom Left Arrow
const CustomLeftArrow = ({ onClick }) => {
    return (
        <button
            className="custom-arrow custom-left-arrow absolute top-1/2 left-4 bg-black text-gray-800 rounded-full px-3 shadow-md p-2 z-10"
            onClick={onClick}
            aria-label="Previous"
        >
            <i className="fa-solid fa-circle-arrow-left text-white" />
        </button>
    );
};

// Custom Right Arrow
const CustomRightArrow = ({ onClick }) => {
    return (
        <button
            className="custom-arrow custom-right-arrow absolute top-1/2 right-4 bg-black text-gray-800 rounded-full shadow-md p-2 px-3 z-10"
            onClick={onClick}
            aria-label="Next"
        >
            <i className="fa-solid fa-circle-arrow-right text-white" />
        </button>
    );
};

export { CustomLeftArrow, CustomRightArrow };
