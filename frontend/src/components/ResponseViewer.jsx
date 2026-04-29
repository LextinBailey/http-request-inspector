import { useState, useEffect } from "react";

function ResponseViewer({ response, loading, error }) {

    const [activeTab, setActiveTab] = useState("body");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setActiveTab("body");
        setCopied(false);
    }, [response]);

    if (loading) {
        return <div>Sending request...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!response) {
        return <div>No response yet</div>;
    }

    const getFormattedBody = () => {
        try {
            const parsed = JSON.parse(response.body);
            return JSON.stringify(parsed, null, 2);
        } catch (e) {
            return response.body;
        }
    };

    const formattedBody = getFormattedBody();

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(formattedBody);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
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

        <div className="flex justify-center space-x-4">
            <button
                className={`text-sm px-3 py-1 rounded ${
                    activeTab === "body" ? "text-white bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => { setActiveTab("body"); setCopied(false); }}>
                Body
            </button>
            <button
                className={`text-sm px-3 py-1 rounded ${
                    activeTab === "headers" ? "text-white bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
                onClick={() => setActiveTab("headers")}>
                Headers
            </button>
        </div>
        
        {activeTab === "headers" && (
            <div>
                <h4 className="font-semibold text-gray-700">Headers ({Object.keys(response.headers || {}).length})</h4>
                <div className="space-y-1 max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
                    {response.headers && Object.keys(response.headers).length > 0 ? (
                        Object.entries(response.headers).map(([key, value]) => (
                            <div key={key} className="text-sm">
                                <span className="font-medium text-gray-700">{key}:</span>{" "}
                                <span className="text-gray-600 break-all">{value}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-500">No headers</div>
                    )}
                </div>
            </div>
        )}
        
        {activeTab === "body" && (
            <div>
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-gray-700">Body</h4>
                    <button 
                        className={`text-sm px-3 py-1 rounded ${
                            copied ? "text-white bg-green-500 hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={handleCopy}>
                            {copied ? "✓ Copied" : "Copy"}
                    </button>
                </div>
                <pre className="text-sm bg-gray-900 text-green-200 p-3 rounded overflow-auto max-h-64 leading-relaxed">
                    {formattedBody}
                </pre>
            </div>
        )}
    </div>
   )
}

export default ResponseViewer;