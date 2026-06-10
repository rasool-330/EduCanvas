import { useEffect, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { sendChatMessage } from "../../utils/groqClient";
import { loadChatCurriculumContext } from "../../utils/chatCurriculumContext";

export default function Chatbot() {
  const { currentUser, userProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [curriculumContext, setCurriculumContext] = useState("");

  useEffect(() => {
    if (!currentUser || !userProfile || userProfile.role !== "student") return;

    loadChatCurriculumContext(currentUser.uid, userProfile.college).then(setCurriculumContext);
  }, [currentUser, userProfile]);

  async function handleSend(e) {
    e.preventDefault();
    if (!message.trim() || typing) return;

    const userMsg = message.trim();
    setMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);

    try {
      const chatHistory = history.map((m) => ({ role: m.role, content: m.content }));
      const { reply } = await sendChatMessage(userMsg, chatHistory, curriculumContext);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setHistory((prev) => [
        ...prev,
        { role: "user", content: userMsg },
        { role: "assistant", content: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again." },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-dark ${open ? "hidden" : ""}`}
        aria-label="Open coursework assistant"
      >
        <Bot className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">EduCanvas AI</p>
              <p className="text-xs opacity-90">Ask me about your coursework</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-center text-sm text-slate-400">
                Ask about topics in your enrolled curricula, study doubts, or course structure.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-brand text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-1 px-2">
                <div className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
                <div className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
                <div className="typing-dot h-2 w-2 rounded-full bg-slate-400" />
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex gap-2 border-t border-slate-100 p-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your coursework…"
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              disabled={typing}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white hover:bg-brand-dark disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
