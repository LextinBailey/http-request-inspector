function HeadersTab({ headers }) {
    const headerCount = headers ? Object.keys(headers).length : 0;

    return (
        <div className="space-y-2">
            <span className="text-labels uppercase tracking-widest text-xs block mb-2">Headers ({headerCount})</span>
            <div className="space-y-1 max-h-40 overflow-y-auto">
                {headers && Object.keys(headers).length > 0 ? (
                    Object.entries(headers).map(([key, value]) => (
                        <div key={key} className="flex gap-3 font-mono text-xs">
                            <span className="text-accent w-48 shrink-0 truncate">{key}:</span>{" "}
                            <span className="text-input break-all">{value}</span>
                        </div>
                    ))
                ) : (
                    <span className="text-muted text-xs font-mono">No headers</span>
                )}
            </div>
        </div>
    );
}

export default HeadersTab;