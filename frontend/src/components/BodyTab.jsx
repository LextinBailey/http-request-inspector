function BodyTab({ formattedBody, copied, onCopy }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold text-gray-700">Body</h4>
                <button 
                    className={`text-sm px-3 py-1 rounded ${
                        copied ? "text-white bg-green-500 hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={onCopy}>
                        {copied ? "✓ Copied" : "Copy"}
                </button>
            </div>
            
            <pre className="text-sm bg-gray-900 text-green-200 p-3 rounded overflow-auto max-h-64 leading-relaxed">
                {formattedBody}
            </pre>
        </div>
    );
}

export default BodyTab;