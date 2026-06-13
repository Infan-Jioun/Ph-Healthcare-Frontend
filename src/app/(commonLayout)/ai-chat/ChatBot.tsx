"use client";

import { useEffect, useRef, useState } from "react";
import { queryRagAction, ingestDoctorsAction, getUserRoleAction } from "../../_actions/rag.action";

interface IMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: string;
    isError?: boolean;
}

const SUGGESTIONS = [
    "Find a cardiologist near me",
    "Who are the best orthopedic surgeons?",
    "I need a pediatrician for my child",
    "Which doctors specialize in diabetes?",
    "Find a dermatologist available this week",
    "I'm looking for a neurologist",
];

function MarkdownText({ text }: { text: string }) {
    const parsed = text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br/>");
    return (
        <span
            dangerouslySetInnerHTML={{ __html: parsed }}
            className="leading-relaxed"
        />
    );
}

export default function ChatBot() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [ingestLoading, setIngestLoading] = useState(false);
    const [ingestMsg, setIngestMsg] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        getUserRoleAction().then((role) => {
            if (role === "ADMIN" || role === "SUPER_ADMIN") setIsAdmin(true);
        });
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (query: string) => {
        if (!query.trim() || loading) return;

        const userMsg: IMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: query.trim(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        const result = await queryRagAction(query.trim());

        const assistantMsg: IMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: result.success
                ? (result.answer as string)
                : (result.error as string),
            sources: result.success ? (result.sources as string) : undefined,
            isError: !result.success,
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setLoading(false);

        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const handleIngest = async () => {
        setIngestLoading(true);
        setIngestMsg("");
        const result = await ingestDoctorsAction();
        setIngestMsg(
            result.success
                ? `✓ ${result.indexedCount} doctors synced`
                : `✗ ${result.error}`
        );
        setIngestLoading(false);
        setTimeout(() => setIngestMsg(""), 4000);
    };

    const isEmpty = messages.length === 0;

    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] bg-background">
            {/* Top bar */}
            <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-4 h-4 text-primary"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold leading-tight">
                            Healthcare AI Assistant
                        </p>
                        <p className="text-xs text-muted-foreground leading-tight">
                            Find the right doctor for you
                        </p>
                    </div>
                </div>

                {isAdmin && (
                    <div className="flex items-center gap-2">
                        {ingestMsg && (
                            <span
                                className={`text-xs px-2 py-1 rounded-md ${ingestMsg.startsWith("✓")
                                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                                    : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                                    }`}
                            >
                                {ingestMsg}
                            </span>
                        )}
                        <button
                            onClick={handleIngest}
                            disabled={ingestLoading}
                            className="text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50 flex items-center gap-1.5"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className={`w-3.5 h-3.5 ${ingestLoading ? "animate-spin" : ""}`}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                            {ingestLoading ? "Syncing..." : "Sync Doctors"}
                        </button>
                    </div>
                )}
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-2xl mx-auto space-y-6">
                    {isEmpty && (
                        <div className="pt-8 text-center space-y-2">
                            <p className="text-2xl font-semibold tracking-tight">
                                How can I help you today?
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Ask me anything about finding the right doctor or specialist.
                            </p>
                        </div>
                    )}

                    {/* Messages */}
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            {/* Avatar */}
                            <div
                                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold mt-0.5 ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {msg.role === "user" ? (
                                    "U"
                                ) : (
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="w-3.5 h-3.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                                        />
                                    </svg>
                                )}
                            </div>

                            {/* Bubble */}
                            <div
                                className={`max-w-[78%] space-y-1 ${msg.role === "user" ? "items-end" : "items-start"
                                    } flex flex-col`}
                            >
                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                        : msg.isError
                                            ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded-tl-sm border border-red-200 dark:border-red-800"
                                            : "bg-muted text-foreground rounded-tl-sm"
                                        }`}
                                >
                                    <MarkdownText text={msg.content} />
                                </div>

                                {msg.sources && (
                                    <span className="text-[11px] text-muted-foreground px-1 flex items-center gap-1">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className="w-3 h-3"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                            />
                                        </svg>
                                        {msg.sources}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0 flex items-center justify-center mt-0.5">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="w-3.5 h-3.5 text-muted-foreground"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
                                    />
                                </svg>
                            </div>
                            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Suggestions + Input */}
            <div className="border-t border-border bg-background px-4 pt-3 pb-4">
                <div className="max-w-2xl mx-auto space-y-3">
                    {/* Suggestion chips */}
                    {isEmpty && (
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => sendMessage(s)}
                                    disabled={loading}
                                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted hover:border-primary/40 transition-all disabled:opacity-40 text-muted-foreground hover:text-foreground"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input row */}
                    <div className="flex items-end gap-2 bg-muted rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-primary/30 transition-colors">
                        <textarea
                            ref={inputRef}
                            rows={1}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height =
                                    Math.min(e.target.scrollHeight, 120) + "px";
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about a doctor or specialty..."
                            disabled={loading}
                            className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground min-h-[24px] max-h-[120px] leading-6 disabled:opacity-50"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || loading}
                            className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    </div>

                    <p className="text-[11px] text-center text-muted-foreground">
                        AI responses are based on available doctor data. Always consult a
                        qualified professional.
                    </p>
                </div>
            </div>
        </div>
    );
}