---
title: "GlucoReview: Blood Glucose Monitoring"
pubDate: 2025-11-15
updatedDate: 2025-11-15
show: true
description: "What does it actually take to build a healthcare platform responsibly? From role-based access to HIPAA-aligned data handling, here's how I approached full-stack development when the stakes are patient data."
tags: ["Web Dev","NextJS","Supabase", "Tailwind"]
---

# GlucoReview: Building a HIPAA-Aligned Healthcare Platform



## The Platform

GlucoReview is a full-stack healthcare web application designed to streamline weekly blood glucose monitoring for patients and clinicians. The workflow is end-to-end: patients schedule a home test kit through the platform, complete the test, and return it to a laboratory. Clinicians then access a separate dashboard to upload results and track glucose trends over time on a per-patient basis.

The two sides of the platform, patient-facing and clinician-facing, are architecturally separated, with distinct interfaces, permissions, and data access rules enforced at every layer of the stack. I primarily worked on the clinician-facing web application.

## My Role

I was responsible for the complete web development lifecycle: frontend, backend, security architecture, and HIPAA compliance functionality. This included building the Next.js frontend, configuring the Supabase backend, designing the role-based access system, and ensuring the platform handled patient health data in a manner aligned with HIPAA requirements.

This was my first project operating under healthcare data regulation, and the compliance dimension shaped almost every technical decision made by the team, from how data was structured and queried, to what appeared on screen depending on who was logged in.

## HIPAA and the Design of a Healthcare System

Working with Protected Health Information (PHI) introduces a layer of responsibility that goes beyond typical web development. HIPAA mandates not just technical safeguards, but a design philosophy: the right people should only ever see the right data, and that guarantee must be enforced at multiple levels simultaneously.

This informed the system's architecture from the earliest requirement-setting stages. Rather than treating compliance as a final checklist, it was baked into the design of every feature:

- **Minimum necessary access.** No user — patient or clinician — should be able to query data they have no legitimate reason to see. This principle drove the role-based architecture throughout.
- **PHI isolation.** Sensitive health records were separated from general application data in the database schema, allowing access controls to be applied with precision.
- **Auditability.** Data handling was designed with traceability in mind, ensuring there was a clear record of who could access what and under what conditions.

Understanding these requirements before writing a line of code was essential. A significant portion of the early project involved translating HIPAA provisions into concrete technical requirements, a process that made me a much more deliberate engineer.

## Technical Implementation

### Frontend — Next.js App Router

The frontend was built with Next.js using the App Router, which introduced me to a more intentional way of thinking about rendering boundaries. The distinction between server and client components became practically important in a healthcare context: sensitive data could be fetched and partially rendered server-side, reducing unnecessary exposure in the browser.

Key areas of learning included the correct placement of server versus client components, structuring REST API calls cleanly, and managing CRUD operations across both sides of the platform without leaking data between roles.

The UI was built with Tailwind CSS, with role-based conditional rendering ensuring that interface elements: buttons, views, navigation items, were surfaced or hidden based on the authenticated user's role. A clinician and a patient logging into the same application see fundamentally different products.

### Backend — Supabase

Supabase served as the backend, providing the database, authentication, and serverless function layer. The most significant backend work was configuring **Row-Level Security (RLS)** policies — database-level rules that restrict which rows a given user can read, insert, update, or delete based on their role and identity.

This was the enforcement layer that made the HIPAA design real. Even if a flaw existed at the application layer, the RLS policies ensured that direct database queries would still return only what a user was permitted to see. Security was enforced at the data source, not just the interface.

Edge functions and database triggers extended this, handling server-side logic that required elevated access without exposing privileged operations to the client.

### Role-Based Access Architecture

The platform has two distinct user roles: patient and clinician. These roles governed access at every level:

- **UI layer** — components and actions rendered conditionally based on role
- **API layer** — endpoints validated role before processing requests
- **Database layer** — RLS policies enforced access at the row level regardless of how a query arrived

This defence-in-depth approach meant that no single layer of the application was the sole gatekeeper for sensitive data, a pattern I now consider essential in any system handling personal information.

## Development Process

The project followed a structured software development lifecycle, with regular collaborative meetings to align on requirements, review progress, and validate behaviour. Given the regulated context, requirement-setting was especially rigorous: HIPAA and PHI handling standards were translated into explicit acceptance criteria before features were built.

Testing was continuous rather than deferred. Each feature was reviewed, tested, and revised in close collaboration with stakeholders, which meant issues were caught early and compliance requirements were validated incrementally rather than audited at the end.

This disciplined approach to development, requirements first, build, test, iterate, was as valuable a learning as any individual technology.

## What I Took Away

GlucoReview was my introduction to engineering in a regulated environment, and it changed how I think about system design. A few things I will carry into every project going forward:

- **Compliance is architecture.** HIPAA requirements are not a layer you add at the end, they determine how a system is structured from day one.
- **Security must be enforced at the data layer.** Application-level access controls are necessary but not sufficient. Row-level security at the database ensures that no path to the data bypasses your rules.
- **Role-based design clarifies product thinking.** Designing for distinct roles forces you to be precise about what each user actually needs, which leads to cleaner interfaces and a more coherent system overall.
- **Regulated projects require disciplined requirements.** When the stakes involve personal health data, vague requirements are a liability. Precise specification upfront saves significant rework downstream.

Building a healthcare platform as a solo full-stack developer, under real compliance constraints, in a technology stack I was learning for the first time, was one of the more stretching experiences of my development as an engineer. The combination of breadth, frontend, backend, security, compliance, and depth within each area gave me a foundation I expect to draw on for a long time.

---

*Certain implementation details have been omitted in accordance with project confidentiality.*
