import React, { useState, useEffect, useRef } from "react";
import "./fonts/ZaghawaBeria.css";
import KeyboardRow from "./components/KeyboardRow";
import TextDisplay from "./components/TextDisplay";
import LanguageToggle from "./components/LanguageToggle";
import SymbolsToggle from "./components/SymbolsToggle";
import ChatMessages from "./components/ChatMessages";
import Header from "./components/Header";
import { supabase } from "./utils/supabaseClient";
import { triggerConfetti } from "./utils/confetti";
import { playKeySound } from "./utils/sounds";

function App() {
  const [text, setText] = useState("");
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const [messages, setMessages] = useState([]);
  const [previewMessageId, setPreviewMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const currentUser = {
    id: "user-" + Math.random().toString(36).substr(2, 9),
    name: "Guest User",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
  };

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    const messageId = crypto.randomUUID();
    const newMessage = {
      id: messageId,
      content: text,
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_avatar: currentUser.avatar,
      created_at: new Date().toISOString(),
    };

    setPreviewMessageId(messageId);
    setMessages((prev) => [...prev, newMessage]);
    setText("");

    try {
      const { error } = await supabase.from("messages").insert([newMessage]);

      if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } finally {
      setPreviewMessageId(null);
    }
  };

  const symbolsKeyboard = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["+", "=", "\\", "|", "[", "]", "{", "}", ":", ";"],
    ["~", '"', "'", ",", ".", "<", ">", "/", "?"],
    ["-", "_", "`", "±", "§", "¢", "⌫"],
  ];

  const englishKeyboard = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    [".", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["⇧", "z", "x", "c", "b", "n", "m", "⌫"],
  ];

  const arabicKeyboard = [
    ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"],
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح"],
    ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م"],
    ["ئ", "ء", "ؤ", "ر", "لا", "ى", "⌫"],
  ];

  const keyboard = showSymbols
    ? symbolsKeyboard
    : isArabic
    ? arabicKeyboard
    : englishKeyboard;

  const handleKeyClick = (key) => {
    if (key === "⌫") {
      handleBackspace();
      return;
    }
    if (key === "⇧" && !isArabic) {
      toggleCase();
      return;
    }
    if (key === "🔍") {
      return;
    }

    let newChar = isUpperCase && !isArabic ? key.toUpperCase() : key;
    setText((prev) => prev + newChar);
    triggerConfetti();
    playKeySound("press");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleBackspace = () => {
    setText((prev) => prev.slice(0, -1));
    playKeySound("backspace");
  };

  const handleSpace = () => {
    setText((prev) => prev + " ");
    triggerConfetti();
    playKeySound("space");
  };

  const handlePeriod = () => {
    setText((prev) => prev + ".");
    triggerConfetti();
    playKeySound("press");
  };

  const toggleCase = () => {
    setIsUpperCase((prev) => !prev);
    playKeySound("press");
  };

  const toggleLanguage = () => {
    setIsArabic((prev) => !prev);
    setShowSymbols(false);
    setIsUpperCase(false);
    playKeySound("press");
  };

  const toggleSymbols = () => {
    setShowSymbols((prev) => !prev);
    setIsUpperCase(false);
    playKeySound("press");
  };

  return (
    <div className="min-h-screen bg-[#efeae2] flex flex-col h-screen fixed inset-0">
      <Header />
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <ChatMessages
            messages={messages}
            currentUser={currentUser}
            previewMessageId={previewMessageId}
          />
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 bg-[#f0f2f5]">
          <TextDisplay
            value={text}
            onChange={handleTextChange}
            onSend={handleSend}
            isArabic={isArabic}
          />
        </div>
      </div>

      <div
        className="bg-[#202c33] border-t border-[#2a373f] p-3 shadow-inner w-full"
        style={{ marginBottom: "35px" }}
      >
        <div className="w-full mx-auto">
          <div className="space-y-1.5">
            {keyboard.map((row, index) => (
              <KeyboardRow
                key={index}
                keys={row}
                onKeyClick={handleKeyClick}
                isUpperCase={isUpperCase}
                isFirstRow={index === 0}
                isSecondRow={index === 1}
              />
            ))}

            <div className="flex justify-between gap-1.5 w-full px-0.5">
              <SymbolsToggle
                showSymbols={showSymbols}
                onClick={toggleSymbols}
              />
              <LanguageToggle
                isArabic={isArabic}
                onClick={toggleLanguage}
                showArrow={!isArabic}
              />
              <button
                onClick={handleSpace}
                className="px-4 py-3 bg-[#2a373f] rounded-lg text-white w-[80%]
                         hover:bg-[#344047] transition-colors min-h-[3.5rem]"
              />
              <button
                onClick={handlePeriod}
                className="px-4 py-3 bg-[#2a373f] rounded-lg text-white w-12
                         hover:bg-[#344047] transition-colors min-h-[3.5rem]"
              >
                .
              </button>
              <button
                onClick={() => handleKeyClick("🔍")}
                className="px-4 py-3 bg-[#2a373f] rounded-lg text-white w-12
                         hover:bg-[#344047] transition-colors min-h-[3.5rem]"
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
