# System Design Document: PaperTrail Architecture (Unified Action Dashboard)

## 1. Document Data Model

Instead of a linear graph, PaperTrail tracks discrete document tracking folders. Each physical document is mapped to a digital asset with a strict, 4-state lifecycle.

```json
{
  "id": "DOC-2026-001",
  "title": "Hackathon Budget Proposal",
  "committee": "Finance",
  "signatory": "College Dean",
  "state": "PENDING",
  "rejectReason": null,
  "lastUpdated": 1718000000000
}
```

## 2. State Constraints
The `state` property must be one of:
- `DRAFT`: Local-only, not sent.
- `PENDING`: Out for review.
- `SIGNED`: Success condition.
- `REJECTED`: Failure condition. **Requires a `rejectReason` payload.**

## 3. Broadcast Data Model
Unidirectional alerts sent to logistics channels.

```json
{
  "id": "B-100",
  "message": "SAO office is closed for lunch until 1:00 PM.",
  "type": "WARNING",
  "timestamp": 1718000000000
}
```