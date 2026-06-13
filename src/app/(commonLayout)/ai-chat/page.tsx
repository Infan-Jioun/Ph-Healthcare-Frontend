"use client";

import { useEffect, useRef, useState } from "react";
import {
    queryRagAction,
    ingestDoctorsAction,
    getUserRoleAction,
} from "../../_actions/rag.action";

interface IMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: string;
    isError?: boolean;
}

const SUGGESTIONS = [
    "Find a cardiologist",
    "Best orthopedic surgeons?",
    "Pediatrician for my child",
    "Doctors for diabetes",
    "Find a dermatologist",
    "Looking for a neurologist",
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

export default function FloatingChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [ingestLoading, setIngestLoading] = useState(false);
    const [ingestMsg, setIngestMsg] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [unread, setUnread] = useState(0);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        getUserRoleAction().then((role) => {
            if (role === "ADMIN" || role === "SUPER_ADMIN") setIsAdmin(true);
        });
    }, []);

    useEffect(() => {
        if (open) {
            setUnread(0);
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loading, open]);

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

        if (!open) setUnread((n) => n + 1);
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
        <>
            {/* Chat panel */}
            <div
                className={`
                    fixed bottom-24 right-4 z-50
                    w-[calc(100vw-2rem)] max-w-sm
                    bg-background border border-border rounded-2xl shadow-xl
                    flex flex-col overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${open
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }
                `}
                style={{ height: "520px" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                            <SparkleIcon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold leading-tight">Healthcare AI</p>
                            <p className="text-[11px] text-muted-foreground leading-tight">
                                Find the right doctor
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Admin ingest */}
                        {isAdmin && (
                            <>
                                {ingestMsg && (
                                    <span
                                        className={`text-[10px] px-1.5 py-0.5 rounded ${ingestMsg.startsWith("✓")
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
                                    title="Sync doctor data"
                                    className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                                >
                                    <SyncIcon
                                        className={`w-3.5 h-3.5 ${ingestLoading ? "animate-spin" : ""}`}
                                    />
                                </button>
                            </>
                        )}

                        {/* Clear */}
                        {messages.length > 0 && (
                            <button
                                onClick={() => setMessages([])}
                                title="Clear chat"
                                className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            >
                                <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                        )}

                        {/* Close */}
                        <button
                            onClick={() => setOpen(false)}
                            className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                            <ChevronDownIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                    {isEmpty && (
                        <div className="pt-4 text-center space-y-1">
                            <p className="text-sm font-medium">How can I help?</p>
                            <p className="text-xs text-muted-foreground">
                                Ask about doctors or specialties.
                            </p>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-semibold mt-0.5 ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                    }`}
                            >
                                {msg.role === "user" ? (
                                    "U"
                                ) : (
                                    <SparkleIcon className="w-3 h-3" />
                                )}
                            </div>

                            <div
                                className={`max-w-[82%] space-y-1 flex flex-col ${msg.role === "user" ? "items-end" : "items-start"
                                    }`}
                            >
                                <div
                                    className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                        : msg.isError
                                            ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded-tl-sm border border-red-200 dark:border-red-800"
                                            : "bg-muted text-foreground rounded-tl-sm"
                                        }`}
                                >
                                    <MarkdownText text={msg.content} />
                                </div>

                                {msg.sources && (
                                    <span className="text-[10px] text-muted-foreground px-1 flex items-center gap-1">
                                        <SearchIcon className="w-2.5 h-2.5" />
                                        {msg.sources}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                                <SparkleIcon className="w-3 h-3 text-muted-foreground" />
                            </div>
                            <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Suggestions + Input */}
                <div className="border-t border-border px-3 pt-2 pb-3 flex-shrink-0 space-y-2 bg-background">
                    {isEmpty && (
                        <div className="flex flex-wrap gap-1.5">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => sendMessage(s)}
                                    disabled={loading}
                                    className="text-[11px] px-2.5 py-1 rounded-full border border-border hover:bg-muted hover:border-primary/40 transition-all disabled:opacity-40 text-muted-foreground hover:text-foreground"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="flex items-end gap-2 bg-muted rounded-xl px-3 py-2 border border-transparent focus-within:border-primary/30 transition-colors">
                        <textarea
                            ref={inputRef}
                            rows={1}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height =
                                    Math.min(e.target.scrollHeight, 96) + "px";
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about a doctor..."
                            disabled={loading}
                            className="flex-1 bg-transparent text-xs resize-none outline-none placeholder:text-muted-foreground min-h-[20px] max-h-[96px] leading-5 disabled:opacity-50"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || loading}
                            className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30"
                        >
                            <SendIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* FAB trigger button */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center"
                aria-label="Open AI chat"
            >
                {open ? (
                    <ChevronDownIcon className="w-5 h-5" />
                ) : (
                    <SparkleIcon className="w-6 h-6" />
                )}
                {!open && unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {unread > 9 ? "9+" : unread}
                    </span>
                )}
            </button>
        </>
    );
}

/* ── Inline SVG icon helpers (no external dep needed) ── */
function SparkleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
    );
}
function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
    );
}
function SendIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
    );
}
function SyncIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
    );
}
function TrashIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    );
}
function SearchIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    );
}