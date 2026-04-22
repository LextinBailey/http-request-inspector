import { useState } from "react";

import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:3000/request", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ url, method })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Request failed");
        }

        setResponse(data);
        } catch(err) {
            setError("Request failed");
            setResponse(null);
        }
        
        setLoading(false);
    };

  return (
    <div>
      <h1>HTTP Request Inspector</h1>
      <RequestForm 
        url={url}
        setUrl={setUrl}
        method={method}
        setMethod={setMethod}
        onSend={handleSend}
      />
      <ResponseViewer 
        response={response}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App
