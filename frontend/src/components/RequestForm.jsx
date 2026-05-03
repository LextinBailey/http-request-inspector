import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";

function RequestForm({ onSend, history, onSelectHistory, selectedHistory }) {
    const { session, setSession } = useContext(SessionContext);

    function handleHeaderChange(index, field, newValue) {
        setSession(prev => {
            const updatedHeaders = [...(prev.request.headers || [])];

            updatedHeaders[index] = {
                ...updatedHeaders[index],
                [field]: newValue
            };

            return {
                ...prev,
                request: {
                    ...prev.request,
                    headers: updatedHeaders
                }
            };
        });
    }

    function handleAddHeader() {
        setSession(prev => ({
            ...prev,
            request: {
                ...prev.request,
                headers: [
                    ...(prev.request.headers || []),
                    { key: "", value: "" }
                ]
            }
        }));
    }

    function handleRemoveHeader(index) {
        setSession(prev => {
            const updatedHeaders = prev.request.headers.filter((_, i) => i !== index);

            return {
                ...prev,
                request: {
                    ...prev.request,
                    headers: updatedHeaders.length > 0
                        ? updatedHeaders
                        : [{ key: "", value: "" }]
                }
            };
        });
    }

    return (
        <div className="px-4 pb-4 space-y-3">
            <form 
                className="flex gap-2 items-center border-b border-border pb-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSend();
                }}
            >
                <div className="relative">
                    <select
                        className="appearance-none flex items-center bg-transparent font-mono text-sm text-primary border border-border rounded px-2 cursor-pointer h-[38px]"
                        value={session.request.method}
                        onChange={(e) => {
                            setSession(prev => ({
                                ...prev,
                                request: {
                                    ...prev.request,
                                    method: e.target.value
                                }
                            }));
                        }}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                    </select>
                    <span className="flex items-center justify-center leading-none pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-primary text-xs">
                        ▾
                    </span>
                </div>

                <input 
                    className="flex-1 bg-active font-mono text-sm text-primary border border-border rounded px-3 py-2
                     h-[38px] placeholder:text-muted focus:outline-none focus:border-accent"
                    placeholder="https://api.example.com"
                    value={session.request.url}
                    onChange={(e) => {
                        setSession(prev => ({
                            ...prev,
                            request: {
                                ...prev.request,
                                url: e.target.value
                            }
                        }));
                    }}
                />
                
                <button 
                    className="flex items-center justify-center bg-transparent text-primary border border-border rounded px-4 h-[38px] text-sm hover:bg-accentSoft hover:border-accent transition-colors"
                    type="submit">
                        Send
                </button>
            </form>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-mono tracking-widest text-labels uppercase">Headers</span>
                    <button 
                        className="text-xs text-accent hover:text-primary border border-border px-2 py-1 rounded hover:bg-accentSoft transition-colors"
                        onClick={handleAddHeader}
                    >
                        + Add
                    </button>
                </div>
                
                <div className={`space-y-2 ${session.request.headers.length > 5 ? "max-h-48 overflow-y-auto pr-1" : ""}`}>
                    {(session.request.headers || []).map((header, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                className="flex-1 bg-active border border-border rounded px-3 py-1.5 text-sm text-primary
                                 placeholder:text-muted font-mono focus:outline-none focus:border-accent"
                                placeholder="Key"
                                value={header.key}
                                onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                            />
                            
                            <input
                                className="flex-1 bg-active border border-border rounded px-3 py-1.5 text-sm text-primary
                                 placeholder:text-muted font-mono focus:outline-none focus:border-accent"
                                placeholder="Value"
                                value={header.value}
                                onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                            />

                            <button 
                                className="text-xs border border-border text-muted px-2 py-1.5 rounded hover:border-red-500
                                 hover:text-red-400 transition-colors"
                                onClick={() => handleRemoveHeader(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {session.request.method === "POST" && (
                <textarea 
                    className="w-full bg-active border border-border rounded px-3 py-2 text-sm text-primary font-mono
                     placeholder:text-muted resize-y h-32 focus:outline-none focus:border-accent"
                    value={session.request.body} 
                    onChange={(e) => {
                        setSession(prev => ({
                            ...prev,
                            request: {
                                ...prev.request,
                                body: e.target.value
                            }
                        }));
                    }}
                    placeholder="Request body (JSON, etc.)"
                >
                </textarea>
            )}

            <div className="space-y-2">
                <div className="flex items-center">
                    <span className="text-xs font-mono tracking-widest text-labels uppercase">Request History</span>
                </div>
                
                {history.length === 0 ? (
                    <p className="text-sm text-muted">No requests yet</p>
                ) : (
                    <div className="overlow-hidden">
                        <div className={`${history.length > 5 ? "max-h-48 overflow-y-auto": ""}`}>
                            {history.map((item) => (
                                <div 
                                    key={item.timestamp}
                                    onClick={() => onSelectHistory(item)}
                                    className={`flex items-center gap-3 px-3 py-2 text-sm cursor-pointer rounded-lg transition-colors 
                                        ${selectedHistory === item.timestamp ? "border border-border bg-active"
                                                                             : "border border-transparent hover:bg-active"}`}
                                    >
                                    <span className="font-mono text-xs text-accent bg-accentSoft px-1.5 py-0.5 rounded w-10 text-center">
                                        {item.request.method}
                                    </span>

                                    <span className="flex-1 truncate text-input font-mono text-xs">
                                        {item.request.url}
                                    </span>

                                    <span className={`font-mono text-xs font-semibold ${
                                        item.response.status >= 200 && item.response.status < 300 ? "text-success" : "text-red-400"
                                    }`}>
                                        {item.response.status}
                                    </span>

                                    <span className="text-muted font-mono text-xs">
                                        • {item.response.time}ms
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RequestForm;