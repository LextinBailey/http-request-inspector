# HTTP Request Inspector

A Postman-like tool that allows users to create HTTP requests and inspect responses.

## 📝 Overview

HTTP Request Inspector is a full-stack application that allows users to build HTTP requests and inspect real responses from external APIs.

This project was built to strengthen my understanding of:
- React component architecture
- State management and data flow
- Client-server interaction patterns

## 💻 Tech Stack

- Frontend: React (Vite)
- Backend: Node.js + Express

## 🔥 Features

### 🛠️ Core Features

- [x] Controlled form inputs (URL + method)
- [x] Component-based UI structure
- [x] Loading state handling
- [x] Error state handling
- [x] Conditional rendering based on state
- [x] Dynamic rendering of response data (headers, body, status)
- [x] Parses JSON responses from backend
- [x] Backend receives request configuration (URL + method)
- [x] POST `/request` endpoint
- [x] Performs HTTP request (`fetch`)
- [x] Cross-origin requests (`CORS`)
- [x] Request history (past 5 requests)
- [x] Request history rehydration
- [x] Dynamic custom request headers
- [x] POST Support
- [x] Tabs (Body | Headers)
- [x] Copy response

### 👨‍💻 Developer Experience

- [x] Backend logging (incoming requests, fetch errors)

## ⚙️ How It Works Internally

⚠️ This section is optional and provides a deeper look into the internal design.

### 1. Component Architecture

The application is structured around a top-level `App` component which manages all shared state.

It renders two child components:
- `RequestForm` -> captures user input
- `ResponseViewer` -> displays the response

### 2. State Management

The application uses a session-based state model with React Context for shared data

A global provider (`SessionProvider`) manages a centralized `session` object:
- `session.request` -> current request configuration (URL, method, headers, body)
- `session.response` -> latest response data from the backend

Additional UI state is managed locally within the application:
- `loading` -> indicates an active request
- `error` -> stores any request failure
- `history` -> stores recent request/response sessions

Instead of managing multiple independent pieces of state (`url`, `method`, etc.), the application centralizes request/response into a single `session` object. This ensures consistency between the request being edited and the response being displayed.

The app follows React's unidirectional data flow:
- `SessionProvider` owns and distributes the shared `session` state
- `RequestForm` updates `session.request` (user input)
- `ResponseViewer` reads from `session.response` (output display)
- `App` coordinates UI state such as loading, errors, and request history

Design Reasoning for this Approach:
- Eliminates duplicated state
- Keeps request and response tightly coupled
- Separates global data (session) from UI state (loading/error/history)
- Makes restoring past requests (history) straightforward
- Mirrors how real API clients manage request/response lifecycles

Context is used for state distribution, while state ownership remains within the provider component.

### 3. Controlled Inputs

`RequestForm` uses controlled inputs:
- Input values are tied to state (`value={...}`)
- User input updates state via `onChange`

This ensures the UI always reflects the current application state.

### 4. Event Flow

When a request is sent:
1. `RequestForm` updates `session.request`
2. `App` sends the request to the backend
3. The response is stored in `session.response`
4. `ResponseViewer` automatically re-renders with the new data

### 5. Request Lifecycle

Frontend:
- `loading` is set to `true`
- Errors are cleared
- Sends a request to the backend server (`fetch("http://localhost:3000/request")`)

Backend:
- Calls controller layer function `handleRequest(req, res)`
    - Extracts data from the request (`url`, `method`, `headers`, `body`)
    - Builds `options`
    - Calls service layer function `executeRequest(url, options)`
        - Starts a timer
        - Sends a request to the user-provided URL (`fetch(url, options)`)
        - Converts response into plain text
        - Calculates how long the request took
        - Returns response object
    - Sends JSON response back to frontend (`status`, `headers`, `body`, `time`)
    - Returns error response (`500`) if request fails
- Acts as a proxy between frontend and external APIs

Frontend:
- Parses response
- Checks `res.ok` to handle backend errors
- Stores response in state 
- `loading` is set to `false`

### 6. Conditional Rendering

`ResponseViewer` renders different UI based on application state:

- If `loading` -> displays "Sending request..."
- If `error` -> displays error message
- If no response -> displays placeholder
- Otherwise -> displays response data

### 7. Rendering Response Data

Response headers are stored as an object and rendered dynamically using:

`Object.entries(headers).map(...)`

This converts key-value pairs into UI elements.

Handles missing or undefined data to prevent UI crashes.

### 8. Request History

On component mount, a `useEffect` runs once to retrieve any saved request history from `localStorage`.
If valid data exists, it is parsed and used to initialize the `history` state.

Each time a request is successfully completed, `handleNewRequest` prepends the new request object to the `history` array while keeping only the last 5 entries.

A second `useEffect` watches the `history` state and synchronizes any changes back to `localStorage`.
This ensures persistence across page reloads.

### 9. Request History Rehydration

When user selects a request from request history, `RequestForm` calls the `onSelectHistory` function passed from `App`.

`populateRequest` restores full state to synchronize form and response viewer from history.

### 10. Custom Request Headers

User can dynamically add and remove request headers via the UI.

Header inputs are stored as an array object in state.

On request submission, this array is transformed into a key-value object (`headersMap`) to match the expected HTTP headers format.
Empty header keys are filtered out to prevent invalid requests.

This object is sent to the backend in the POST `/request` payload, where it is then passed directly into the `fetch` call to configure the outgoing HTTP request.

### 11. Post Support

When the selected request method is `POST`, a textarea is conditionally rendered to allow users to input a request body.

The body is managed as a controlled string state to support raw input (JSON or text).

On request submission:
- If `Content-Type: application/json` is present, the body is validated using `JSON.parse`
- Invalid JSON prevents the request and triggers an error state

The body is then included in the POST `/request` payload.

On the backend, the request body is only attached to the outgoing `fetch` call when the method is `POST` and the body is non-empty.

### 12. Copy Response

When a user clicks 'Copy':
- `handleCopy()` tries to copy `formattedBody` to the clipboard (`navigator.clipboard.writeText(formattedBody)`)
- If copying failed, the error is caught and logged
- UI updates to display successful 'Copied' feedback

UI is reset on `response` state update.

## 📁 Project Structure

```
http-request-inspector/
├── backend/
│   └── src/
│   │   ├── services/
│   │   │   ├── httpService.js
│   │   ├── controllers/
│   │   │   ├── requestController.js
│   │   └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │   │   ├── RequestForm.jsx
│   │   │   ├── ResponseViewer.jsx
│   │   │   ├── BodyTab.jsx
│   │   │   └── HeadersTab.jsx
├── progress-log.md
└── README.md
```

## 📈 Development Notes

Progress and development insights are tracked in `progress-log.md`.

## 🚧 Status

In Progress