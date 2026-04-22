function ResponseViewer({ response, loading, error }) {
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
    <div style={{ marginTop: "20px" }}>
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
            <strong>Headers:</strong>
            <div style={{ marginTop: "5px" }}>
                {response.headers && Object.entries(response.headers).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {value}
                    </div>
                ))}
            </div>
        </div>

        <div style={{ marginTop: "10px" }}>
            <strong>Body:</strong>
            <pre>{formattedBody}</pre>
        </div>
    </div>
   )
}

export default ResponseViewer;