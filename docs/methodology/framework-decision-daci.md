# Framework Decision Methodology: DACI Process

**Version:** 1.0
**Status:** Active
**Last updated:** 2026-08-30
**Applies to:** Any near-irreversible architectural or technology decision.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [When to Use This Framework](#2-when-to-use-this-framework)
3. [DACI Role Definitions](#3-daci-role-definitions)
   - [Driver](#driver)
   - [Approver](#approver)
   - [Contributors](#contributors)
   - [Informed](#informed)
4. [The 4-Week Timeboxed Process](#4-the-4-week-timeboxed-process)
   - [Week 1: Listen](#week-1--listen)
   - [Week 2: Criteria Before Candidates](#week-2--criteria-before-candidates)
   - [Week 3: Spike PoC if Finalists Tie](#week-3--spike-poc-if-finalists-tie)
   - [Week 4: Decision and Trace](#week-4--decision-and-trace)
5. [Weighted Criteria Grid Template](#5-weighted-criteria-grid-template)
6. [Anti-Patterns Rejected](#6-anti-patterns-rejected)
7. [Driver Posture](#7-driver-posture)
8. [AI and Velocity Note](#8-ai-and-velocity-note)
9. [Output Format: the ADR](#9-output-format-the-adr)
10. [Concrete Scenario Example](#10-concrete-scenario-example)
11. [Quick Reference](#11-quick-reference)

---

## 1. Purpose

Technology decisions at the framework or platform level are rarely reversible.
Choosing a frontend framework, a database engine, a cloud provider, or a
monorepo tool sets constraints that compound over years: hiring pipelines align
to the choice, onboarding material is built on it, third-party integrations are
written against it, and refactoring away from it carries escalating costs at
every future increment.

Yet these decisions are among the most debated, the most politically charged,
and the most prone to poor process. Teams fall into one of three failure modes:
endless debate with no resolution, unilateral decisions that generate passive
sabotage, or popularity contests where the loudest voice wins. None of these
produces a technically sound, organizationally owned outcome.

This framework solves three problems at once:

- **Structure over noise.** It gives any team a repeatable, time-bounded
  process to reach a defensible decision, regardless of team size or
  distributed geography.
- **Distributed authority.** It separates who drives the process from who
  approves the outcome. No single person concentrates both roles.
- **Traceable rationale.** It produces a written artifact (an Architecture
  Decision Record) that captures not just the choice, but the criteria, the
  rejected alternatives, and the revisit conditions. Future teams inherit the
  reasoning, not just the result.

The framework is deliberately process-oriented rather than opinion-oriented.
It does not prescribe which technology to choose. It prescribes how to choose
with fairness, speed, and organizational commitment.

The underlying conviction: a mediocre choice made with fair process, written
rationale, and full team commitment outperforms a technically superior choice
that was imposed, contested, and inconsistently applied. Process produces
adoption. Adoption produces outcomes.

---

## 2. When to Use This Framework

### Use this framework when the decision is:

- **Near-irreversible** within a meaningful time horizon (typically 18 to
  36 months). If undoing the choice in 12 months would require a multi-sprint
  migration effort, apply this framework.
- **Cross-functional in impact.** The decision simultaneously affects hiring
  pipelines, developer tooling, training materials, CI configuration, and
  codebase structure.
- **Contested.** Multiple reasonable options exist and reasonable people
  disagree. If one option is obviously dominant, a lightweight architectural
  note suffices.
- **High migration cost if reconsidered.** Switching later requires significant
  rewrite, data migration, parallel maintenance periods, or retraining at scale.

### Typical decisions that qualify:

- Frontend framework (React, Vue, Angular, Svelte, and successors).
- Backend runtime or framework (Node/Express, NestJS, Django, Spring Boot).
- Database engine or persistence strategy (PostgreSQL, MongoDB, DynamoDB).
- Monorepo tooling (Turborepo, Nx, Bazel).
- Cloud provider or infrastructure platform.
- Authentication and identity provider (especially if it touches multiple apps).
- State management strategy when it becomes an org-wide convention enforced
  by linting or code review rules.
- API design protocol (REST, GraphQL, tRPC) when applied consistently across
  multiple services.

### Do NOT use this framework for:

- Decisions that are fully reversible with low cost (a utility library for a
  single component, a test helper preference, a formatter rule).
- Urgent production fixes where the cost of process delay exceeds the cost of
  an imperfect decision.
- Decisions already effectively locked by external constraints (client mandate,
  regulatory requirement, an existing contractual dependency).
- Decisions within a single team's exclusive scope where no other team is
  affected and migration cost is bounded.

A useful heuristic: if the word "migration" would appear in the ticket to
reverse this decision, apply this framework.

---

## 3. DACI Role Definitions

DACI is a responsibility assignment model. It stands for Driver, Approver,
Contributors, Informed. Unlike RACI, it explicitly separates the process owner
(Driver) from the decision owner (Approver). This separation is the
framework's central design choice.

Without this separation, the most common failure mode occurs: the person
driving the analysis also decides the outcome. They unconsciously optimize the
analysis toward their preferred conclusion, and the process produces a
rationalization dressed as a recommendation.

---

### Driver

The Driver owns the process, not the outcome.

Concretely, the Driver:

- Schedules and runs the four-week process end to end.
- Conducts stakeholder interviews in Week 1, without advocacy.
- Facilitates criteria agreement before candidates are named in Week 2.
- Organizes the spike PoC if the grid produces a tie in Week 3.
- Writes the ADR draft in Week 4.
- Ensures the decision is made on time, with fair debate, and with all
  relevant voices heard, including voices from distributed or
  geographically remote team members who might otherwise be underrepresented.
- Commits in advance, explicitly and publicly, to executing the process
  result even if it conflicts with their own technical preference.

The Driver is typically the architect or senior engineer who originally raised
the need for a decision, precisely because they have the strongest stake and
the deepest context. Having a preference is expected. What is non-negotiable
is the commitment to process discipline regardless of that preference.

One Driver per decision. Shared driving dilutes accountability and creates
coordination overhead at each step.

The Driver is not a neutral party in a political sense. They are a
disciplined party: someone who holds strong opinions and channels them into
making the process rigorous, not into making the outcome predetermined.

---

### Approver

The Approver makes the final call.

The Approver is typically senior technical leadership: a principal engineer,
a CTO, a VP of Engineering, or a technical lead with organizational authority.
Their role is not to re-evaluate the technical details exhaustively; that is
the Contributors' work. Their role is to review the process output and confirm
or redirect the recommendation based on organizational context that
Contributors may not have visibility into.

The Approver's primary guard against confirmation bias: they receive the
weighted criteria grid and the PoC results before receiving the recommendation.
If the recommendation contradicts the grid's highest scorer, the Approver
asks why before approving. An unexplained gap between grid output and
recommendation is a signal that the process may have been shaped toward a
conclusion.

One Approver per decision. A panel Approver (vote required) is acceptable for
organizations with formal architecture review boards, but must be defined
upfront and cannot be added mid-process to accommodate disagreement.

The Approver role also carries a temporal accountability: they are named in
the ADR. When the 24-month revisit clause triggers, the current Approver (or
their successor in the role) is the named owner of the review.

---

### Contributors

Contributors are consulted for their expertise and context. They do not hold
veto power, but their input materially shapes the criteria (Week 2), the spike
design (Week 3), and the ADR consequences section (Week 4).

Typical Contributors:

- Development team members who will work with the technology daily. Their
  lived experience with the current stack and their candid concerns about
  alternatives are among the most valuable inputs in Week 1.
- Site leads or chapter leads in distributed organizations. Their hiring
  market context often differs significantly from headquarters: a framework
  that is easy to recruit for in one geography may be a staffing bottleneck
  in another. This asymmetry must be represented, not averaged away.
- DevOps or platform engineers, whose perspective covers deployment
  complexity, observability tooling compatibility, and CI/CD pipeline impact.
- Security or compliance engineers, when the decision has regulatory surface
  area (authentication providers, data residency requirements, open-source
  license compatibility).

For distributed teams, Contributors must have an async-friendly path to
participate. Written interviews, anonymous concern forms, and asynchronous
criteria weight votes are all valid. A decision that was fully consulted in
one time zone and partially consulted everywhere else is not a fully
consulted decision.

The Driver is responsible for ensuring no relevant voice is structurally
excluded by meeting logistics, organizational hierarchy, or geography.

---

### Informed

Informed parties are notified after the decision is made. They do not
participate in the process. They need to know the result because it affects
their work, planning, or dependencies.

Typical Informed parties: product management, project management, adjacent
engineering teams who will integrate with the affected system, and future
onboarding cohorts via the ADR in the repository.

Informing is not optional. A decision made without notifying Informed
stakeholders creates adoption gaps equivalent to skipping Contributors.
The announcement should reference the ADR location so the full reasoning
is discoverable.

---

## 4. The 4-Week Timeboxed Process

Four weeks is the default timebox. It can be compressed to two weeks for
smaller-scope decisions (single-team, single-app, limited stakeholder group)
or extended by one week maximum for very large distributed organizations where
Week 1 interviews require more scheduling lead time.

Extensions beyond five weeks indicate one of two conditions: the decision is
not ready to be made (missing context that should be surfaced before the
process begins), or the decision is being held hostage by internal politics
(a Driver or Approver escalation is required to unblock).

The timebox is not a deadline for perfection. It is a deadline for decision.
The opportunity cost of non-decision is real and consistently underestimated.
A team without a settled framework choice makes local decisions that diverge:
different applications use different tooling, onboarding becomes inconsistent,
and the eventual forced decision (made under deadline pressure or by attrition)
is made under worse conditions than this process creates.

---

### Week 1: Listen

**Goal:** Understand the landscape before forming opinions.

The Driver conducts structured stakeholder interviews. These are not debates.
They are listening sessions. The Driver asks open questions and takes notes
without advocating, defending, or pre-filtering based on their own view.

Recommended interview questions:

- What problem are you trying to solve that the current approach fails at?
- What are you most concerned about losing if we change?
- What does success look like in 18 months from your position?
- What concerns do you have that you might not raise in a group meeting?

The final question is methodologically critical. Group settings systematically
suppress minority views, especially in hierarchical organizations. People who
hold unpopular opinions or concerns that feel professionally risky to raise
will not surface them in a team meeting. Anonymous written forms (a shared
form with no attribution) capture these concerns before they calcify into
passive resistance after the decision is made.

For distributed teams: the Driver must explicitly collect input from each
site, not assume that headquarters-adjacent voices represent the whole
organization. A framework straightforward to recruit for in one city may be a
long-term staffing challenge in another. This asymmetry is not visible without
deliberately seeking it out.

The Driver does not evaluate the validity of concerns during Week 1. Every
concern is recorded. Concerns that turn out to be unweighted by the criteria
process in Week 2 will not survive into the final grid, but recording them
builds legitimacy: contributors who feel heard are more likely to commit to
a decision that does not go their way.

**Week 1 deliverable:** A written summary of stakeholder perspectives,
organized by theme, anonymized where appropriate. Circulated to Contributors
for review before Week 2 begins.

---

### Week 2: Criteria Before Candidates

**Goal:** Agree on what matters before naming what to compare.

This is the methodological core of the framework and the step most commonly
skipped by teams who have already formed a strong preference. The anti-pattern
it prevents is rationalization: defining criteria after already knowing the
preferred candidate, which produces a grid that scores suspiciously well for
the pre-chosen option while appearing objective.

The sequence within Week 2:

1. The Driver proposes a draft criteria list based on themes from the Week 1
   summary. This draft reflects what stakeholders actually said, not what the
   Driver thinks should matter.
2. Contributors review and amend the list asynchronously. Written comments
   only; no synchronous meeting for this step. Async allows participants in
   different time zones to contribute without scheduling pressure.
3. Contributors assign weights independently, before any group discussion.
   Independent weights reveal where genuine disagreement exists versus where
   apparent disagreement is just anchoring to someone else's framing.
4. The Driver compiles independent weights and identifies gaps or conflicts.
   A short synchronous session (or async if geography prohibits synchronous
   contact) resolves conflicts. The goal is consensus on weights, not
   unanimity; the Approver can break ties.
5. Weights are finalized and frozen. Only then is the candidate list opened.

Criteria are decision dimensions, not feature lists. They answer the question:
what organizational, operational, and sustainability factors matter most for
this decision, given the context documented in Week 1? Good criteria connect
directly to the concerns raised in stakeholder interviews.

A criterion with no weight does not belong in the grid. Zero-weight criteria
create the appearance of rigor without contributing to the outcome. The
framework explicitly supports "excluded non-criteria": criteria that were
considered and deliberately excluded, with documented rationale. This prevents
them from being reintroduced informally during scoring. See Section 5 for
an example.

**Week 2 deliverable:** A finalized, weighted criteria grid with rationale
for each weight and documented exclusions. Distributed to all Contributors
and the Approver before Week 3.

---

### Week 3: Spike PoC if Finalists Tie

**Goal:** Replace opinion with evidence when the criteria grid does not
produce a clear winner.

After applying the weighted grid to the candidate list, one of two outcomes
occurs:

- **Clear winner:** the highest-scoring candidate leads the next-closest by
  more than 10 points on a 100-point scale. Proceed to Week 4. The spike is
  skipped, and the timebox advantage is used to give the ADR draft more
  review time.
- **Finalists within a close margin (10 points or fewer):** run a 3-day
  timeboxed spike PoC.

The 10-point threshold is a default. The Driver and Approver may adjust it
for specific decisions, but the threshold must be defined before scoring begins
(not after observing the scores).

**The spike PoC:**

The spike is not a full prototype. It is a constrained experiment with a
deliberately narrow scope. The same representative feature is built in each
finalist candidate. "Representative" means the feature exercises the specific
technical concerns that the grid criteria flagged: if ecosystem integration is
a high-weight criterion, the spike feature should touch an ecosystem
integration. If developer ergonomics is weighted, the spike feature should
exercise the areas where ergonomics differ most between candidates.

The spike is built by a mixed pair: one advocate per finalist. This pairing
is intentional. It reduces the risk of an advocate building a straw man of
their non-preferred option. The mixed pair has joint accountability for the
quality of both implementations.

Spike output is a short written report covering code volume and structure,
onboarding friction, tooling integration points, and surprises. Surprises that
surface new criteria are noted in the ADR as known gaps, not used to restart
Week 2.

The spike report goes to the Approver alongside the criteria grid. Neither
document is labeled "the recommendation"; both are inputs to the Approver's
decision in Week 4.

**What the spike is not:** a performance benchmark (framework-level performance
rarely differentiates candidates for business UIs; see Section 5), an
opportunity to extend the timebox (three days is the hard limit), or a
mechanism to restart criteria negotiation (criteria are frozen at the end of
Week 2).

**Week 3 deliverable:** A spike report. Three days maximum, or documented
skip if the grid produced a clear winner.

---

### Week 4: Decision and Trace

**Goal:** Make the decision, write the record, commit to execution.

The Approver reviews three documents: the criteria grid (with scores applied
to each candidate), the spike report (if produced in Week 3), and the
Driver's written recommendation. The recommendation is a short document,
typically one page, that interprets the grid and spike findings and proposes
a choice. It is not a pitch; it is an interpretation.

The Approver makes the final call. If the Approver's choice diverges from
the grid's top scorer, the rationale must be written into the ADR
(organizational constraints, information the Approver holds that Contributors
did not, risk assessments that supersede the grid). An unexplained override
without written rationale undermines the process for current and future
team members.

The Driver then writes the ADR. Section 9 covers the required format.

After the ADR is merged: **disagree-and-commit**. Contributors who preferred
a different option build with the chosen technology with the same craft and
commitment they would bring to their preferred one. The ADR records the
dissent; the team moves forward as a unit. Continued advocacy through the
revisit clause is legitimate; passive resistance (building slowly, badly, or
with deliberate friction) is not.

**Week 4 deliverable:** A merged ADR, announced to Informed stakeholders.

---

## 5. Weighted Criteria Grid Template

The grid is the analytical core of the framework. It transforms stakeholder
interviews into a structured, comparable evaluation. The criteria and weights
below are a template; they must be calibrated per context in Week 2.
The example weights are drawn from a realistic multi-team frontend framework
decision and are provided as a calibration reference, not as universal defaults.

### Base Template

| Criterion                              | Weight   | Rationale                                                     |
| -------------------------------------- | -------- | ------------------------------------------------------------- |
| Recruitment and talent pool            | %        | Availability of candidates in the team's hiring markets.      |
| Existing team skills                   | %        | Current team's proficiency; ramp cost to close the gap.       |
| Ecosystem maturity                     | %        | Libraries, tooling, community size, third-party integrations. |
| Longevity and breaking-change history  | %        | API stability over major versions; historical migration cost. |
| Team adoption likelihood               | %        | Qualitative signal from Week 1 interviews.                    |
| _Additional context-specific criteria_ | %        | Added based on Week 1 findings.                               |
| **Total**                              | **100%** |                                                               |

### Example: Multi-Team Frontend Framework Decision

The following weights reflect a distributed team of 12 engineers across two
sites, evaluating a frontend framework for a new multi-app project. They are
not universal; a single-team startup with a strong existing skill base would
weight differently.

| Criterion                             | Weight        | Rationale                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Recruitment and talent pool           | 30%           | Distributed team, hiring markets with meaningfully different candidate availability per framework. Dominant criterion because a bad hiring market compounds over the entire product lifetime.                                                                                                                                                             |
| Existing team skills                  | 25%           | Significant ramp cost differential between finalists. Ramp time directly reduces delivery capacity for the first 6 to 12 months.                                                                                                                                                                                                                          |
| Ecosystem maturity                    | 20%           | Must integrate with an existing monorepo toolchain, a design system, and a testing infrastructure. Integration friction is real and measurable.                                                                                                                                                                                                           |
| Longevity and breaking-change history | 15%           | The 24-month lock clause requires confidence that the framework's own migration cost is bounded during that period.                                                                                                                                                                                                                                       |
| Team adoption likelihood              | 10%           | Qualitative signal from Week 1 interviews. A technically superior choice with low team adoption produces net-negative outcomes; passive compliance is worse than enthusiastic use of a "good enough" choice.                                                                                                                                              |
| Performance                           | 0% (excluded) | Explicitly excluded for this context. All finalists exceed the performance requirements of a business UI by a factor that makes differentiation on this axis meaningless. Including performance would introduce spurious differentiation. The exclusion is documented here to prevent it from being reintroduced informally during scoring or discussion. |
| **Total**                             | **100%**      |                                                                                                                                                                                                                                                                                                                                                           |

### Scoring Mechanics

Each candidate is scored per criterion on a 0-to-10 scale. Scores are
assigned by the Driver, reviewed by Contributors, and disputed scores are
resolved by the Approver. Scores must be justified in writing, not just
asserted: a score of 8 for "Ecosystem maturity" should reference specific
libraries, tooling integrations, or community data. Unjustified scores can
be challenged by any Contributor.

Example scoring table:

| Criterion       | Weight   | Candidate A | Candidate B | Candidate C |
| --------------- | -------- | ----------- | ----------- | ----------- |
| Recruitment     | 30%      | 8 (2.40)    | 6 (1.80)    | 5 (1.50)    |
| Existing skills | 25%      | 7 (1.75)    | 8 (2.00)    | 4 (1.00)    |
| Ecosystem       | 20%      | 9 (1.80)    | 7 (1.40)    | 6 (1.20)    |
| Longevity       | 15%      | 8 (1.20)    | 7 (1.05)    | 9 (1.35)    |
| Team adoption   | 10%      | 7 (0.70)    | 8 (0.80)    | 5 (0.50)    |
| **Total**       | **100%** | **7.85**    | **7.05**    | **5.55**    |

In this example, Candidate A wins by 0.80 points over Candidate B (more than
the 0.10 gap representing the 10-point threshold on a 10-point scale). No
spike is required. Candidate A is the recommendation.

If Candidate A and Candidate B had both scored 7.85 or within the threshold
margin, the Week 3 spike protocol would apply to those two finalists.
Candidate C would be eliminated regardless of spike results.

---

## 6. Anti-Patterns Rejected

This framework is partly defined by what it explicitly rejects. Three
anti-patterns recur in technical decision-making and are incompatible with
this process. Naming them prevents them from re-entering through informal
channels.

### Anti-pattern 1: Vote Without Criteria

A team vote held before agreement on evaluation criteria is a popularity
contest. It measures familiarity and social influence, not organizational fit.
More subtly: each voter applies their own implicit criteria, which differ.
Two people vote for the same option for incompatible reasons, neither reason
is examined, and the buried disagreement surfaces later as conflict over
implementation decisions.

This framework requires criteria to be agreed and weighted before candidates
are named or scored. Violating this sequence invalidates the process.

### Anti-pattern 2: The Unilateral Authority Decision

A technical leader deciding alone is fast and avoids conflict. It also
produces decisions with zero distributed ownership. Teams who were not
consulted are not wrong to feel the decision was made for them. The result is
passive compliance: the technology is used but not championed, workarounds
accumulate, and the decision is relitigated informally at every friction point.

The framework preserves authority without concentrating process. The Approver
makes the final call; they do not run the analysis. The Driver runs the
analysis; they do not make the final call. Separating these roles distributes
both the cognitive load and the legitimacy of the outcome.

### Anti-pattern 3: Endless Debate

Some teams treat thoroughness as an unbounded virtue: every resolved question
surfaces three more, and the decision is perpetually "almost ready." This is
indecision with intellectual cover.

The opportunity cost of non-decision is real and consistently underestimated.
A team without a settled framework choice makes local decisions that diverge,
and the eventual forced decision is made under deadline pressure rather than
under the structured conditions this process creates.

The timebox is a forcing function. The framework's position is unambiguous:
the opportunity cost of a deferred decision exceeds the improvement from
additional deliberation beyond the timebox. Make the decision. Write the ADR.
Revisit in 24 months with better information.

---

## 7. Driver Posture

The Driver's role requires a specific mindset that should be articulated
before the process begins, not assumed.

**The governing constraint:** the Driver owns the process, not the outcome.
Holding a strong preference for a specific candidate is normal. What is
non-negotiable is that this preference does not shape the process design: not
the framing of interview questions, not the selection of criteria, not the
narrative around stakeholder concerns, not the written justification of scores.

**The pre-commitment:** before Week 1 begins, the Driver states explicitly to
the Approver and to Contributors: "I commit to executing the result of this
process, regardless of whether it matches my preference." This is a binding
commitment to disagree-and-commit if the outcome differs from the Driver's
preferred candidate. Making it public holds the Driver accountable throughout
and signals to Contributors that their input is real, not performative.

**The Driver's job, restated simply:** give the Approver clean, well-evidenced
inputs from which a defensible decision can be made. A Driver who does this
successfully has served the organization regardless of which candidate wins.

A mediocre choice executed with full team discipline produces better outcomes
than a technically superior choice the team resists in a hundred small ways.
The Driver's process discipline is the condition that makes commitment possible.

---

## 8. AI and Velocity Note

The rise of AI coding assistants has measurably reduced the marginal cost of
writing, converting, and scaffolding code in any mainstream technology stack.
A task that once required deep framework-specific familiarity can now be
completed with AI assistance at a fraction of the prior time cost. Some teams
have concluded from this that framework choice matters less than it did five
years ago.

This conclusion is partially correct and importantly incomplete.

**What AI assistance genuinely changes:**

- The marginal cost of writing boilerplate in an unfamiliar framework is lower.
- The cost of producing a spike PoC (Week 3) is materially lower; the
  three-day timebox may be generous for teams with good AI tooling.
- Individual ramp time for engineers joining a new codebase is somewhat shorter.

**What AI assistance does not change:**

- Recruitment pipelines advertise specific frameworks. Candidate pools filter
  on stated technology. AI assistance after the hire does not change pool size
  during recruiting.
- Ecosystem decisions depend on community size and maintenance activity. AI
  tooling does not substitute for a library that does not exist or security
  patches a small community is slow to publish.
- Breaking-change history is a property of the framework's governance model,
  not the team's tooling.

**What matters more under AI assistance:**

Surface-level familiarity is less differentiating. Architectural understanding
is more differentiating. A developer who can explain why a framework makes its
design choices will use AI assistance more effectively and will catch
AI-generated errors that a surface-level user will not.

**Summary:** framework choice remains consequential. The weighted criteria in
Section 5 remain valid. AI assistance reduces some costs in Week 3 and
modestly reduces the ramp-cost component of the existing-skills criterion.
It does not remove the need for Week 2 or change the recruitment, ecosystem,
or security dimensions of the grid.

---

## 9. Output Format: the ADR

The output of Week 4 is an Architecture Decision Record (ADR). This framework
recommends the MADR format (Markdown Any Decision Records) for its balance of
structure and readability in a version-controlled codebase.

An ADR template is available in this repository at
[`docs/adr/template.md`](../adr/template.md).

**Required sections for decisions made using this DACI framework:**

```markdown
# ADR-NNNN: [Decision title]

## Status

Accepted

Revisit date: YYYY-MM-DD (24 months from acceptance)

## Context

[The situation that made this decision necessary. Organizational constraints,
team composition and distribution at decision time, the specific problem
the decision addresses. Future readers need this to understand why the
choice made sense in its specific moment.]

## DACI

- Driver: [name or role]
- Approver: [name or role]
- Contributors: [names or roles, by site if distributed]
- Informed: [teams or roles notified after the decision]

## Decision Drivers

[The finalized criteria from the Week 2 weighted grid, listed with their
weights and brief rationale. Reference the full scoring table below or in
an appendix.]

## Considered Options

[All candidates evaluated, including those eliminated early and the reasons
for early elimination. Completeness here matters: future readers encountering
a framework migration proposal need to know which alternatives were already
evaluated and why they were rejected.]

## Decision Outcome

**Chosen option:** [name]

**Rationale:** [Connection between the grid's highest-weight criteria and
the chosen option's scores. If the Approver's choice diverges from the
grid's top scorer, the rationale for that divergence is written here.]

### Weighted Scoring Grid

[Full table: criteria, weights, candidate scores, weighted scores, totals.]

### Consequences

**Positive:**

- [what this choice enables]

**Negative:**

- [what this choice costs or forecloses]

**Neutral:**

- [trade-offs with no clear positive or negative valence]

## Rejected Alternatives

[For each rejected option: why it scored lower on the weighted grid, and
what would have to change for it to become a viable candidate in a future
review. One to two paragraphs per option. Avoid dismissiveness; a future
team may have context that changes the evaluation.]

## Revisit Clause

This decision will be reviewed on [DATE, 24 months from acceptance].
The review does not imply the decision will change; it implies it will
be examined against the organizational context at that time, including
changes in team composition, hiring markets, ecosystem maturity, and
the framework's own API stability record since this ADR was written.
```

### Notes on ADR Practice

ADRs are committed to the repository they affect, versioned alongside the
code they govern. They are not documentation in a separate wiki that drifts
out of sync. Number ADRs sequentially; do not renumber. If a decision is
superseded, update the original's status field and create a new ADR. The
original stays in the record.

Short ADRs are acceptable. A clear context, a documented grid, a stated
choice with rationale, and a revisit date are sufficient.

---

## 10. Concrete Scenario Example

**Setup:** A greenfield multi-app project, 12 engineers across two sites,
choosing a frontend framework before the first sprint. Three camps: React
(largest ecosystem, most global candidates), Vue (existing skill concentration
at Site B, lower ramp cost), Angular (TypeScript-first, structural conventions
for large teams).

**Week 1:** The Driver interviews all 12 engineers by site plus an anonymous
form. Themes: Site B engineers predominantly Vue-experienced with ramp-cost
concern; Site A split React/Angular; React candidates more available across
both hiring markets but Vue candidates at Site B have greater depth; one
engineer flags Angular's historically disruptive major-version migrations.
Written summary organized by theme, circulated to Contributors.

**Week 2:** Six criteria proposed. Performance excluded (all three finalists
exceed requirements by an order of magnitude for the application type;
documented). Five weighted criteria finalized: Recruitment 30%, Existing
skills 25%, Ecosystem 20%, Longevity 15%, Team adoption 10%. Candidates
scored: Vue scores highest on the grid. React is close on recruitment.
Angular scores lower on longevity due to the migration concern.

**Week 3:** Vue and React are within 6 points (threshold: 10). Spike applies.
Mixed pair (one Vue advocate from Site B, one React advocate from Site A)
builds a filterable data table with async loading and accessible keyboard
navigation in both frameworks over three days. Report: Vue faster to produce
given existing skills; both implementations comparable in code quality; React
ecosystem has one library with no direct Vue equivalent for the planned
visualization layer. Noted as a consequence in the ADR, not a disqualifier.

**Week 4:** Approver reviews grid, spike report, recommendation (Vue).
Approves. ADR merged: full grid, spike findings, Angular rejection rationale,
revisit clause 24 months out. All 12 engineers and project management notified.
ADR location included in the announcement.

The React advocate records dissent in the ADR. The team commits to Vue. Six
months later, that same engineer's visualization ecosystem knowledge makes
them the most effective contributor to the one component the spike flagged,
applied as a bounded integration within the Vue architecture.

---

## 11. Quick Reference

### Process Timeline

| Week | Name                         | Key Output                              | Hard Timebox |
| ---- | ---------------------------- | --------------------------------------- | ------------ |
| 1    | Listen                       | Written stakeholder summary, circulated | 5 days       |
| 2    | Criteria before candidates   | Finalized weighted grid (frozen)        | 5 days       |
| 3    | Spike PoC (if finalists tie) | Spike report, or documented skip        | 3 days max   |
| 4    | Decision and trace           | Merged ADR, announced to Informed       | 2 days       |

### DACI Role Summary

| Role         | Owns                                        | Does NOT own               |
| ------------ | ------------------------------------------- | -------------------------- |
| Driver       | The process from start to finish            | The outcome                |
| Approver     | The final call                              | The analysis or interviews |
| Contributors | The expertise input and criteria validation | The decision               |
| Informed     | Awareness of the outcome                    | Any part of the process    |

### Anti-Pattern Summary

| Anti-pattern                  | Symptom                                        | Framework response                                         |
| ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| Vote without criteria         | Popularity contest, no analytical basis        | Criteria finalized before candidates named (Week 2)        |
| Unilateral authority decision | Zero distributed ownership, passive resistance | Separated Driver and Approver roles                        |
| Endless debate                | Perpetual deferral, opportunity cost ignored   | Hard 4-week timebox, explicit cost-of-non-decision framing |

### Spike Trigger Rule

If the top two candidates score within 10 points on a 100-point weighted
scale, run the 3-day spike. Otherwise skip and proceed to Week 4. The
10-point threshold is a default; adjust before scoring begins, not after.

---

_This document describes a decision-making process. It does not prescribe
which technology to choose. The process is designed to be adopted by any
team facing near-irreversible architectural decisions, independent of
technology stack, organization size, or industry domain._
