import React from 'react';

const SavedMessages = ({ savedMessages }) => {
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-[#FCFCFC] p-5 flex flex-col rounded-tr-[30px] rounded-br-[30px]'>
            <h2 className='text-xl font-semibold mb-4 text-center'>Saved Messages</h2>
            {savedMessages.length > 0 ? (
                <div className='flex flex-col space-y-2 '>
                    {savedMessages.map((text, index) => (
                        <div key={index} className='bg-[#F2F2F7] p-3 rounded-lg rounded-[20px] text-center'>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No saved messages</p>
            )}
        </div>
    );
};

export default SavedMessages;
