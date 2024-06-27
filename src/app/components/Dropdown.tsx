import React, { useState } from 'react';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        className="bg-[#282624] w-full text-white px-4 py-2 rounded-2xl flex items-center justify-between font-semibold"
        onClick={toggleDropdown}
      >
        Mode
        <svg
          className={`w-50 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className=" left-2/3 transform mt-2 bg-white rounded-md shadow-lg w-[full]">
          <div className="py-1 min-w-4">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full min-w-4"
            >
              Reading Alone
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Study With Other
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Study Live
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;