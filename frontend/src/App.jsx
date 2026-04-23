import { useState, useEffect } from "react";

import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to parse history:", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  function handleNewRequest(requestData) {
    setHistory(prev => {
      const updated = [requestData, ...prev].slice(0, 5);
      return updated;
    });
  }

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

            const result = {
              method: method,
              url: url,
              status: data.status,
              time: data.time,
              timestamp: Date.now()
            };

            setResponse(data);
            handleNewRequest(result);
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
        history={history}
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
