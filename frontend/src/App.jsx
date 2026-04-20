import { useState } from "react";

import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");

  const handleSend = () => {
        console.log({ url, method });
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
      <ResponseViewer />
    </div>
  );
}

export default App
