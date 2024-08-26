import React, { useState, useContext } from "react";
import { Context } from '../context/Context'; // Assuming you have this context

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="h-screen flex">
      <aside
        className={`relative flex flex-col shrink-0 h-full bg-sky-50 p-3 transition-width duration-500 ${
          open ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="mb-12 size-10 grid place-items-center hover:bg-sky-100 rounded-full active:bg-sky-200"
        >
          <svg viewBox="0 0 448 512" className="size-4">
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
        </button>

        <button
          onClick={newChat}
          className={`relative transition-width duration-300 h-10 overflow-hidden px-3 flex gap-4 items-center bg-sky-100 rounded-full hover:bg-sky-200 active:bg-sky-300 ${
            open ? "w-36" : "w-10"
          }`}
        >
          <svg viewBox="0 0 448 512" className="size-4 shrink-0">
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
          <span
            className={`absolute text-sm left-11 truncate transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            New chat
          </span>
        </button>

        {open && (
          <div className="mt-4 mb-auto overflow-y-auto">
            <p className="text-sm font-semibold mb-2">Recent</p>
            {prevPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => loadPrompt(prompt)}
                className="w-full text-left mb-2 px-3 py-2 text-sm rounded-lg hover:bg-sky-100 active:bg-sky-200 truncate"
              >
                {prompt.slice(0, 30)}...
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <button className="relative w-full transition-width duration-300 h-10 overflow-hidden px-3 flex gap-4 items-center rounded-full hover:bg-sky-100 active:bg-sky-200">
            <svg viewBox="0 0 512 512" className="size-4">
              <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
            </svg>
            <span
              className={`absolute text-sm left-11 truncate transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Help
            </span>
          </button>

          <button className="relative w-full transition-width duration-300 h-10 overflow-hidden px-3 flex gap-4 items-center rounded-full hover:bg-sky-100 active:bg-sky-200">
            <svg viewBox="0 0 512 512" className="size-4">
              <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z" />
            </svg>
            <span
              className={`absolute text-sm left-11 truncate transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Activity
            </span>
          </button>

          <button className="relative w-full transition-width duration-300 h-10 overflow-hidden px-3 flex gap-4 items-center rounded-full hover:bg-sky-100 active:bg-sky-200">
            <svg viewBox="0 0 512 512" className="size-4">
              <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
            </svg>
            <span
              className={`absolute text-sm left-11 truncate transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Settings
            </span>
          </button>
        </div>
      </aside>
      <main className="overflow-y-scroll w-full">{/* put your page content here */}</main>
    </div>
  );
};

export default Sidebar;