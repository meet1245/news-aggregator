import React from 'react'

function Search(props) {
  return (
    <div className='flex justify-center items-center cursor-pointer'>
      <div className='bg-neutral-200'>
        <input type="text" placeholder={props.placeHolder} name="search" id="search" className='bg-neutral-100 p-[5.5px] focus:outline-none'/>
      </div>
      <div className='flex justify-center items-center w-9 h-9 bg-neutral-100 rounded-sm'>
      <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

export default Search
