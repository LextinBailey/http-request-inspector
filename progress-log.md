# Progress Log

A day-by-day log of development decisions, features, and design evolution.

## Day 1 (Apr 18, 2026): GitHub Repo, Initial Setup

- Created GitHub repository
- Initial setup:
    - Frontend: React (Vite)
    - Backend: Node.js + Express

## Day 2 (Apr 19, 2026): RequestForm, ResponseViewer, Added RequestForm State, Moved State, Moved Send, Fake Response, Loading, Error Handling

- Added a static RequestForm and ResponseViewer
- Added state to RequestForm
    - Accept user input for url and method
    - Send data to console
- Moved state to `App.jsx`
    - App owns data
    - State passed down to RequestForm
    - RequestForm receives props
- App now handles send when RequestForm calls `onSend()`
- Simulated a fake response when send is clicked
    - `handleSend()` runs
    - response state set
    - UI re-renders
    - ResponseViewer shows data
- Simulated network delay and async behavior
- Simulated failure and error handling

## Day 3 (Apr 20, 2026): README Filled Out

- Updated README with current status and understanding of internals