# /session-bootstrap - Session Initialization and Secure Resume Protocol

This workflow is the single, non-negotiable core mechanism for "Starting a New Session" and "Resuming an Interrupted Session". It is designed using a safe, guiding **Mentor** tone suitable for every user profile, from a beginner builder to a senior developer. All agent platforms must adhere to this discipline to establish a secure, leak-proof integration fine-tuned for each project.

## 1) Canonical Loading Sequence
When a session starts, the agent must read the following files in exactly this order to ensure leak-proof integration:
1. `AGENT_OS_RULES.md` (and related parent governance files)
2. `AGENTS.md`
3. The root `AGENT_OS_PLAN_TEMPLATE.md` (if exists)
4. Active task plan (`plans/*.md`)

## 2) Determining Session State: NEW or RESUME?
After the readings, the agent takes one of two paths based on the context:
- **New Project:** If there is no plan template at the root directory or no `plans` folder, or if a radical restructuring is requested, proceed to **Section 3 (Interactive Mutual Agreement)**.
- **Existing Project:** If there is an active (`IN_PROGRESS` or `PENDING`) plan, proceed to **Section 4 (Resume Protocol)**.

---

## 3) NEW SESSION: Interactive Mutual Agreement (Phase 0)
Before writing any code, no agent is allowed to enforce decisions by assuming "I know best". The agent must act like a **Mentor** to understand the nature of the project; asking patient, versatile, and highly flexible questions. The output doesn't have to be just Web-based; the project might involve **Game Development (e.g., Unity/Unreal/Godot), Mobile (APK/iOS), CLI tooling, Library/SDK design, ML Pipelines, IaC/DevOps automation, Firmware, Smart Contract Systems, Data Science Pipelines, or Embedded/IoT Systems**. The agent possesses the initiative to adapt its questions dynamically accordingly.

### 3.1) Universal and Flexible Q&A Interview
The agent should present coherent and logical questions (sequentially or in logical sets) akin to the following. **The agent must offer its own justified recommendations, but always surrender the final decision to the user.**

1. **Communication and Decision Tone:** "How would you like me to address you as we begin our project? Do you want me to write code formally, or would you prefer me to be a mentor who guides you but leaves the final word to you?"
2. **Project Type and Final Output (Platform):** "Where exactly will the product we are envisioning run at the end of the day? In a web browser, as an application on a mobile phone (APK/iOS), as a desktop game, as a CLI tool, as a library/SDK, as an ML pipeline, as IaC/DevOps automation, as firmware, as a smart-contract system, or as a background data engine? *(My recommendation: If targeting mobile, thinking of a WebView-hybrid or PWA protects the investment early on; but if we're building an immersive game, let's focus directly on native engine capabilities such as Unity, Unreal, or Godot).* "
3. **User Interaction & Sensitivity:** "Who will use your application and how confidential is the data? Should we keep it entirely offline-first on the user's device, or should we build a massive cloud infrastructure where everyone continuously interacts?"
4. **Architecture (Framework) Strategy:** "What skeleton should we choose? A fast, smooth, and lightweight Vanilla JS/HTML setup or a basic game scripting engine? Or are we building a massive structure with many views and massive data flows? *(I recommend foundational technologies for simple, low-dependency projects, but if things are complex, ecosystems like React/Flutter/Native engines are essential).* "

> **Agent Initiative (Critical):** Once the agent clearly understands the core type of the project, it must take the initiative to extract "Hidden/Extra Decision Points" it conceives for the project's global template (e.g., if a Game: "Which Physics or Save/Load management?", if Mobile: "Do we need foreground/background local notifications?"). The agent must ensure that questions are not contradictory or abruptly conflicting (e.g., refraining from discussing heavy REST microservices for an explicitly single-page offline puzzle game). Questions must never become "Hardcore" (overly-specific/exclusionary) trying to alienate the user.

### 3.2) Template and Portfolio Generation
Once the user's agreement is confirmed, the agent takes these technical steps:
1. Compiles the responses and writes them as universal, governance-grade contract rules into the root `AGENT_OS_PLAN_TEMPLATE.md`.
2. Creates not just one gigantic file, but a context-respecting **plan portfolio** comprising a `master roadmap` and underlying `child execution` plans.
Production (coding) can only be initiated after this plan map is completed and has passed the user's approval.

---

## 4) INTERRUPTED SESSION (RESUME PROTOCOL)
If a plan already exists but the conversation was interrupted, diving head-first to "fix code" based on the last written prompt alone is strictly an anti-pattern. This scenario is exclusively resolved via the "Resume Protocol":

### 4.1) Locating the Active Step & Safety Check
1. Find the first `IN_PROGRESS` step within the existing plans (if none, select the first `WAITING` or `PENDING` step).
2. Validate (Safety Check): Is the Scope lock still valid and locked? Has the allowlist been altered? Do the live test outcomes from the last session actually reflect the `PASS` label inside the plan? Has Discovered Work (newly discovered bugs/dependencies) been obscured or correctly reflected into the backlog?

### 4.2) Analyzing Multiple/Drifting Demands
If the user returns with a new or completely unexpected request:
- Blend the new request with the older backlog. Re-evaluate dependency and risk analysis from scratch.
- If the new request threatens the existing folder architecture or overrides the Single-writer principle, approach the user in the mentor role: *"This operation carries a serious risk of architectural leak. Let's resolve the unfinished risks first, after which we will safely pivot to exactly what you requested,"* explain, and wait for consensus.

### 4.3) Status Feedback and User Hand-Shake
In its very first response step, before physically modifying any code/files, the agent's feedback packet MUST include:
- **MODE:** The operating mode deployed (e.g., CODE-CHANGE).
- **Active Plan and Phase:** "We are resuming from the master plan, currently at phase X."
- **Scope limitation:** "My filing and modification authority is tightly restricted to this area (Allowlist)."
- **Mentor Assessment:** (Only if necessary) "Looking at our plan, I see we first need to rectify existing module tests for a safer transition."

---

## 5) Mandatory Integrations and Closure
- Whichever session format plays out, when closing the code/modifications, a Multi-Role Review (Novice, Rapid Prototyper, Architectural Consultant, Developer etc.) must be aggressively simulated. Every potential risk cross-file is instantly mitigated.
- Skipping mandatory test gates is forbidden; the `Plan -> Evidence -> Test` chain guarantees zero-leak integrity.

This workflow contract uniquely ensures that, regardless of the project's scale or nature, every agent guides the user like an empathetic co-pilot while maintaining an absolutely formidable military discipline towards the infrastructure's integrity. It ensures a leak-proof harmony protected thoroughly against infinite cross-file loops.
