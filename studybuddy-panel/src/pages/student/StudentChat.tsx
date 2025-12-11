import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Bot, User, Sparkles, BookOpen, HelpCircle, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const suggestedQuestions = [
  { icon: BookOpen, text: "Explain React hooks in simple terms" },
  { icon: Code, text: "How do I debug JavaScript errors?" },
  { icon: HelpCircle, text: "What's the difference between var, let, and const?" },
  { icon: Sparkles, text: "Give me tips for learning faster" },
];

export default function StudentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello John! 👋 I'm your StudyBuddy AI Assistant. I'm here to help you with your learning journey. Feel free to ask me anything about your courses, programming concepts, or study tips!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Explain React hooks in simple terms": "React Hooks are special functions that let you 'hook into' React features from function components. Think of them as tools:\n\n**useState** - A box to store and update data\n**useEffect** - A way to do things after your component shows up (like fetching data)\n**useContext** - A way to share data without passing it through every component\n\nWould you like me to explain any specific hook in more detail?",
        "How do I debug JavaScript errors?": "Here are my top debugging tips:\n\n1. **Read the error message** - It tells you what went wrong and where\n2. **Use console.log()** - Print values to see what's happening\n3. **Check DevTools** - Press F12 to open browser developer tools\n4. **Use breakpoints** - Pause code execution to inspect variables\n5. **Google the error** - Someone has probably had the same issue!\n\nWhat specific error are you encountering?",
        "What's the difference between var, let, and const?": "Great question! Here's the breakdown:\n\n**var** (old way)\n- Function scoped\n- Can be redeclared\n- Hoisted\n\n**let** (modern)\n- Block scoped\n- Can be reassigned\n- Not hoisted\n\n**const** (modern)\n- Block scoped\n- Cannot be reassigned\n- Must be initialized\n\n**Best practice:** Use `const` by default, `let` when you need to reassign, avoid `var`.",
        "Give me tips for learning faster": "Here are proven strategies to accelerate your learning:\n\n🎯 **Active Learning**\n- Don't just watch - code along!\n- Build projects immediately\n\n🧠 **Spaced Repetition**\n- Review material at increasing intervals\n- Use flashcards for concepts\n\n📝 **Teach Others**\n- Explain concepts out loud\n- Write blog posts or notes\n\n⏰ **Pomodoro Technique**\n- 25 min focus, 5 min break\n- Take longer breaks every 4 sessions\n\nWant me to elaborate on any of these?",
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[messageText] || "That's a great question! Let me think about this...\n\nBased on your current courses, I'd recommend focusing on understanding the fundamentals first. Would you like me to break down this topic into smaller, manageable concepts?",
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in h-[calc(100vh-8rem)]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="page-title">AI Chat Tutor</h1>
            <p className="text-muted-foreground mt-1">
              Get instant help with your learning
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Messages */}
          <div className="flex-1 dashboard-card flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.sender === "user" ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                    )}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p
                      className={cn(
                        "text-xs mt-2",
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <span
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Paperclip className="w-5 h-5 text-muted-foreground" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="input-field flex-1"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="btn-primary p-3"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 hidden lg:block space-y-6">
            {/* Quick Questions */}
            <div className="dashboard-card p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Suggested Questions
              </h3>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(question.text)}
                    className="w-full flex items-center gap-3 p-3 text-left text-sm bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <question.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{question.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Course Context */}
            <div className="dashboard-card p-4">
              <h3 className="font-semibold mb-4">Current Context</h3>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium">React Fundamentals</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Module 8: React Hooks Deep Dive
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                I'll tailor my responses to your current course material.
              </p>
            </div>

            {/* Tips */}
            <div className="dashboard-card p-4">
              <h3 className="font-semibold mb-3">Chat Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Be specific with your questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Ask for code examples
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Request step-by-step explanations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Share error messages for debugging help
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
