import { useState, useEffect } from "react";
import BodyTab from "./BodyTab";
import HeadersTab from "./HeadersTab";

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
                onClick={() => setActiveTab("body")}>
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
            <HeadersTab
                headers={response.headers}
            />
        )}
        
        {activeTab === "body" && (
            <BodyTab
                formattedBody={formattedBody}
                copied={copied}
                onCopy={handleCopy}
            />
        )}
    </div>
   )
}

export default ResponseViewer;