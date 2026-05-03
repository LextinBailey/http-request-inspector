import { useState, useEffect } from "react";
import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";

import BodyTab from "./BodyTab";
import HeadersTab from "./HeadersTab";

function ResponseViewer({ loading, error }) {
    const { session } = useContext(SessionContext);

    const [activeTab, setActiveTab] = useState("body");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setActiveTab("body");
        setCopied(false);
    }, [session.response]);

    if (loading) {
        return <div>Sending request...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!session.response) {
        return <div>No response yet</div>;
    }

    const getFormattedBody = () => {
        try {
            const parsed = JSON.parse(session.response.body);
            return JSON.stringify(parsed, null, 2);
        } catch (e) {
            return session.response.body;
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

    const isSuccess = session.response.status >= 200 && session.response.status < 300;

   return (
    <div className="border border-border rounded-lg overflow-hidden mt-3">

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex item-center gap-2">
                <span className="font-mono text-xs text-muted bg-active border border-border rounded px-2 py-1">
                    {session.response.time} ms
                </span>

                <button
                    className={`text-xs px-3 py-1 rounded font-mono transition-colors ${
                        activeTab === "body" ? "bg-accentSoft text-accent border border-accent"
                                             : "bg-active text-muted border border-border hover:text-primary"}`}
                    onClick={() => setActiveTab("body")}>
                    Body
                </button>

                <button
                    className={`text-xs px-3 py-1 rounded font-mono transition-colors ${
                        activeTab === "headers" ? "bg-accentSoft text-accent border border-accent"
                                                 : "bg-active text-muted border border-border hover:text-primary"}`}
                    onClick={() => setActiveTab("headers")}>
                    Headers
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span className={`font-mono text-sm font-semibold ${isSuccess ? "text-success" : "text-red-400"}`}>
                    {session.response.status} {isSuccess ? "OK" : ""}
                </span>

                <button 
                    className="text-xs font-mono bg-transparent border border-border text-primary px-3 py-1 rounded hover:text-primary
                     hover:border-accent transition-colors"
                    onClick={handleCopy}>
                        {copied ? "✓ Copied" : "Copy"}
                </button>
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Tab Content */}
        <div className="bg-panel p-4 min-h-40">
            {activeTab === "headers" && (
                <HeadersTab
                    headers={session.response.headers}
                />
            )}
            
            {activeTab === "body" && (
                <BodyTab
                    formattedBody={formattedBody}
                />
            )}
        </div>
    </div>
   );
}

export default ResponseViewer;