function ResponseViewer({ response }) {
    if (!response) {
        return <div>No response yet</div>;
    }

   return (
    <div>
        <div>Status: {response.status}</div>

        <div>
            <strong>Headers:</strong>
            {Object.entries(response.headers).map(([key, value]) => (
                <div key={key}>
                    {key}: {value}
                </div>
            ))}
        </div>

        <div>
            <strong>Body:</strong>
            <div>{response.body}</div>
        </div>
    </div>
   )
}

export default ResponseViewer;