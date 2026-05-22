# Glynac Family Tree Challenge

## Overview
This solution implements the planet of Lengaburu family tree challenge in TypeScript using an extensible OOP-oriented design.

The implementation focuses on:
- Clean domain modeling
- Extensibility
- Type safety
- Error handling
- Maintainability
- Testability

## Features
### Supported Commands
1. ADD_CHILD
    ```txt
    ADD_CHILD MotherName ChildName Gender
    Example: ADD_CHILD Flora Molly Female
    Responses:
    - CHILD_ADDED
    - PERSON_NOT_FOUND
    - CHILD_ADDITION_FAILED
    - INVALID_GENDER
    - INVALID_COMMAND
    ```
2. GET_RELATIONSHIP
    ```txt
    GET_RELATIONSHIP Name Relationship
    Example: GET_RELATIONSHIP Bill Son
    Responses:
    - <List of Relation>
    - NONE
    - PERSON_NOT_FOUND
    - INVALID_COMMAND
    ```

### Supported Relationships
- Son
- Daughter
- Siblings
- Brother-In-Law
- Sister-In-Law
- Maternal-Uncle
- Maternal-Aunt
- Paternal-Uncle
- Paternal-Aunt

### Error Handling
Handled scenarios include:
- Unknown people.
- Invalid commands.
- Malformed input.
- Invalid gender values.
- Duplicate member names.
- Unsupported relationships.
- Invalid child additions.
- Empty relationship results.

Example as follows.
```txt
ADD_CHILD Flora Bob UFO
=> INVALID_GENDER
ADD_CHILD Bill Bob Male
=> CHILD_ADDITION_FAILED
GET_RELATIONSHIP Bill Alien
=> NONE
```

### Assumptions
- Person names are globally unique.
- Commands are case-sensitive.
- Relationship results preserve insertion order.
- Family tree is maintained fully in-memory.
- Mutations only occur through exposed APIs.

## Setup & Installation
1. Prerequisites
- Node.js >= 18
- npm

### Steps
1. Install the dependencies.
    ```sh
    npm install
    ```
2. Run.
    ```sh
    # Option 1:
    npm run dev sample-input.txt

    # Option 2:
    npm run build
    npm start sample-input.txt
    ```
3. Run the tests.
    ```sh
    npm test
    ```

## Notes
### Separation of Responsibilities
- FamilyTree handles storage and mutations.
- RelationshipResolver handles relationship traversal.
- CommandProcessor handles parsing and console I/O.

### Type Safety
Result enums are used instead of raw string literals where appropriate to improve maintainability and reduce typo risks.

### Complexity
- Member lookup: O(1) using Map.
- Relationship traversal: approximately O(n)

### Extensibility
The design supports easy extension for:
- New relationships.
- Persistence layers.
- REST APIs.
- Strategy-based relationship resolution.
- Caching and optimization.
