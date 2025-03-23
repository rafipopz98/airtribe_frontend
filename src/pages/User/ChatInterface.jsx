import React, { useState, useRef, useEffect } from "react";
import {
  SendIcon,
  MoreVertical,
  ChevronLeft,
  Paperclip,
  Mic,
  Smile,
} from "lucide-react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { ROUTERS } from "../../helpers/routes";
import { getUserData } from "../../helpers/utils";
import useApi from "../../api-call/use-api";

const socket = io("http://localhost:8080"); // Adjust this if needed

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect to socket and listen for messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    callApi({}, (data) => {
      console.log(data[0].messages, "data");
      setMessages(data[0].messages);
      console.log(data, "myr");
      console.log(data[0].stage, "stage in side");
      setStage(data[0].stage);
    });
  }, []);

  const [stage, setStage] = useState("");
  console.log(stage, "im out");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    let msgType = "send_message";
    console.log(stage, "stage");
    switch (stage) {
      case "tmay":
        msgType = "tmay_response";
        break;
      case "get_location": {
        setStage("get_service");
        break;
      }
    }
    const userMessage = {
      from: "user",
      text: inputMessage,
      stage: stage,
    };

    // Only emit to server, don't update local state
    socket.emit(msgType, userMessage);

    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  console.log(messages, "messages");

  useEffect(() => {
    if (messages.length === 0) {
      // send initial message
      socket.emit("init_message", {});

      // first msg from ai
      messages.push({
        from: "ai",
        text: "Hello! How can I help you today?",
      });
    }
  }, []);
  const { phone } = getUserData();
  const { callApi, loading, error } = useApi(`conversations/${phone}`, "GET");

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <button className="mr-3">
            <Link to={ROUTERS.LANDING_PAGE}>
              <ChevronLeft className="h-5 w-5 cursor-pointer" />
            </Link>
          </button>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-lg font-semibold">
              <img src="/logo.png" alt="" />
            </div>
            <div className="ml-3">
              <h1 className="font-semibold text-lg">Airtribe Guide</h1>
              <p className="text-xs text-indigo-200">Online</p>
            </div>
          </div>
        </div>
        <button>
          <MoreVertical className="h-5 w-5" />
        </button>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 ${
                message.from === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white shadow-md rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <div
                className={`text-xs mt-1 ${
                  message.from === "user" ? "text-indigo-200" : "text-gray-500"
                }`}
              >
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-end bg-gray-100 rounded-lg p-3">
          <button className="text-gray-500 hover:text-indigo-600 mr-2">
            <Paperclip className="h-5 w-5" />
          </button>
          <textarea
            className="flex-1 bg-transparent resize-none outline-none max-h-32 min-h-[40px]"
            placeholder="Type a message..."
            rows="1"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="flex items-center space-x-2 ml-2">
            <button className="text-gray-500 hover:text-indigo-600">
              <Smile className="h-5 w-5" />
            </button>
            <button className="text-gray-500 hover:text-indigo-600">
              <Mic className="h-5 w-5" />
            </button>
            <button
              onClick={handleSendMessage}
              className={`rounded-full p-2 ${
                inputMessage.trim() === ""
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              disabled={inputMessage.trim() === ""}
            >
              <SendIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
