function RequestForm({ url, setUrl, method, setMethod, onSend, history }) {
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
                <h3>Request History</h3>

                {history.length === 0 ? (
                    <p>No requests yet</p>
                ) : (
                    history.map((item, index) => (
                        <div key={item.timestamp} style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
                            <span style={{ fontWeight: "bold", marginRight: "8px" }}>
                                {item.method}
                            </span>
                            <span>{item.url}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default RequestForm;