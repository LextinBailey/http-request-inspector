function RequestForm({ url, setUrl, method, setMethod, onSend, history, onSelectHistory, selectedHistory, headers, onHeaderChange, onAddHeader, 
    onRemoveHeader, body, setBody }) {

    return (
        <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
            <div className="flex gap-2 items-center">
                <select
                    className="border rounded px-2 py-2 bg-white text-gray-800"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>

                <input 
                    className="flex-1 border rounded px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="https://api.example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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
                        onClick={onAddHeader}
                    >
                        + Add
                    </button>
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-2 bg-gray-50">
                    {headers.map((header, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                className="flex-1 border rounded px-2 py-1 bg-white text-gray-800"
                                placeholder="Key"
                                value={header.key}
                                onChange={(e) => onHeaderChange(index, "key", e.target.value)}
                            />
                            
                            <input
                                className="flex-1 border rounded px-2 py-1 bg-white text-gray-800"
                                placeholder="Value"
                                value={header.value}
                                onChange={(e) => onHeaderChange(index, "value", e.target.value)}
                            />

                            <button 
                                className="text-red-500 hover:text-red-700 text-sm"
                                onClick={() => onRemoveHeader(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                
            </div>

            {method === "POST" && (
                <textarea 
                    className="w-full border rounded px-3 py-2 bg-white text-gray-800 resize-y h-32"
                    value={body} 
                    onChange={(e) => setBody(e.target.value)}
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
                                    {item.method}
                                </span>

                                <span className="flex-1 truncate text-gray-600">
                                    {item.url}
                                </span>

                                <span className={`font-medium &{
                                    item.status >= 200 && item.status < 300 ? "text-green-600" : "text-red-600
                                }`}>
                                    {item.status}
                                </span>

                                <span className="text-gray-500">
                                    • {item.time}ms
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