import React, { useState, useEffect } from "react";

const staticChat = {
  question: "Hi! How can I help you today?",
  options: [
    {
      text: "Book Appointment",
      next: {
        question: "What type of appointment do you want to book?",
        options: [
          {
            text: "Doctor",
            next: {
              question: "Which specialty?",
              options: [
                { text: "Cardiology", response: "Cardiology appointments are available on Mondays and Thursdays." },
                { text: "Dermatology", response: "Dermatology appointments are available on Tuesdays and Fridays." },
              ],
            },
          },
          {
            text: "Lab Test",
            response: "Lab test appointments can be booked from the lab section.",
          },
        ],
      },
    },
    {
      text: "View Prescriptions",
      next: {
        question: "Do you want to view recent or all prescriptions?",
        options: [
          { text: "Recent", response: "Here are your recent prescriptions: ..." },
          { text: "All", response: "Here are all your prescriptions: ..." },
        ],
      },
    },
    {
      text: "Contact Support",
      next: {
        question: "Choose a support topic:",
        options: [
          { text: "Technical Issue", response: "Please describe your technical issue. Our team will contact you soon." },
          { text: "Billing", response: "For billing queries, email billing@checkmedi.com." },
        ],
      },
    },
  ],
};

export default function Chatbot({ onClose }) {
  const [currentNode, setCurrentNode] = useState(staticChat);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initialize with the first bot message
    if (messages.length === 0) {
      addMessage(staticChat.question, "bot");
    }
  }, []);

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender, id: Date.now() + Math.random() }]);
  };

  const handleOptionSelect = (opt) => {
    addMessage(opt.text, "user");
    if (opt.response) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage(opt.response, "bot");
        setIsTyping(false);
      }, 1200);
      setCurrentNode(null); // End of branch
    } else if (opt.next) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage(opt.next.question, "bot");
        setIsTyping(false);
        setCurrentNode(opt.next);
      }, 900);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-80 h-96 flex flex-col border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-4 py-3 text-white flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <h3 className="font-semibold">CheckMedi Assistant</h3>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            ×
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === "bot" ? "bg-gray-200 text-gray-800 rounded-bl-none" : "bg-indigo-500 text-white rounded-br-none"
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        {currentNode && currentNode.options && (
          <div className="p-3 border-t border-gray-200 bg-white">
            <p className="text-xs text-gray-500 mb-2">Quick replies</p>
            <div className="flex flex-wrap gap-2">
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt)}
                  className="bg-indigo-100 text-indigo-700 text-sm px-3 py-2 rounded-full hover:bg-indigo-200 transition-colors">
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
