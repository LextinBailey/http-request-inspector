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
    <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
                {response.time} ms
            </div>

            <div className={`font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                    {response.status} {isSuccess ? "OK" : ""}
            </div>
        </div>
        
        <div>
            <h4 className="font-semibold text-gray-700">Headers</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
                {response.headers && Object.entries(response.headers).map(([key, value]) => (
                    <div key={key} className="text-sm">
                        <span className="font-medium text-gray-700">{key}:</span>{" "}
                        <span className="text-gray-600 break-all">{value}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div>
            <h4 className="font-semibold text-gray-700">Body</h4>
            <pre className="text-sm bg-gray-900 text-green-200 p-3 rounded overflow-auto max-h-64 leading-relaxed">
                {formattedBody}
            </pre>
        </div>
    </div>
   )
}

export default ResponseViewer;