function RequestForm({ url, setUrl, method, setMethod, onSend, history, onSelectHistory, selectedHistory, headers, onHeaderChange, onAddHeader }) {
    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <label>URL: </label>
                <input 
                    placeholder="https://api.example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>HTTP Method: </label>

                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
                
                <button onClick={onSend}>Send</button>
            </div>

            <div style={{ marginBottom: "10px" }}>
                <h3>Headers</h3>

                <button onClick={onAddHeader}>Add Header</button>

                {headers.map((header, index) => (
                    <div key={index}>
                        <input
                            value={header.key}
                            onChange={(e) => onHeaderChange(index, "key", e.target.value)}
                        />
                        :
                        <input
                            value={header.value}
                            onChange={(e) => onHeaderChange(index, "value", e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div style={{ marginBottom: "10px" }}>
                <h3>Request History</h3>

                {history.length === 0 ? (
                    <p>No requests yet</p>
                ) : (
                    history.map((item) => (
                        <div 
                            key={item.timestamp}
                            onClick={() => onSelectHistory(item)}
                            className={`history-item ${selectedHistory === item.timestamp ? "active" : ""}`}
                            style={{ 
                                borderBottom: "1px solid #ccc", 
                                padding: "5px 0",
                                display: "flex",
                                gap: "8px"
                            }}>
                            <span style={{ fontWeight: "bold", flexShrink: 0 }}>
                                {item.method}
                            </span>
                            <span style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1
                            }}>{item.url}</span>
                            <span style={{ marginLeft: "8px", color: "#666", color: item.status >= 200 && item.status < 300 ? "green" : "red" }}>
                                {item.status}
                            </span>
                            <span>
                                • {item.time}ms
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RequestForm;