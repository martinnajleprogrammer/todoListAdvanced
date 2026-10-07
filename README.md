# Todo List Advanced

A to-do app built to practice state management patterns beyond `useState`: Redux Toolkit, Redux Saga for side effects, and persisted state, backed by a local JSON server.

## Features

- Add tasks with Enter, remove them, and edit inline with a double click.
- Tasks have a `todo` / `done` state, with filters and totals.
- Dark mode toggle.
- State persisted across reloads (`redux-persist`).
- Syncs with a local REST API (`json-server`) and shows the database status in the UI.

## Stack

React 19, TypeScript, Vite, Tailwind CSS, Redux Toolkit, Redux Saga, redux-persist, json-server.

## Project structure

```
src/store/        slices (todos, ui, db, queue sync) and sagas
src/components/   task list, filters, totals, db status, dark mode
src/hooks/        todos, dark mode and JSON helpers
database/db.json mock database
```

## Run it locally

```bash
npm install
npm run server   # json-server on port 3001
npm run dev      # in another terminal
```

## Notes

Practice project: the goal was to compare state management approaches and to handle async side effects and loading/error states in a small, well-scoped app. No automated tests yet.
