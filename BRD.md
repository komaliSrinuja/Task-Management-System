# Business Requirements Document (BRD)

## 1. Project name
Task Management System

## 2. Purpose
Provide a simple interface for recording tasks, assigning an owner, setting a due date, and monitoring task status.

## 3. Business problem
Tasks managed informally can be forgotten, delayed, or difficult to track. A centralized task list makes task details and progress easier to review.

## 4. Objectives
- Create and maintain a list of tasks.
- Make task ownership and due dates visible.
- Track work through To Do, In Progress, and Completed.
- Search and filter tasks quickly.

## 5. Stakeholders
- Project user
- Project coordinator
- Developer
- Tester

## 6. Scope
### In scope
- Add, edit, and delete tasks.
- Store task title, assignee, due date, description, and status.
- Search and filter tasks.
- Display task counts by status.

### Out of scope
- User accounts and authentication.
- Shared cloud database or real-time collaboration.
- Email notifications.
- Direct Jira integration.

## 7. Business requirements
| ID | Requirement | Priority |
|---|---|---|
| BR-01 | Users can add a task with a title. | High |
| BR-02 | Users can optionally assign a person and due date. | Medium |
| BR-03 | Users can update task details and status. | High |
| BR-04 | Users can delete a task after confirmation. | Medium |
| BR-05 | Users can search and filter the task list. | Medium |
| BR-06 | The dashboard displays task counts by status. | Medium |

## 8. Success criteria
- A user can add, edit, update, search, filter, and delete tasks.
- Summary counts update after task changes.
- Tasks remain available after refreshing the same browser, subject to localStorage availability.

## 9. Assumptions and constraints
- The user has a modern web browser.
- The prototype is intended for demonstration and stores data locally on one browser/device.
