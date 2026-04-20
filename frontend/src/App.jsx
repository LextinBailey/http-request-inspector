import { useState } from "react";

import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = () => {
        const fakeResponse = {
          status: "200 OK",
          headers: {
            "Content-Type": "application/json"
          },
          body: "...",
          time: 123
        }

        const shouldFail = Math.random() < 0.3;

        setLoading(true);

        setTimeout(() => {
          if (shouldFail) {
            setError("Request failed");
            setResponse(null);
          } else if (!shouldFail) {
            setError(null);
            setResponse(fakeResponse);
          }
          setLoading(false);
        }, 1000);
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
