import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../Auth/AuthContext';
import './ChatForm.scss';

const Chatbot = ({ showChatbot, setShowChatbot }) => {
    const [userMessages, setUserMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef(null);
    const { currentUser } = useAuth();

    const fetchResponse = async (userChoice) => {

        const postData = {
            user_choice: userChoice,
            username: currentUser.user.userID
        }
        try {

            console.log("userChoice1111:", userChoice)
            console.log("userMessages:", userMessages)
            console.log("messageInput:", messageInput)
            console.log("postData:", postData)



            const response = await fetch("http://localhost:5000/game", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error:", error);
            return "Error fetching response from server.";
        }
    };

    const insertMessage = async () => {
        if (!messageInput.trim()) return;

        const userMessage = {
            content: messageInput,
            type: 'personal',
            timestamp: new Date().toLocaleTimeString(),
        };
        setUserMessages(prevMessages => [...prevMessages, userMessage]);

        const gameResult = await fetchResponse(messageInput);

        if (gameResult.error) {
            setUserMessages(prevMessages => [...prevMessages, { content: gameResult.error, type: 'error', timestamp: new Date().toLocaleTimeString() }]);
        } else {
            setUserMessages(prevMessages => [
                ...prevMessages,
                { content: `${gameResult.computer_choice}`, type: 'fake', timestamp: new Date().toLocaleTimeString() },
                { content: `Result: 사용자 ${gameResult.result}`, type: 'result', timestamp: new Date().toLocaleTimeString() }
            ]);
        }

        setMessageInput('');
    };

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };
        scrollToBottom();
    }, [userMessages]);

    return showChatbot && (
        <div className={`chat${showChatbot ? "" : " chat-minimized"}`}>
            <div className="chat-title">
                <button className="chat-close" onClick={() => setShowChatbot(false)}>Close</button>
            </div>
            <div className="messages">
                <div className="messages-content">
                    {userMessages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            <div>{message.content}</div>
                            <div className="timestamp">{message.timestamp}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="message-box">
                <textarea
                    id="chatbot-textarea"
                    className="message-input"
                    placeholder="Type rock, paper, or scissors..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && insertMessage()}
                />
            </div>
        </div>
    );
};

export default Chatbot;
