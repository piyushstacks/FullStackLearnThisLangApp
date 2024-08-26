import { createContext, useState } from "react";
export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }

    // const onSent = async (prompt) => {


    //     setResultData("");
    //     setLoading(true);
    //     setShowResult(true);
    //     let response;
    //     if (prompt !== undefined) {
    //         response = await runChat(prompt);
    //         setRecentPrompt(prompt);
    //     }
    //     else {
    //         setPrevPrompts(prev => [...prev, input]);
    //         setRecentPrompt(input);
    //         response = await runChat(input);
    //     }

    //     let responseArray = response.split("**");
    //     let newResponse = "";
    //     for (let i = 0; i < responseArray.length; i++) {
    //         if (i == 0 || i % 2 !== 1) {
    //             newResponse += responseArray[i];
    //         }
    //         else {
    //             newResponse += "<b>" + responseArray[i] + "</b>"
    //         }

    //     }
    //     let newResponse2 = newResponse.split("*").join("</br>");
    //     let newResponseArray = newResponse2.split(" ");
    //     for (let i = 0; i < newResponseArray.length; i++) {
    //         const nextWord = newResponseArray[i];
    //         delayPara(i, nextWord + " ");
    //     }
    //     setLoading(false);
    //     setInput("");
    // }
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
          response = await runChatOnServer(prompt);
          setRecentPrompt(prompt);
        } else {
          setPrevPrompts(prev => [...prev, input]);
          setRecentPrompt(input);
          response = await runChatOnServer(input);
        }
      
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
          if (i == 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
          } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
          }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
          const nextWord = newResponseArray[i];
          delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
      };
      
      const runChatOnServer = async (prompt) => {
        console.log(prompt);
        try {
          console.log('Sending request to:', 'http://localhost:5000/runChat');
          const response = await fetch('http://localhost:5000/runChat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
          });
      
          console.log('Response status:', response.status);
          
          if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log('Received data:', data);
      
          if (!data || !data.response) {
            throw new Error("Invalid response from server");
          }
      
          return data.response;
        } catch (error) {
          console.error("Detailed error:", error);
          return "Something went wrong. Please try again.";
        }
      };
      
      
      
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;