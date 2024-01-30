# Suggested Design
---

- [Front](#front)
- [View](#view)
- [Back](#back)
- [Tech Stack](#tech-stack)
- [Additional Details](#additional-details)
- [Compatibility](#compatibility)

## Front
### Input:
- Text input for chat

### Output:
- Results with associated confidence level
- Source or evidence to substantiate information provided to the user

## View
### Interfaces:
- Front-end View: User interface (UI) or browser extension designed for user interaction

## Back
### APIs to be utilized
- Two types of APIs:
  - Front-end View API: Responsible for requesting information from the back-end
  - Back-end: Retrieves the most recent model from the trainer module and maintains the latest version for processing requests from the front-end.

## Tech Stack
### Front-end:
- React

### Back-end:
- Spring or Node.js:

> *Note:* The choice between Spring and Node.js can be influenced by the team's familiarity, project requirements, and preferences. Considering Spring's industry familiarity and Node.js's job market demand, the trial of Node.js offers flexibility and exposure to skills in demand.

## Additional Details
### Communication Protocols:
- RESTful API for communication between the front-end, back-end, and any other services.

### Hosting and Deployment:
- Hosting Platform: Azure
- Deployment Strategy:
  - Automated deployment using GitHub CI/CD on commit (for the main branch).
  - Separate deployment for testing from any branch.

## Compatibility
### The system is designed with flexibility to be compatible with various UI services.
### Future updates may include adaptations for mobile apps and other interfaces as needed.
