function RequestForm({ url, setUrl, method, setMethod }) {
    const handleSend = () => {
        console.log({ url, method });
    };

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
                
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default RequestForm;