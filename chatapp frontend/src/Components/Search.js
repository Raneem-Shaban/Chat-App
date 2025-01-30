import React from 'react';

const Search = () => {
    return (
        <div className="flex justify-center items-center w-full pl-5 h-16 bg-white relative ">
            <input 
                type="text" 
                className="font-inherit text-inherit bg-white border border-gray-300 text-gray-500 py-2 px-4 rounded-lg w-[100%] transition-all ease-in-out duration-500 focus:outline-none focus:bg-white focus:shadow-md" 
                placeholder="Search a post" 
            />
            <button className="border-none bg-white transform -translate-x-8 hover:cursor-pointer">
                <img src={'./assets/search.svg'} alt='' className='w-5' />
            </button>
        </div>
    )
}

export default Search;
