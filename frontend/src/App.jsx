import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  return (
    <div>
      <h1>HTTP Request Inspector</h1>
      <RequestForm />
      <ResponseViewer />
    </div>
  );
}

export default App
