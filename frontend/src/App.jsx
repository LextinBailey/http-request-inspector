import { useContext, useState, useEffect } from "react";
import { SessionContext } from "./context/SessionContext";

import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  
  const { session, setSession } = useContext(SessionContext);

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
    setLoading(true);
    setError(null);

    const headersMap = (session.request.headers || []).reduce((acc, header) => {
      if (header.key.trim() !== "") {
        acc[header.key] = header.value;
      }
      return acc;
    }, {});

    // Validation phase
    if (session.request.method === "POST" && session.request.body && session.request.body.trim() !== "") {
      const isJson = session.request.headers.some(h =>
        h.key.toLowerCase() === "content-type" &&
        h.value.includes("application/json")
      );

      if (isJson) {
        try {
          JSON.parse(session.request.body);
        } catch {
          setError("Invalid JSON body");
          setLoading(false);
          return;
        }
      }
    }

    try {
      const res = await fetch("http://localhost:3000/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          url: session.request.url,
          method: session.request.method,
          headers: headersMap,
          body: session.request.body
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      const result = {
        request: {
          url: session.request.url,
          method: session.request.method,
          headers: headersMap,
          body: session.request.body
        },
        response: data,
        timestamp: Date.now()
      };

      setSession(prev => ({
        ...prev,
        response: data
      }));

      handleNewRequest(result);
    } catch(err) {
      setError(err.message || "Request failed");
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
    const headersObject = item.request.headers || {};

    const headersArray = Object.entries(headersObject).map(([key, value]) => ({
      key,
      value
    }));

    setSession({
      request: {
        url: item.request.url,
        method: item.request.method,
        headers: headersArray.length > 0 ? headersArray : [{ key: "", value: "" }],
        body: item.request.body || ""
      },
      response: item.response
    });

    setSelectedHistory(item.timestamp);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          HTTP Request Inspector
        </h1>

        <RequestForm 
          onSend={handleSend}
          history={history}
          onSelectHistory={populateRequest}
          selectedHistory={selectedHistory}
        />

        <ResponseViewer 
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default App
