function RequestForm() {
    return (
        <div>
            <div>
                <label>URL: </label>
                <input />
            </div>

            <div>
                <label>HTTP Method: </label>

                <select>
                    <option value="">Select a method</option>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
                
                <button>Send</button>
            </div>
        </div>
    );
}

export default RequestForm;