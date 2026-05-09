# ByeByeDirt_App_Specification_for_Codex.md

This document is the source of truth for Phase 1 of the Bye Bye Dirt Cleaning application.

The full specification was supplied in the planning conversation and defines Phase 1 as a responsive, mobile-ready operational web app using:

- Next.js App Router
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Cloud Storage for Firebase
- Route Handlers in `app/api`
- Firebase Admin SDK for privileged server operations
- Vercel deployment as a Node.js application

## Current Implementation Stage

The repository is currently in **Setup Base Do Projeto** only.

Implemented now:

- Next.js App Router
- TypeScript
- Initial responsive layout
- Source-of-truth documentation
- `AGENTS.md` project instruction file

Not implemented yet:

- Firebase configuration
- authentication
- user roles
- seeds
- admin layout
- clients
- properties
- cleaners
- services catalogue
- jobs
- calendar
- checklist
- inventory
- photos
- dashboard
- rules, indexes, and QA

## Phase 1 Product Scope

The full Phase 1 product will eventually include:

- email/password authentication;
- onboarding with `fullName`, `phone`, and `onboardingCompleted`;
- roles `admin` and `cleaner`;
- `users/{uid}` profile documents;
- clients;
- properties;
- cleaners;
- services catalogue with the 11 required seed services;
- jobs with multiple services;
- day/week calendar;
- job checklists instantiated from service templates;
- basic job inventory instantiated from inventory templates;
- job photo upload metadata;
- admin dashboard;
- cleaner-only job flow;
- backend validation for job completion.

Do not implement in the MVP:

- native app store builds;
- client portal;
- contracts;
- invoice/quote/estimate generation;
- advanced finance;
- full payroll automation;
- advanced global inventory;
- automated purchasing/restock;
- SMS/email/WhatsApp messaging;
- third-party automations;
- advanced analytics;
- multi-cleaner jobs;
- maps/routing;
- internal AI/copilot;
- i18n;
- advanced PWA/offline/push;
- continuous spreadsheet import as source of truth.

## Planned Firestore Model

Root collections:

- `users/{uid}`
- `clients/{clientId}`
- `properties/{propertyId}`
- `cleaners/{cleanerId}`
- `services/{serviceId}`
- `checklistTemplates/{templateId}`
- `inventoryTemplates/{templateId}`
- `jobs/{jobId}`
- `counters/{counterId}`

Job subcollections:

- `jobs/{jobId}/jobServices/{jobServiceId}`
- `jobs/{jobId}/jobChecklists/{jobChecklistId}`
- `jobs/{jobId}/jobInventories/{jobInventoryId}`
- `jobs/{jobId}/jobMedia/{mediaId}`

Use English `lowerCamelCase` field names, UTC timestamps in storage, `Europe/London` for display, canonical English enum values, logical deactivation with `active: false`, and explicit `não especificado` TODOs for missing business details.
