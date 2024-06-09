import React from 'react';

const Button = (props) => {
    return (
        <>
            <div className={props.class}>
                <button
                    type={props.type}
                    className={`flex justify-center items-center  ${props.icon ? 'gap-2 px-2' : ' '} bg-button/80 text-white custom-font p-2 rounded-md`}
                    onClick={props.click}
                >
                    <i className={props.icon}/>
                    {props.name}
                </button>
            </div>
        </>
    );
};

export default Button;
