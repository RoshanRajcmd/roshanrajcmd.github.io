import React from 'react';

const ChatBox = () => {

    return (
        <div className="w-72 h-96 border border-gray-300 rounded-lg mb-2 shadow-lg flex flex-col ">
            <div className="bg-green-900 text-white p-3 font-semibold rounded-t-lg rounded-br-none">
                Chat
            </div>
            <div className="flex-1 p-3 overflow-y-auto bg-transparent bg-opacity-80 backdrop-blur">
                <p>Hello! How can I help you?</p>
            </div>
        </div>
    );
};

export default ChatBox;