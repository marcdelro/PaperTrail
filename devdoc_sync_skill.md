### Skill Definition & State Schema

```json
{
  "skill_name": "DevDoc_Sync_Skill",
  "version": "1.1.0",
  "description": "Enforces strict documentation-first execution. Generates specific execution prompts based on templates, and validates parity between markdown specs and codebase implementations.",
  "required_inputs": {
    "request_type": "string",
    "target_scope": "string",
    "target_files": "string[]"
  },
  "state_flags": {
    "is_prompts_generated": false,
    "is_docs_aligned": false,
    "is_schema_validated": false,
    "is_code_synced": false
  },
  "validation_barriers": [
    "BARRIER_1: Reject execution if target feature is not defined in prd.md.",
    "BARRIER_2: Reject execution if state interfaces in sdd.md do not exactly match TS models.",
    "BARRIER_3: Reject execution if UI modifications reference tokens missing from design.md.",
    "BARRIER_4: Reject execution if development and documentation prompts cannot be mapped strictly to prompt_template.md."
  ]
}
```

### Deterministic Execution Pipeline

1. **PHASE 1: INGESTION & DOCUMENTATION PARSING**
   - **Extract Payload:** Parse the incoming `Target Scope` and `Files to Modify`.
   - **Load Specifications:** Read `prd.md`, `sdd.md`, `design.md`, and `prompt_template.md` into memory.
   - **Map Dependencies:** Cross-reference the requested feature against existing markdown schemas. 

2. **PHASE 2: PROMPT GENERATION**
   - **Load Template:** Parse the structure and rules defined within `prompt_template.md`.
   - **Generate Documentation Prompt:** Instantiate the template specifically for the documentation sub-agent. Focus the *Core Task* on updating `prd.md`, `sdd.md`, and `design.md` while enforcing strict alignment rules.
   - **Generate Development Prompt:** Instantiate the template specifically for the coding sub-agent. Focus the *Core Task* on implementing TS files and UI layouts strictly adhering to the newly synced documentation.
   - **Assert Prompts:** Set `is_prompts_generated = true` once both templates are syntactically valid and loaded into the queue.

3. **PHASE 3: DOCUMENTATION-FIRST MUTATION (Executed via Doc Prompt)**
   - **Update PRD:** Append new user stories or requirements to `prd.md`.
   - **Update SDD:** Modify system architectures, JSON schemas, or state interfaces in `sdd.md`.
   - **Update Design:** Inject new visual tokens or layout constraints into `design.md`.
   - **Assert Alignment:** Set `is_docs_aligned = true` if and only if all structural changes have been committed to markdown.

4. **PHASE 4: CODE IMPLEMENTATION (Executed via Dev Prompt)**
   - **Halt on Misalignment:** If `is_docs_aligned === false`, throw `DOC_PARITY_ERROR` and abort.
   - **Type Definition:** Translate `sdd.md` interfaces strictly into TypeScript types/interfaces.
   - **Logic Execution:** Implement required changes in target code files (e.g., `CateringOptimizer.tsx`).
   - **Token Application:** Apply styles using only the defined tokens from `design.md`.
   - **Assert Code Sync:** Set `is_code_synced = true` upon successful compilation.

5. **PHASE 5: VERIFICATION & COMMIT**
   - **Type-Check:** Run a static analysis to guarantee the newly generated TS types match the JSON models in `sdd.md`.
   - **Commit:** Group the generated prompts, documentation, and code changes into a single atomic git commit.

### Failure Override Patterns

- **DIVERGENCE_ANOMALY (Prompt Template Violation):**
  - **Trigger:** The required data for the Documentation or Development prompts violates the limits or constraints defined in `prompt_template.md`.
  - **Action:** Abort prompt generation immediately (`is_prompts_generated = false`).
  - **Resolution Path:** The agent must isolate the violating variable, report the structural mismatch to the user, and await manual override before proceeding to Phase 3.

- **DIVERGENCE_ANOMALY (Missing Design Tokens):**
  - **Trigger:** A feature request demands a UI element (e.g., a specific warning color) not present in `design.md`.
  - **Action:** Abort code generation immediately.
  - **Resolution Path:** The agent must first propose the missing token addition to `design.md`. Only upon explicit user approval of the token can the agent proceed to update the documents.

- **DIVERGENCE_ANOMALY (Undocumented State Mutation):**
  - **Trigger:** Implementation code requires a state variable or data type absent from `sdd.md`.
  - **Action:** Trigger operational halt (`DOC_PARITY_ERROR`).
  - **Resolution Path:** The agent must rewrite the proposed code to strictly utilize existing `sdd.md` models. If impossible, the agent must draft a patch for `sdd.md` and await validation before editing TS files.

- **DIVERGENCE_ANOMALY (Scope Creep):**
  - **Trigger:** The requested feature spans files or domains outside the provided `prd.md` context scope.
  - **Action:** Block execution.
  - **Resolution Path:** Output a rigid failure report citing the exact lines in `prd.md` that contradict the request. Demand an updated `prd.md` or a scoped-down request.
