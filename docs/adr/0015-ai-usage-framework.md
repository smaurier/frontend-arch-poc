# 0015 · AI usage framework for engineering teams

**Date:** 2026-08-30
**Status:** accepted

## Context

AI-assisted development is present in most engineering teams whether it is sanctioned or not. Without a shared framework, adoption produces unowned code, review theater, and silent quality drift. This repo publishes a methodology to structure adoption safely.

## Decision

- **Publish** `docs/methodology/ai-in-engineering-team.md` as a portable framework, MADR-inspired long-form, English, impersonal.
- **Codify** four quadrants of AI usage by task type crossed with supervision level.
- **Non-negotiable**: every AI-generated function has a human-written test. Every architectural decision is human-owned in an ADR. Author owns every line committed under their name.
- **Trust ladder**: three levels tied to demonstrated review skill, not tenure alone.
- **Anti-patterns rejected**: vibe-coding, prompt shopping, test-after-code, review theater.
- **Honest labeling**: public artifacts state AI-assistance status truthfully. No fake all-human pretense.
- **Metrics**: cycle time and defect rate stay the measures. Do not track lines-generated-by-AI as a KPI.

## Consequences

- Positive: adoption is structured, review culture stays sharp, trust grows.
- Positive: transparent labeling improves credibility with recruiters and clients.
- Negative: reviewer time increases in the short term.
- Follow-up: revise every 12 months as AI capabilities evolve. Match to team scale.

## Alternatives considered

- **Ban AI usage**: pushes it underground. Rejected.
- **No framework, trust individuals**: uneven quality across the team. Rejected.
- **Per-commit AI usage tracking as KPI**: gamifies the wrong signal. Rejected.

## References

- Methodology doc: `docs/methodology/ai-in-engineering-team.md`
- Related: ADR-0004 (testing), ADR-0006 (team standards v0), Framework Decision DACI methodology doc.
