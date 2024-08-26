import React, { useContext, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Context } from '../context/Context';
import Navbar from './Navbar';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, newChat } = useContext(Context);
  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [resultData]);

  useEffect(() => {
    console.log('showResult:', showResult);
    console.log('loading:', loading);
    console.log('resultData:', resultData);
  }, [showResult, loading, resultData]);

  const suggestionCards = [
    { text: "Can you help me correct grammar errors in my writing?", icon: assets.writing },
    { text: "Can you recommend techniques to overcome language learning challenges?", icon: assets.bulb_icon },
    { text: "How can I practice speaking fluently in English?", icon: assets.speak },
    { text: "What are the best resources for learning grammar in a new language?", icon: assets.message_icon }
  ];

  const handleCardClick = (text) => {
    setInput(text);
    onSent(text);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && input) {
      onSent();
    }
  };

  return (
    <div className='flex-1 min-h-screen pb-32 relative max-w-full mx-auto'>
      
      <div className="flex items-center justify-between text-lg pt-3 px-10 pb-10 text-gray-500 max-w-4xl mx-auto sm:px-6 lg:px-8">

      <Navbar/>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showResult ? (
          <>
            <div className="text-2xl sm:text-4xl text-gray-400 font-medium ml-10 mb-6 sm:mb-8">
              <p><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 sm:text-4xl">Hello People,</span></p>
              <p className='text-md sm:text-2xl mt-2'>I'm an AI-powered language assistant app for effortless communication.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-10">
              {suggestionCards.map((item, index) => (
                <div 
                  key={index} 
                  className="h-auto sm:h-52 p-4 bg-gray-100 rounded-lg relative cursor-pointer hover:bg-gray-200"
                  onClick={() => handleCardClick(item.text)}
                >
                  <p className="text-gray-500 text-sm sm:text-base mb-8">{item.text}</p>
                  <img src={item.icon} alt="icon" className="w-8 sm:w-9 p-1 absolute bg-white rounded-full bottom-2 right-2" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div 
            ref={resultRef}
            className='max-h-[calc(100vh-200px)] overflow-y-auto scroll-smooth ml-10'
          >
            <div className="my-5 sm:my-10 p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 sm:gap-5 mb-4">
                <img src={assets.dummy} alt="user icon" className="w-8 sm:w-10 rounded-full" />
                <p className="text-sm sm:text-base font-medium text-gray-800">{recentPrompt}</p>
              </div>
              <div className="flex items-start gap-3 sm:gap-5">
                <img src={assets.ltl_icon} alt="AI icon" className="w-8 sm:w-10 rounded-full mt-1" />
                <div className="flex-1">
                  {loading ? (
                    <div className='w-full flex flex-col gap-2'>
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="w-full h-4 sm:h-5 rounded-md bg-gradient-to-r from-blue-300 to-white animate-pulse"></div>
                      ))}
                    </div>
                  ) : resultData ? (
                    <div 
                      className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap break-words  "
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    ></div>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-500">Waiting for response...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-4xl px-4 mr-10 sm:px-6  lg:px-8 mx-auto ">
          <div className="flex items-center justify-between gap-3  sm:gap-5 bg-gray-100 px-3 sm:px-5 py-4 sm:py-3 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder='Message LearnThisLang'
              className="flex-1 bg-transparent border-none outline-none p-1 sm:p-2 text-sm sm:text-lg"
            />
            <div className="flex items-center gap-2 sm:gap-4 ">
              <img src={assets.gallery_icon} alt="gallery icon" className="w-5 sm:w-6 cursor-pointer hidden sm:flex" />
              <img src={assets.mic_icon} alt="mic icon" className="w-5 sm:w-6 cursor-pointer hidden sm:flex" />
              {input && <img onClick={() => onSent()} src={assets.send_icon} alt="send icon" className="w-5 sm:w-6 cursor-pointer" />}
            </div>
          </div>
          <p className="text-xs text-center font-light mt-2 mb-2 sm:mt-4">
            LearnThisLang can make mistakes, so double-check its response.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
