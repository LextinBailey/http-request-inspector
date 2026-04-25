import { useState, useEffect } from "react";

import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showHeaders, setShowHeaders] = useState(false);

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

  const handleSend = async () => {
    setResponse(null);
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
    } finally {
      setLoading(false);
    }
  };

  function handleNewRequest(requestData) {
    setHistory(prev => {
      const updated = [requestData, ...prev].slice(0, 5);
      return updated;
    });
  }
  
  const populateRequest = (item) => {
    setUrl(item.url);
    setMethod(item.method);
    setSelectedHistory(item.timestamp);
  };

  const handleUrlChange = (value) => {
    setUrl(value);
    setSelectedHistory(null);
  };

  const handleMethodChange = (value) => {
    setMethod(value);
    setSelectedHistory(null);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    }}>
      <h1 style={{ flexShrink: 0 }}>HTTP Request Inspector</h1>

      <div style={{ flexShrink: 0 }}>
        <RequestForm 
          url={url}
          setUrl={handleUrlChange}
          method={method}
          setMethod={handleMethodChange}
          onSend={handleSend}
          history={history}
          onSelectHistory={populateRequest}
          selectedHistory={selectedHistory}
        />
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponseViewer 
          response={response}
          loading={loading}
          error={error}
          showHeaders={showHeaders}
          setShowHeaders={setShowHeaders}
        />
      </div>
    </div>
  );
}

export default App
