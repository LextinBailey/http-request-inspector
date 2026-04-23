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
- [x] `POST /request` endpoint
- [x] Performs HTTP request (`fetch`)
- [x] Cross-origin requests (`CORS`)
- [x] Request History (past 5 requests)

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

All state is stored in `App` and passed down via props:

- `url` -> request URL
- `method` -> HTTP method (GET, POST)
- `response` -> response data object
- `loading` -> indicates an active request
- `error` -> stores any request failure

This follows React's unidirectional data flow:
- State is owned by the parent (`App`)
- Child components receive and update state via props

### 3. Controlled Inputs

`RequestForm` uses controlled inputs:
- Input values are tied to state (`value={...}`)
- User input updates state via `onChange`

This ensures the UI always reflects the current application state.

### 4. Event Flow

1. User enters a URL and selects a method
2. User clicks "Send"
3. `RequestForm` calls the `onSend` function passed from `App`
4. `App` handles the request logic

### 5. Request Lifecycle

Frontend:
- `loading` is set to `true`
- Errors are cleared
- Sends a request to the backend server (`fetch("http://localhost:3000/request")`)

Backend:
- Extracts data from the request (`url`, `method`)
- Starts a timer
- Sends a request to the user-provided URL (`fetch(url, { method })`)
- Converts response into plain text
- Calculates how long the request took
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

## 📁 Project Structure

```
http-request-inspector/
├── backend/
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       └── server.js
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │   │   ├── RequestForm.jsx
│   │   │   └── ResponseViewer.jsx
├── progress-log.md
└── README.md
```

## 📈 Development Notes

Progress and development insights are tracked in `progress-log.md`.

## 🚧 Status

In Progress