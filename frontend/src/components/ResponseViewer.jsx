function ResponseViewer({ response, loading, error, showHeaders, setShowHeaders }) {
    if (loading) {
        return <div>Sending request...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!response) {
        return <div>No response yet</div>;
    }

    let formattedBody = response.body;

    try {
        const parsed = JSON.parse(response.body);
        formattedBody = JSON.stringify(parsed, null, 2);
    } catch (e) {
        // Leave as is
    }

    const isSuccess = response.status >= 200 && response.status < 300;

   return (
    <div style={{ 
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        maxHeight: "70vh"
    }}>
        <div style={{ flexShrink: 0 }}>
            <div>
                <strong>Time:</strong> {response.time} ms
            </div>

            <div style={{ marginTop: "10px" }}>
                <strong>Status:</strong>{" "}
                <span style={{ color: isSuccess ? "green" : "red" }}>
                    {response.status}
                </span> 
            </div>

            <div style={{ marginTop: "10px" }}>
                <button onClick={() => setShowHeaders(prev => !prev)}>
                    {showHeaders ? "Hide Headers" : "Show Headers"}
                </button>
                
                {showHeaders && (
                    <div style={{ 
                        maxHeight: "150px",
                        overflowY: "auto",
                        marginTop: "5px",
                        border: "1px solid #ccc",
                        padding: "5px"
                    }}>
                        {response.headers && Object.entries(response.headers).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}:</strong>{" "}
                                <pre style={{
                                    margin: 0,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word"
                                }}>
                                    {value}
                                </pre> 
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>


        <div style={{ flex: 1, overflowY: "auto", marginTop: "10px" }}>
            <strong>Body:</strong>
            <pre style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0
            }}>
                {formattedBody}
            </pre>
        </div>
    </div>
   )
}

export default ResponseViewer;