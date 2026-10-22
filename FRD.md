# Functional Requirements Document (FRD)

## 1. Overview
This document describes how the Task Management System should behave.

## 2. Functional requirements
| ID | Function | Expected behaviour |
|---|---|---|
| FR-01 | Add task | The user enters a title and may add an assignee, due date, status, and description. |
| FR-02 | Validate title | The title is required; blank titles cannot be submitted. |
| FR-03 | Edit task | Selecting Edit loads the selected task into the form. Saving updates the existing task. |
| FR-04 | Delete task | Selecting Delete asks for confirmation before removing the task. |
| FR-05 | Update status | Next status cycles through To Do, In Progress, and Completed. |
| FR-06 | Search | Search checks the title, assignee, and description. |
| FR-07 | Filter | The user can display all tasks or tasks with one selected status. |
| FR-08 | Summary | Counts for total, To Do, In Progress, and Completed update automatically. |
| FR-09 | Persistence | Task data is stored in browser localStorage. |

## 3. Non-functional requirements
- Usability: labels and controls should be clear.
- Responsiveness: the layout should adapt to mobile and desktop screens.
- Maintainability: HTML, CSS, and JavaScript are kept in separate files.
- Basic safety: user-entered text is escaped before it is inserted into task-list HTML.
- Performance: the prototype should work smoothly with a small task list.

## 4. Main user flow
1. Open the website.
2. Enter a task title and optional details.
3. Select Add Task.
4. Review the task in the list.
5. Edit, update status, search/filter, or delete as needed.

## 5. Acceptance criteria
- A task cannot be added without a title.
- Newly added tasks appear in the list.
- Editing changes the existing task instead of creating a duplicate.
- Deleting requires confirmation.
- Search and status filtering work together.
- Summary counts reflect the current task list.
- Tasks persist after a page refresh in the same browser.
