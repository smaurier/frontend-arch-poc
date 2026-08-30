# AI in Engineering Teams: A Structured Adoption Framework

**Version:** 1.0
**Status:** Active
**Last updated:** 2026-08-30
**Applies to:** Engineering teams of 3-30 developers adopting AI-assisted development.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Core Premise](#2-core-premise)
3. [The Four Quadrants of AI Usage](#3-the-four-quadrants-of-ai-usage)
4. [Non-Negotiables](#4-non-negotiables)
5. [Review Adaptations](#5-review-adaptations)
6. [Training Focus](#6-training-focus)
7. [Guardrails](#7-guardrails)
8. [Onboarding a New Team Member](#8-onboarding-a-new-team-member)
9. [Trust Ladder](#9-trust-ladder)
10. [Honest Labels in Artifacts](#10-honest-labels-in-artifacts)
11. [What We Do Not Do](#11-what-we-do-not-do)
12. [Anti-Patterns Rejected](#12-anti-patterns-rejected)
13. [Measurement, Honestly](#13-measurement-honestly)
14. [Example Scenario: A Team of 8 Over 6 Months](#14-example-scenario-a-team-of-8-over-6-months)
15. [When AI Is the Wrong Tool](#15-when-ai-is-the-wrong-tool)

---

## 1. Purpose

Uncontrolled AI adoption in engineering teams produces three failure modes:

- **Unowned code**: the author cannot explain what a function does or why it is there.
- **Review theater**: PRs receive approvals without genuine scrutiny because "the AI wrote it" short-circuits reviewer engagement.
- **Silent quality drift**: tests pass, types pass, lint passes, yet the codebase accumulates logic that no team member can defend, extend, or debug under pressure.

This framework exists to prevent those failure modes, not to restrict productivity. The goal is structured adoption: AI tools accelerate delivery without eroding the team's collective ownership, review culture, or understanding of the code it ships.

The framework is portable. It does not depend on any specific language, framework, or organization size. A team of three and a team of thirty can apply it; the calibration differs, the principles do not.

For teams that already operate a decision-making framework (such as the DACI process described in `docs/methodology/framework-decision-daci.md`), this document extends that culture: it applies the same discipline of human ownership and explicit tracing to AI-assisted development specifically.

---

## 2. Core Premise

Engineers already use AI tools: in their editor, in their browser, in external platforms. Surveys consistently show adoption rates above 70% in development teams, regardless of organizational policy. The relevant question is not "if" but "under what guardrails".

A policy of prohibition without enforcement is worse than no policy at all: it pushes usage underground, removes any shared vocabulary for discussing it, and makes problems invisible until they surface in production.

A policy of laissez-faire ("use whatever you want") transfers risk to the team without acknowledging it.

The productive position sits between those poles: acknowledge reality, define expectations clearly, enforce the expectations that can be enforced mechanically, and leave room for judgment where judgment is required.

This framework takes that position.

---

## 3. The Four Quadrants of AI Usage

AI assistance is not uniform. The appropriate level of supervision depends on two axes:

- **Task type**: how much domain judgment does this task require?
- **Consequence of error**: how costly is an undetected mistake?

The matrix below maps those axes to four quadrants with distinct norms.

### Quadrant 1: Discovery

**Task type:** Exploration, ideation, spike research, documentation drafts, README scaffolding.
**Consequence of error:** Low. Nothing is shipped. Output is a thinking aid.

**Norm:** Looser supervision is acceptable. AI output here is a first draft or a prompt for discussion, not code. No test coverage requirement for exploratory spikes that will be thrown away. Architectural ideas generated in this quadrant become candidates, not decisions. A decision still requires a human-written ADR before any code reaches the main branch.

**Examples:** Asking an AI to suggest alternative approaches to a pagination problem. Using AI to draft a comparison table for three libraries. Generating a list of edge cases to consider during design.

---

### Quadrant 2: Boilerplate

**Task type:** Repetitive scaffolding, file templates, configuration stubs, serialization code, CRUD handlers with well-established shapes.
**Consequence of error:** Medium. Code ships, but the patterns are well-understood and testable.

**Norm:** Light review plus tests suffice. The reviewer confirms that the scaffold matches team conventions. Tests confirm behavior. The author must understand what was generated and be able to defend every line in review.

**Examples:** Generating a Vue component scaffold from a pattern the team already uses. Producing a TypeScript interface from a known API response shape. Scaffolding a test file with the correct imports.

---

### Quadrant 3: Business Logic

**Task type:** Domain rules, authorization checks, financial calculations, data transformation with business invariants.
**Consequence of error:** High. Bugs here affect users directly and may be invisible until a specific condition is triggered.

**Norm:** Strict review, full test coverage, and a human-authored ADR for any non-trivial decision embedded in the logic. The author writes the tests first, then uses AI to produce a candidate implementation, then reviews the output against the tests. AI-generated business logic that passes tests but contains a subtly wrong invariant (e.g., an off-by-one in a billing calculation) is a known failure mode. Reviewers challenge assumptions, not just outputs.

**Examples:** Access control logic. Cart discount stacking rules. Date-range overlap calculations. Workflow state machines.

---

### Quadrant 4: Refactoring Existing Code

**Task type:** Restructuring, renaming, extracting functions, migrating patterns across an existing codebase.
**Consequence of error:** High. Regressions are easy to introduce and hard to detect if test coverage was already weak.

**Norm:** Full review and regression tests are mandatory before merging. The diff is reviewed line by line. Automated tests run against the refactored code. Any behavior change discovered during review is extracted into a separate PR or explicitly documented. AI-assisted refactoring on code with low test coverage is a risk that must be acknowledged before starting, not discovered after merging.

**Examples:** Extracting shared utilities across multiple modules. Migrating from one state management pattern to another. Renaming a domain concept across the codebase.

---

## 4. Non-Negotiables

These four rules apply regardless of quadrant, team size, or timeline pressure.

### 4.1 Authorship and Ownership

Every AI-generated line of code is committed under the name of a human engineer. That engineer owns it. "The AI wrote it" is not a valid explanation for what code does, why it is there, or how it behaves. If the author cannot explain it, the PR does not merge.

This is not punitive. It is definitional: ownership means understanding. An author who cannot explain their PR has not understood it yet. The solution is to continue reviewing, not to lower the bar.

### 4.2 Human-Written Tests

Every non-trivial AI-generated function has a test written by a human. The test is written before or in parallel with the implementation, not as an afterthought that validates what the AI produced. Tests define the contract. AI output is a candidate implementation of that contract.

This applies especially to business logic (Quadrant 3) where AI tools are most likely to produce plausible-but-wrong implementations. A test suite written by a human who understood the requirements catches drift that a test suite generated alongside the code will not.

### 4.3 Human-Owned Architectural Decisions

Every architectural decision is human-encoded in an ADR before the code is written. AI tools can assist with option generation, trade-off articulation, and draft text. The decision itself, the context, the reasoning, and the consequences are authored by a human.

ADRs provide the trace that "AI wrote it" destroys. When a future team member asks "why is this pattern here", the ADR is the answer. An AI tool does not maintain that record. Humans do.

Teams following the DACI process (`docs/methodology/framework-decision-daci.md`) already have a decision-first culture. This rule extends that culture explicitly to AI-assisted development.

### 4.4 Explicability

"AI wrote it" is never a valid answer to "why is this here". If a reviewer asks why a particular approach was taken, the author must be able to answer from their own understanding, not from the prompt they used. Prompts are ephemeral. Understanding is durable.

---

## 5. Review Adaptations

Code review does not become lighter when AI is involved. It becomes different, and in some respects more demanding.

### 5.1 Explanation Requirement

Reviewers ask the author to explain non-trivial blocks. This is not adversarial. It is a calibration check: if the author understands the code, the explanation takes thirty seconds and builds shared knowledge. If the author cannot explain it, the review has caught a real problem before merge.

"Walk me through what this function does and why it does it this way" is a fair and expected question on any PR involving AI-generated logic.

### 5.2 Test-Level Challenge

"Show me the test that fails without this line" is a fair question. Every non-trivial function should have at least one test that would fail if the function were removed or broken. If no such test exists, the reviewer flags it before approving.

This challenge applies regardless of whether the code was AI-generated. It is a general hygiene rule that becomes more important when the author may not have fully traced the logic.

### 5.3 Anti-Pattern and Unusual Choice Flagging

Reviewers flag anti-patterns and unusual choices even when tests pass. AI tools regularly produce code that is syntactically correct, passes lint and type checks, and satisfies tests, while using a pattern that is harder to maintain, less idiomatic, or subtly misaligned with team conventions.

Passing tests is necessary. It is not sufficient. The reviewer's judgment about patterns, idioms, and maintainability remains relevant.

### 5.4 Reviewer Time Budget

Reviewer time increases, not decreases, in the short term of AI adoption. A larger diff from an AI-assisted sprint still requires the same per-line scrutiny. Teams that budget review time based on number of PRs rather than volume and complexity will discover this mismatch in production.

The expectation is explicit: more output from AI assistance means more review capacity needed, not less. If the team cannot absorb that review load, the right response is to slow down generation, not to thin the review.

---

## 6. Training Focus

The skills that atrophy fastest under unstructured AI adoption are the skills the team needs most to use AI well. Training invests in those skills deliberately.

### 6.1 Reading Code Critically

Reading unfamiliar code carefully and skeptically is a skill that weakens with disuse. Engineers who accept AI output without reading it lose the ability to detect problems in any unfamiliar code, including code written by teammates or inherited from acquisitions.

Practice: regular code reading sessions on unfamiliar open-source code. Pair review sessions where both engineers read a section before discussing it. Explicit review time for AI-generated PRs rather than trust-by-default.

### 6.2 Writing Tests Before Asking for Code

The instinct to generate code first and write tests afterward inverts the process. Tests written after code tend to validate what the code does rather than what the code should do. That distinction matters most when the code was generated by an AI that may have satisfied the prompt without satisfying the intent.

Practice: team habit of writing a failing test as the first step of any task, before opening an AI assistant. "Test-first" is not a methodology rule for its own sake. It is the calibration mechanism that keeps AI output honest.

### 6.3 Prompting for Constraints, Not Solutions

"Write a function that calculates discount" is a prompt for a solution. "Write a function that calculates discount such that: it never returns a negative total, it handles stacked promotions by applying percentage discounts before flat discounts, and it rounds to two decimal places using banker's rounding" is a prompt for a constrained solution.

The quality of AI output scales with the precision of constraints. Engineers who articulate constraints well get better starting points and understand the result better because they defined it.

Practice: prompt review as a team exercise. Sharing prompts that produced good or bad results, identifying what constraint was missing.

### 6.4 Recognizing Plausible-but-Wrong Output

AI tools produce confident, syntactically correct, well-formatted output that is sometimes wrong in ways that require domain knowledge to detect. Common failure modes include: hallucinated API methods (method names that do not exist in the version of the library in use), subtly wrong invariants (boundary conditions that almost always hold), and plausible-but-incorrect parallelism (race conditions introduced by converting sequential code to async).

Practice: retrospective flagging of bugs traced to AI output. No blame; the goal is to build a shared library of "this is what AI-generated bugs look like on this stack". Over time, the team develops a pattern-matching instinct for where to look hardest.

---

## 7. Guardrails

Guardrails are mechanical enforcement of the non-negotiables. They reduce the surface area where judgment is required by making violations visible automatically.

### 7.1 Tests, Typechecking, and Lint

The CI pipeline enforces contract, not vibes. Tests verify behavior. Strict type-checking catches the class of bugs where AI output uses a type correctly in shape but incorrectly in semantics. Lint enforces team conventions and catches patterns that are technically valid but team-rejected.

None of these are sufficient alone. Together, they form the first filter that every PR must pass before a human reviewer sees it. A PR that fails CI does not get reviewed; it gets fixed first. This rule applies equally to AI-generated and human-generated code.

### 7.2 ADRs as Decision Registry

The ADR log is the human-owned decision record for the codebase. Any pattern introduced by AI assistance that represents a non-trivial choice requires an ADR that explains why that pattern was chosen over alternatives.

When a reviewer asks "why this approach?", the expected answer is either a reference to an existing ADR or the start of a process to write one. "The AI suggested it" is not an ADR. It is the beginning of a conversation that should end in an ADR.

### 7.3 Pair-Programming Sessions (Human-Human)

At least one dedicated pair-programming session per week, between two human engineers, on real code in the codebase. The purpose is to maintain the code review skills that atrophy if all programming is solo with an AI assistant.

Pairing sessions do not require AI to be banned. The constraint is human-to-human engagement: explaining your reasoning out loud to a peer, receiving real-time challenge, debugging together without an AI intermediary. These are the muscles that make AI-assisted review effective.

### 7.4 AI-Generated Test Quality Lint

AI tools generate tests. The quality of those tests varies widely. A lint rule that flags tests lacking real assertions: empty mocks with no assertion, assertions that always pass regardless of the function's behavior (tautological tests), and tests that only assert that a function was called without asserting what it returned.

A test suite with 100% coverage and no real assertions is worse than a test suite with 60% coverage and honest assertions: it provides false confidence. The lint rule surfaces this class of problem mechanically, before it reaches review.

---

## 8. Onboarding a New Team Member

The onboarding sequence is designed to establish a baseline before AI tools enter the picture. The goal is for the new engineer to understand the codebase from first principles before having an AI assistant fill in the gaps.

### Week 1: No AI, Pair-Programming Only

The first week is human-only. The new team member reads code, runs tests, makes small changes with a mentor, and asks questions. No AI assistant in the editor. This is not a permanent restriction; it is a calibration period.

The purpose is clear: a new engineer who starts with AI assistance learns the AI's model of the codebase, not the codebase itself. Patterns, conventions, and decisions that live in ADRs or in team knowledge do not automatically reach AI output. The engineer who reads the code without AI mediation builds a foundation that makes AI assistance more accurate and more detectable when it is wrong.

The mentor's job during week 1 is to answer questions, not to accelerate. The friction is intentional.

### Week 2: AI-Assisted with Mentor Review

From week 2, AI assistance is permitted. Every PR from the new team member is reviewed by the mentor in addition to the regular reviewer. The mentor pays specific attention to whether the new engineer can explain what they submitted, not just that the tests pass.

This is also the week where the new engineer's first test-first habit is established. The expectation is explicit: write a failing test, then use AI to get to green, then review the result with the mentor.

### Week 3 and Beyond: Independent with Normal Review

By week 3, the new engineer participates in the team's normal review cycle. The first-week calibration has established a baseline; the week-2 mentored review has established habits. The normal guardrails (CI, ADRs, review standards) take over.

The mentor relationship continues informally. The structured onboarding protocol ends.

---

## 9. Trust Ladder

Trust in AI-assisted work develops through demonstrated competence in reviewing it, not through time alone. The ladder has three levels.

### Level 1: 0 to 3 Months

**Profile:** AI suggests; human writes.

The engineer uses AI for discovery and ideation (Quadrant 1) and for isolated boilerplate (Quadrant 2). All code is written by the engineer, possibly informed by AI suggestions. No direct AI-to-commit flow.

**Gate to Level 2:** The engineer has demonstrated consistent ability to explain their code in review, write tests before implementation, and catch at least one plausible-but-wrong AI suggestion during a pairing session or review.

The gate is observed, not self-assessed. A mentor or senior team member confirms the gate has been passed.

---

### Level 2: 3 to 12 Months

**Profile:** AI writes; human reviews line by line.

The engineer can take AI-generated code from Quadrants 1, 2, and 3, review it line by line, and commit it under their name with confidence. The review is not a rubber stamp. The engineer understands every line and can defend it.

AI-generated business logic (Quadrant 3) at this level still requires the human-written test to precede the AI-generated implementation. The sequence is non-negotiable.

**Gate to Level 3:** The engineer has reviewed and explained AI-generated business logic in at least three PRs under adversarial questioning (the reviewer genuinely tried to find something the engineer could not explain). The engineer has also caught at least two subtle AI errors in their own work before merge.

---

### Level 3: 12 Months and Beyond

**Profile:** AI writes; human reviews at architecture level.

The engineer reviews AI output at the level of architecture, patterns, and invariants rather than line by line. Tactical details are still read, but the primary review focus is structural correctness.

Reaching Level 3 does not remove the obligation to understand committed code. It shifts the emphasis of review. The engineer at Level 3 is expected to guide junior team members on the ladder and to model the review discipline that the framework depends on.

**Note:** The 12-month threshold is a minimum, not a guarantee. Level 3 requires demonstrated review skill at Level 2 depth. Tenured engineers who have not practiced adversarial self-review are at Level 2 regardless of time in role.

---

## 10. Honest Labels in Artifacts

Transparency about AI involvement is a professional norm, not a confession.

### 10.1 Commit Messages

Individual commits do not require an "AI-assisted" label. Standard commit hygiene applies: conventional commit format, clear subject, body explaining "why" when the what is not obvious. The authorship and content of commits are human-owned per section 4.1.

### 10.2 Public Artifacts

When a public artifact (open-source repository, published library, portfolio piece) is significantly AI-assisted in its implementation, the README states this. Not as a disclaimer, as a fact. "This prototype was built with AI assistance; all architecture decisions and tests are human-authored" is an accurate, credible statement.

The alternative, presenting AI-assisted work as entirely human-produced, is a form of misrepresentation that damages trust when discovered. Discovery is increasingly easy. Transparency is the more credible and professionally defensible position.

### 10.3 Internal Artifacts

Internal code, documentation, and design artifacts do not require AI disclosure beyond what the team's established norms ask for. The guardrails (ownership, tests, ADRs) already ensure the quality bar regardless of how the content was generated.

---

## 11. What We Do Not Do

Six explicit non-actions, with the reasoning for each.

### 11.1 We Do Not Ban AI Use

Prohibition without enforcement pushes usage underground, removes visibility, and makes problems invisible until they surface in production. An explicit framework with enforced guardrails produces better outcomes than a nominal ban that is ignored.

### 11.2 We Do Not Track AI Usage per Commit as a KPI

Tracking lines generated by AI, or percentage of AI-assisted commits, gamifies the wrong signal. Engineers optimize for the metric. The metric does not measure quality, ownership, or understanding. It measures volume of generation, which is uncorrelated with the outcomes the framework cares about.

The metrics that matter are cycle time and defect rate (section 13).

### 11.3 We Do Not Allow Fully Autonomous AI Merges

Human review before merge is non-negotiable. This is true for AI-generated code at every quadrant and every trust level. The human reviewer is the final quality gate, the ownership signal, and the institutional memory that no AI tool maintains.

### 11.4 We Do Not Ship Code No Human Can Explain

If a PR contains a block of code that no member of the team on that PR can explain, the PR does not merge. The block is rewritten until it is understood or the approach is changed. "It works" is necessary. It is not sufficient.

### 11.5 We Do Not Lower the Test Bar for AI-Assisted Code

AI-generated code that passes a superficial test suite is not tested. The test suite quality standard applies uniformly. AI-generated tests are not exempt from the lint rules in section 7.4.

### 11.6 We Do Not Treat This Framework as Permanent

AI capabilities change. Team composition changes. What is appropriate supervision today may be too much or too little in 18 months. This framework is reviewed annually (section 14 includes a 6-month checkpoint in the example scenario). Any team member can propose a revision with reasoning; revisions follow the ADR process.

---

## 12. Anti-Patterns Rejected

These four anti-patterns have names because naming them creates the shared vocabulary for catching them in review.

### 12.1 Vibe-Coding

Accepting AI output without reading it because it looks right, the tests pass, and the reviewer did not ask hard questions. The author cannot explain the logic but nothing bad has happened yet.

This is the highest-risk failure mode because it is invisible: everything appears to work. The debt accumulates silently until the code needs to be changed, extended, or debugged under pressure. At that point, no one on the team understands it.

The cure is section 4.1: authorship requires understanding. If you cannot explain it in review, you have not understood it yet.

### 12.2 Prompt Shopping

Rerunning the same prompt with minor variations until the AI produces output that looks acceptable, without using deeper reasoning to evaluate whether the output is correct. The engineer has shopped for an answer rather than understood the problem.

Prompt shopping produces code that satisfies the aesthetic of correctness without the substance. The engineer has not learned anything about the domain, the constraints, or the failure modes. The output reflects the AI's priors, not the team's understanding.

The cure is section 6.3: prompt for constraints, not solutions. Engineers who articulate constraints cannot prompt-shop because the constraints define what "acceptable" means.

### 12.3 Test-After-Code

Writing tests to fit AI-generated code rather than writing tests that define the contract before code is written. The test suite validates what the AI produced rather than what the requirements specify.

This pattern produces high coverage with low confidence. The tests pass because they were written to match the code, not because the code matches the requirements. When the code is wrong, the tests confirm the wrongness.

The cure is section 4.2: tests define the contract. Human-written tests precede AI-generated implementation. The tests are the specification.

### 12.4 Review Theater

Approving PRs with "LGTM" when the reviewer has not read the diff, run the tests locally, or asked a single question. This is not an AI-specific problem, but AI adoption makes it worse: larger diffs, more generated code, and a diffuse sense that "the AI checked it" reduce reviewer engagement.

The cure is section 5: review adaptations. The reviewer asks questions, challenges tests, and flags patterns. Approving a PR without engaging with it is not a review. The team's review culture depends on reviewers who take the role seriously.

---

## 13. Measurement, Honestly

Measuring the right things and refusing to measure the wrong things is a discipline in itself.

### 13.1 Metrics That Stay

**Cycle time**: time from work starting to deployment. AI assistance should improve cycle time in Quadrants 1 and 2 without degrading it in Quadrants 3 and 4 when the guardrails are followed.

**Defect rate**: post-deployment incidents per unit of shipped work, measured over rolling windows. If AI adoption is producing quality drift, defect rate will catch it before it becomes a crisis.

These two metrics are not sufficient to evaluate everything about AI adoption. They are sufficient to detect when adoption is going wrong.

### 13.2 Metrics That Get Rejected

**Lines of code generated by AI**: measures volume, not quality or understanding. Optimizing this metric produces more generation and less review.

**Number of AI-assisted commits**: same problem. Engineers who know this is tracked will label more commits "AI-assisted" or fewer, depending on which direction the incentive points.

**AI adoption rate per team member**: measures usage, not outcomes. An engineer who uses AI tools for 10% of their work with full understanding is more valuable than one who uses them for 80% with none.

### 13.3 The Honest Measurement

One additional measurement is worth tracking informally: post-deployment incidents traced to code that no reviewer on the PR could explain. This is not a formal KPI. It is a learning signal. When such an incident occurs, the retrospective asks: which part of the framework failed, and how does the framework improve?

---

## 14. Example Scenario: A Team of 8 Over 6 Months

This scenario illustrates how a team transitions from unstructured to structured AI adoption.

### The Context

A team of 8 engineers. Three are senior (3+ years on the team). Four are mid-level. One is junior, six months in. All are already using AI tools individually without a shared framework.

### Month 1: Establish the Framework

The lead publishes this document and the supporting ADR. One team meeting (one hour) to walk through the non-negotiables, the quadrant model, and the anti-patterns. Questions are answered; concerns are logged.

The CI pipeline is updated: lint rules for test quality (section 7.4) are added. All engineers update their onboarding materials. No AI usage changes in month 1. The goal is shared vocabulary, not behavior change yet.

### Month 2: Quadrant Awareness

Engineers begin categorizing their work before starting. "This is Quadrant 2, light review suffices." "This is Quadrant 3, I write tests first."

The first review cycle where a reviewer asks "walk me through this function" happens. It goes well; the author can explain. This models the behavior for the rest of the team.

The junior engineer begins week-1 protocol on their second major feature (retroactively applying the onboarding structure to a current assignment). Mentor pairs with them twice.

### Month 3: Trust Ladder Assessment

The lead assesses where each team member sits on the trust ladder. Three seniors are at Level 2. Four mids are at Level 1 or early Level 2. The junior is in Level 1.

The assessment is shared with each engineer individually. No one is surprised. The gates for Level 2 and Level 3 are discussed.

Pair-programming sessions become a formal weekly calendar item rather than ad hoc.

### Month 4: First Retrospective on Quality

A retrospective on cycle time and defect rate since month 1. Cycle time has improved slightly in Quadrant 1 and 2 work. No measurable change in Quadrant 3. Defect rate is flat.

One AI-generated bug is identified: a Quadrant 3 date-range calculation with an off-by-one that passed tests because the test was written after the code (test-after-code anti-pattern). The retrospective names the anti-pattern and adjusts the review checklist.

### Month 5: Level Progressions

Two mid-level engineers reach Level 2 gates. Both are confirmed by the lead and a senior reviewer. Their PRs require line-by-line review of AI-generated code but no longer require additional mentor oversight.

The ADR log has grown by three new records in months 3-5, all from decisions that AI tools surfaced during discovery but that required human-authored justification before code was written.

### Month 6: Checkpoint and Framework Revision

A six-month framework review. Changes are minor: the Quadrant 2 review norm is tightened slightly based on a pattern of convention drift in generated scaffolding. The lint rules for test quality are extended based on a new failure mode observed.

The lead publishes the revised version of the document with a changelog. The revision follows the ADR process.

---

## 15. When AI Is the Wrong Tool

AI assistance is not universally beneficial. Three domains require particular caution.

### 15.1 Deeply Novel Algorithms

AI tools are trained on existing code. For problems with no close precedent in public code, AI output reflects its nearest training analogues, not the problem at hand. Novel algorithms require human-first design: understand the problem, define the invariants, prove correctness by reasoning. AI can assist in implementation once the design is understood. It cannot replace the design work.

If the algorithm is novel enough that no one on the team can evaluate the AI's output, the AI should not be writing it.

### 15.2 Highly Regulated Domains

In domains where every line of code is subject to regulatory audit, traceability, or certification (medical devices, financial systems, safety-critical infrastructure), the audit trail requires that every decision be human-authored and attributable. AI assistance that is undisclosed is a compliance risk. AI assistance that is disclosed may not satisfy the traceability requirements of the regulatory framework.

Teams in regulated domains must understand their specific regulatory requirements before using AI assistance in any code path that touches regulated behavior. When in doubt, do not.

### 15.3 Subtle Concurrency and Parallelism Issues

AI tools frequently introduce plausible-but-wrong parallelism when asked to convert sequential code to concurrent code, or to debug race conditions. The output looks reasonable, compiles, and may pass tests under light load, while containing a race condition that manifests only under specific timing.

Concurrency bugs are among the hardest to detect and reproduce. AI assistance in this domain requires engineers who already understand the concurrency model deeply enough to evaluate the output. If the engineer cannot evaluate it, the AI should not be generating it. Pair with a concurrency expert or use established patterns with known safety properties.

---

## Quick Reference

| Quadrant         | Task Type                   | Supervision                      |
| ---------------- | --------------------------- | -------------------------------- |
| 1 Discovery      | Exploration, ideation       | Looser, output is a thinking aid |
| 2 Boilerplate    | Scaffolding, templates      | Light review + tests             |
| 3 Business Logic | Domain rules, invariants    | Strict review + tests + ADR      |
| 4 Refactoring    | Restructuring existing code | Full review + regression tests   |

| Trust Level           | Profile                               | Gate                                                       |
| --------------------- | ------------------------------------- | ---------------------------------------------------------- |
| Level 1 (0-3 months)  | AI suggests, human writes             | Demonstrated review skill, test-first habit                |
| Level 2 (3-12 months) | AI writes, human reviews line by line | Explained 3 AI-generated PRs under adversarial questioning |
| Level 3 (12+ months)  | AI writes, human reviews architecture | Level 2 skills demonstrated, not just tenure               |

**Four non-negotiables:**

1. Author owns every committed line.
2. Every non-trivial AI-generated function has a human-written test.
3. Every architectural decision is human-authored in an ADR before code.
4. "AI wrote it" is never a valid answer to "why is this here".

**Four anti-patterns:**

1. Vibe-coding: accepting without understanding.
2. Prompt shopping: rerolling until output looks acceptable.
3. Test-after-code: tests written to fit generated code.
4. Review theater: LGTM without engagement.
