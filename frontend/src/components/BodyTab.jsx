function BodyTab({ formattedBody }) {
    return (
        <pre className="font-mono text-xs text-input whitespace-pre-wrap break-all leading-relaxed">
            <span className="text-labels uppercase tracking-widest text-xs block mb-2">Body</span>
            {formattedBody || <span className="text-muted">No body</span>}
        </pre>
    );
}

export default BodyTab;