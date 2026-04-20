import { useState } from "react";

import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);

  const handleSend = () => {
        const fakeResponse = {
          status: "200 OK",
          headers: {
            "Content-Type": "application/json"
          },
          body: "...",
          time: 123
        }

        setResponse(fakeResponse);
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
      />
    </div>
  );
}

export default App
