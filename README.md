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
- [ ] make code mode readable

### frontend

- [x] dark / light theme
- [x] home page
  - [x] view change controller
    - [x] table view - calendar component
    - [x] row view
    - [x] cell note taking with preview
  - [x] CRUD actions

  - [ ] table view
    - [ ] create default records array if no records from backend (make them disabled)
    - [ ] add shadows corners for table (::before and ::after)
    - [ ] fix update habit within mobx model
    - [ ] fix height of table cells

  - [ ] cards view
    - [ ] render habits for each card
    - [ ] colorize card depends on habits done status and goal
    - [ ] add form to create new habit

- [x] login page
- [x] registration page

- [ ] new theme palette
- [ ] change colors to theme palette
- [ ] responsive design

- [ ] logout button
- [ ] refresh token if expired
- [ ] weather widget

- [ ] analytics page ?
- [ ] settings page ?
