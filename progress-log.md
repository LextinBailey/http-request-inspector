# Progress Log

A day-by-day log of development decisions, features, and design evolution.

## Day 1 (Apr 18, 2026): GitHub Repo, Initial Setup

- Created GitHub repository
- Initial setup:
    - Frontend: React (Vite)
    - Backend: Node.js + Express

## Day 2 (Apr 19, 2026): RequestForm, ResponseViewer, Added RequestForm State, Moved State, Moved Send, Fake Response, Loading, Error Handling

- Added a static `RequestForm` and `ResponseViewer`
- Added state to `RequestForm`
    - Accept user input for `url` and `method`
    - Send data to console
- Moved state to `App.jsx`
    - `App` owns data
    - State passed down to `RequestForm`
    - `RequestForm` receives props
- `App` now handles `Send` when `RequestForm` calls `onSend()`
- Simulated a fake response when `Send` is clicked
    - `handleSend()` runs
    - `response` state set
    - UI re-renders
    - `ResponseViewer` shows data
- Simulated network delay and async behavior
- Simulated failure and error handling

## Day 3 (Apr 20, 2026): README Filled Out

- Updated `README.md` with current progress and understanding of internals

## Day 4 (Apr 21, 2026): JSON Parsing, Receiving Request Data

- Enabled JSON parsing
    - Incoming JSON gets turned into a JavaScript object
- Server receives request data
    - Logs incoming JSON
    - Sends back "Received"

## Day 5 (Apr 22, 2026): Backend Endpoint, Connecting Frontend -> Backend, CORS, Frontend Error Handling, Invalid URL, Backend Logging, UI Improvements

- Implemented `POST /request` endpoint in backend
    - Accepts `{ url, method }` from frontend
    - Perfoms HTTP request using `fetch`
    - Returns structured JSON
- Connected frontend to backend using `fetch("http://localhost:3000/request")`
    - Sends request configuration (URL + method)
    - Awaits response
    - Parses JSON
    - Stores response in state and passes to `ResponseViewer`
- Installed and enabled `CORS` in backend
    - Allows cross-origin requests between:
        -  Frontend: `localhost:5173`
        -  Backend: `localhost:3000`
- Added error handling (frontend)
    - Wrapped request in `try/catch`
    - Checked `res.ok` to detect backend errors
    - Displays error message in UI
- Added error handling (backend)
    - Wrapped external `fetch` in `try/catch`
    - Prevents server crashes from invalid URLs or failed requests
- Added backend logging
    - Incoming requests (`url`, `mehthod`)
    - Fetch errors
- Learned to handle mismatched frontend/backed data (e.g. missing headers causing UI crash)
- Added simple UI improvements
    - Added "pretty-print" for JSON formatting
    - Grouped sections
    - Added bold headers
    - Added colored status
    - Added response time

## Day 6 (Apr 23, 2026): Request History Logic and Display

- Implemented request history (past 5 requests)
    - Retrieves any saved request history from `localStorage`
    - `handleNewRequest` prepends successfully completed request objects to `history`
- Implemented request history display
    - Displays the last 5 entries (`method`, `url`)

## Day 7 (Apr 24, 2026): Populate Request, Selected History, Status and Time

- Implemented clickable request history to populate request form
    - `populateRequest` sets (`url`, `method`) to (`item.url`, `item.method`)
    - UX polish: cursor pointer and background change on hover
- Learned the difference between `onClick={onSelectHistory(item)}` and `onClick{() => onSelectHistory(item)}`
    - Passes a function reference instead of calling it
    - Difference between executing now vs. later
- Implemented selected history
    - Selected request stays highlighted until changed
    - Any manual `url` or `method` changes clears selection
- Created wrapper functions `handleUrlChange` and `handleMethodChange`
    - Keeps state logic centralized in `App`
- Reorganized `App.jsx`:
    - Effects
    - Request logic
    - UI interaction logic
- Added `item.status` and `item.time` to request history