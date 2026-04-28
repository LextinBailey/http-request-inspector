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

## Day 7 (Apr 24, 2026): Populate Request, Selected History, Status and Time, URL Overflow

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
- Added handling for URL overflow
    - Used Flexbox layout system

## Day 8 (Apr 25, 2026): Header/Body Overflow, Setting Request Headers UI

- Tested large API response (`https://dummyjson.com/products?limit=100`) and ran into major UI issue
    - Response body would disappear or get pushed off screen
    - Some headers would overflow horizontally
    - After debugging: data was correct, UI couldn't display it properly
- Implemented root layout with Flexbox
    - Don't collapse fixed sections (`RequestForm`) and (`ResponseViewer`) takes remaining space
    - Allowed children to shrink (scrolling)
- Updated `<pre>` styling:
    - Long JSON wraps properly
    - No horizontal overflow
- Added scrollable body
    - Wrapped body in a flex-controlled container
- Added scrollable headers
    - Headers cannot grow infinetely
- Added header toggle
    - Introduced collapsable headers
- Added input fields to enter custom request headers
    - Not connected to backend yet
- Added `Add Header` button to add a empty header

## Day 9 (Apr 26, 2026): Remove Header, Converting Array to Object, Connected Backend

- Added `Remove` button to each header row
- Converted `headers` array to key-value object (`headersMap`)
    - Filtered out empty header keys to prevent invalid requests
- Sent `headersMap` in the POST `/request` payload
    - Passed directly into the `fetch` call

## Day 10 (Apr 27, 2026): POST Support, Tailwind CSS Setup

- Added conditionally rendered textarea when the selected request method is `POST`
- Implemented JSON body validation
    - If `Content-Type: application/json` is present, the body is validated
    - Invalid JSON prevents the request
- Included `body` in the POST `/request` payload
- Added backend `method` checking
    - If the method is `POST`, body is attached to the outgoing `fetch`
- Installed Tailwind v3
    - v3 > v4 (Stable, well-documented Vite + React setup)
    - `.cjs` config files (Project uses `"type": "module"` in `package.json`)

## Day 11 (Apr 28, 2026): UI Improvements (RequestForm & ResponseViewer)

- Introduced layout system (App shell)
    - Wrapped application in a centered container using Tailwind (`max-w`, `mx-auto`, `p-6`)
    - Added background and vertical spacing (`space-y-*`)
    - Established consistent structure for all UI sections
- Converted `RequestForm` into card UI
    - Implemented "card" patter (`bg-white`, `border`, `rounded`, `shadow-sm`)
    - Introduced consistent padding and spacing system
    - Improved visual separation between sections
- Refactored request bar
    - Grouped inputs into a single flex row (`flex`, `gap-2`)
    - Removed labels
    - Added hover + focus states for better UX feedback
- Built structured headers editor
    - Used flex layout for consistent alignment (`flex`, `flex-1`)
    - Added placeholders for clarity
    - Wrapped list in scrollable container (`max-h`, `overflow-y-auto`) to prevent layout break
- Improved request history panel
    - Converted history list into a scrollable, bounded container
    - Introduced truncation for long URLs
- Upgraded `ResponseViewer` layout
    - Converted into reusable card structure (matching `RequestForm`)
    - Created top status bar with response time + status
    - Improved hierarchhy and readability of response metadata
- Structured headers display
    - Added bounded, scrollable container for headers
    - Handled long header values with wrapping (`break-all`)
- Improved response body display
    - Styled response body as a code block (`<pre>`) 
    - Added scroll handling (`overflow-auto`, `max-h`)
- Established consistent design patterns
    - Reused card layout across components
    - Standardized spacing
    - Applied consistent color system
- Learned the importance of establishing reusable patterns for future features