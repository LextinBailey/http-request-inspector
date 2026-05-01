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
        <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
            <div className="flex gap-2 items-center">
                <select
                    className="border rounded px-2 py-2 bg-white text-gray-800"
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

                <input 
                    className="flex-1 border rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={onSend}>
                        Send
                </button>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-700">Headers</h3>
                    <button 
                        className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        onClick={handleAddHeader}
                    >
                        + Add
                    </button>
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-2 bg-gray-50">
                    {(session.request.headers || []).map((header, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                className="flex-1 border rounded px-2 py-1 bg-white text-gray-800"
                                placeholder="Key"
                                value={header.key}
                                onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                            />
                            
                            <input
                                className="flex-1 border rounded px-2 py-1 bg-white text-gray-800"
                                placeholder="Value"
                                value={header.value}
                                onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                            />

                            <button 
                                className="text-red-500 hover:text-red-700 text-sm"
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
                    className="w-full border rounded px-3 py-2 bg-white text-gray-800 resize-y h-32"
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
                <h3 className="font-semibold text-gray-700">Request History</h3>
                
                {history.length === 0 ? (
                    <p className="text-sm text-gray-500">No requests yet</p>
                ) : (
                    <div className="max-h-40 overflow-y-auto border rounded bg-gray-50">
                        {history.map((item) => (
                            <div 
                                key={item.timestamp}
                                onClick={() => onSelectHistory(item)}
                                className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer border-b last:border-b-0
                                    ${selectedHistory === item.timestamp ? "bg-blue-100" : "hover:bg-gray-100"}`}
                                >
                                <span className="font-semibold text-gray-700 w-12">
                                    {item.request.method}
                                </span>

                                <span className="flex-1 truncate text-gray-600">
                                    {item.request.url}
                                </span>

                                <span className={`font-medium ${
                                    item.response.status >= 200 && item.response.status < 300 ? "text-green-600" : "text-red-600"
                                }`}>
                                    {item.response.status}
                                </span>

                                <span className="text-gray-500">
                                    • {item.response.time}ms
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default RequestForm;