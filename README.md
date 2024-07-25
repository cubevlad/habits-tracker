# Simple application for tracking your habits

## TODO:

### infrastructure

- [ ] deploy
- [ ] ci/cd

### backend

- [x] add database
- [x] add auth
- [x] add api

- [ ] add route / user with admin role

refactoring:

- [ ] routes -> move to services/controllers
- [ ] add error handling
- [ ] make code mode readable

### frontend

- [x] dark / light theme
- [x] home page
  - [x] view change controller
    - [x] table view - calendar component
    - [x] row view
    - [x] cell note taking with preview
  - [x] CRUD actions

  - [x] table view
    - [x] create default records array if no records from backend (make them disabled)
    - [x] fix update habit within mobx model
    - [x] fix height of table cells
    - [x] highlight today's col

  - [ ] cards view
    - [x] render habits for each card
    - [x] colorize card depends on habits done status and goal
    - [x] add form to create new habit
    - [ ] make modal with scrollable containers with habits and notes

- [x] login page
- [x] registration page

- [ ] new theme palette
- [ ] change colors to theme palette
- [ ] responsive design

- [x] logout button
- [ ] add account info
- [ ] refresh token if expired
- [ ] weather widget

- [ ] analytics page ?
- [ ] settings page ?
