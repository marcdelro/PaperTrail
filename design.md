### File 3: `design.md` (UI/UX Design Specification)
```markdown
# Design System & UI Blueprint: PaperTrail

## 1. Visual Style Guide (Tailwind Tokens)
- Status - Completed: `bg-emerald-50 text-emerald-700 border-emerald-200`
- Status - Active/Pending: `bg-amber-50 text-amber-700 border-amber-300 animate-pulse`
- Status - Locked/Upcoming: `bg-slate-50 text-slate-400 border-slate-200`
- Layout Background: Clean, minimal gray (`bg-slate-100`) to emphasize workspace panels.

## 2. Component Layout Layout Grid
Single-page application layout split into clean viewport containers:
- Top Header: Minimal brand header showing current active event status and global estimated remaining time.
- Hero Panel (Full Width): Horizontal workflow track using flexible row layouts. Connect nodes with thick decorative border lines to emphasize the physical DAG path.
- Bottom Split Grid (Two Columns):
  - Left Column: Analytics & Bottleneck Alert cards (displays custom notices when an office's average latency crosses a 48-hour threshold).
  - Right Column: Simple Action Form (Dropdown to select office + toggle buttons for instantaneous submission logs).