import React from 'react';
import icon from '../assets/icon.png'

const FileInput = (props) => {
    return (
        <>
            <label for="file" className="custom-font">{props.label}</label>
            <div className="w-full border-2 border-dashed border-black/80 p-10 ">
                <label for="file" className="flex justify-center items-center w-full h-auto space-x-5 cursor-pointer">
                    <img src={icon} alt="icon"/>
                    <div className="space-y-5">
                        <p className="custom-font">Drop Image Here</p>
                        <lable for="file" className="flex justify-center items-center space-x-2  border p-2 rounded-md ">
                            <i className="fa-solid fa-plus" />
                            <label for="file" className="custom-font">Select</label>
                        </lable>
                    </div>
                    <input type="file" id="file" className="hidden"/>
                </label>
            </div>
        </>
    );
};

export default FileInput;