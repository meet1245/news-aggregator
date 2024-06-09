import React from 'react';

const Input = (props) => {
    return (
       <>
           <div className="flex-col">
           <label className="custom-font">{props.label}</label>
           <div className="relative">
               <input
                   onChange={props.change}
                   type={props.type}
                   placeholder={props.placeholder}
                   autoComplete={props.autoComplete}
                   value={props.value}
                   name={props.name}
                   className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
               />
               <div className="absolute inset-y-1 right-1 flex justify-end">
                   <label
                       className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
                   >
                       <i className={props.icon} />
                   </label>
               </div>
           </div>
           </div>
       </>
    );
};

export default Input;