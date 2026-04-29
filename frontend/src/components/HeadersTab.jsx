function HeadersTab({ headers }) {
    const headerCount = headers ? Object.keys(headers).length : 0;

    return (
        <div>
            <h4 className="font-semibold text-gray-700">Headers ({headerCount})</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
                {headers && Object.keys(headers).length > 0 ? (
                    Object.entries(headers).map(([key, value]) => (
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
    );
}

export default HeadersTab;