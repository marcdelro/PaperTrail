# PaperTrail: Smart Document Tracking for Logistics Teams

<div align="center">
  <h3>Stop Chasing Signatures. Start Executing Logistics.</h3>
  <p>A hyper-focused mobile dashboard designed to eliminate the administrative burden of tracking down physical approvals.</p>
</div>

---

## 🎯 The Pitch
Logistics operations (like hackathons, events, and campus operations) lose hundreds of hours to a simple, archaic problem: **chasing physical signatures**. Junior officers walk back and forth between the Dean's office, SAO, and Facilities, only to find the signatory is at lunch, or worse, the document gets rejected for a missing memo *after* a 20-minute walk.

**PaperTrail** solves this. 

It is a specialized mobile tracking queue that maps the physical document lifecycle into strict digital states (`Draft`, `Pending`, `Signed`, `Rejected`). It forces accountability through mandatory rejection reason codes and features a unidirectional broadcast feed to keep logistics teams aligned without the chaotic noise of WhatsApp group chats. 

You only make the physical trip when the screen turns green.

## ✨ MVP Features
- **Native iOS Simulator Layout:** The React application is bounded within a pure CSS iPhone 16 simulated device, demonstrating exactly how a logistics officer operates it in the field.
- **Strict State Kanban/Queue:** Documents move explicitly through a defined lifecycle, replacing vague estimates with absolute statuses.
- **Action-Driven Feedback:** Signatories cannot casually "throw back" a document. Rejecting an item requires a mandatory `reasonCode` (e.g., `MISSING_MEMO`), which aggressively highlights in red so the officer knows exactly what to fix before making another trip.
- **Zero-Noise Committee Feeds:** A read-only global broadcast channel replaces administrative chat noise, ensuring teams are aware of absences (e.g., "Legal Counsel out of office") instantly.

## 🛠 Tech Stack
This MVP was built for rapid iteration and maximum UI responsiveness during the hackathon:
- **Core Framework:** React 18 + TypeScript
- **Build Tool:** Vite (for sub-second Hot Module Replacement)
- **Styling Engine:** Tailwind CSS v4 (Native ESM Imports)
- **Architecture:** Zero-dependency, offline-capable local state simulation
- **UI Paradigm:** Mobile-First Flexbox/Grid layouts bounded in an iPhone chassis simulation

## 🚀 How to Run the MVP Locally

This repository is self-contained. To run the simulated mobile dashboard on your machine:

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Execution
1. **Clone the repository and navigate into it:**
   ```bash
   cd PaperTrail
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Boot the local development server:**
   ```bash
   npm run dev
   ```

4. **Interact with the App:**
   - Open your browser to the local Vite URL (usually `http://localhost:5173`).
   - Use the interactive document cards inside the iPhone simulation to toggle document states and watch the real-time routing/alerts system in action!

---
*Built with speed and precision for the hackathon.*
