# AGENTS.md — Veritas-Trade OS Operations

This workspace is the execution system for the Veritas-Trade OS hackathon project.

## Session Startup

Before doing anything:

1. Read `SOUL.md` — Who we are
2. Read `USER.md` — Who we're helping
3. Read `memory/2026-03-31.md` (today) + yesterday's memory file
4. Read `MEMORY.md` for long-term context
5. Review `state/market.json` for current conditions
6. Check hackathon deadline countdown

## Core Operating Rules

- **Plan before executing** — Trading needs discipline
- **Use skills for repeatable patterns** — Sentry, Executioner, Auditor
- **Keep outputs structured** — JSON schemas for all state files
- **Save decisions to memory** — Both daily files and MEMORY.md
- **Ask before external actions** — Especially trades, API calls, publishing

## File Responsibilities

| File | Purpose |
|------|---------|
| `SOUL.md` | Internal philosophy and behavioral standards |
| `IDENTITY.md` | Role and presentation style |
| `USER.md` | Business and user context |
| `MEMORY.md` | Curated long-term memory |
| `memory/YYYY-MM-DD.md` | Daily raw notes and task context |
| `skills/*/SKILL.md` | Repeatable procedures |
| `subagents/*.md` | Specialist role definitions |
| `state/*.json` | Runtime state (market, portfolio, attestations) |

## Agent Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    VERITAS-TRADE OS                         │
│                                                             │
│  SENTRY          EXECUTIONER      AUDITOR                   │
│  (Monitor)       (Execute)        (Prove)                   │
│  gemini-2.5-pro  gemini-2.5-flash gemini-2.5-pro           │
│                                                             │
│  ↓ opportunities ↓ trade intents   ↓ attestations          │
│                                                             │
│               ┌───────▼───────┐                             │
│               │  STATE LAYER  │                             │
│               │  (local FS)   │                             │
│               └───────────────┘                             │
└─────────────────────────────────────────────────────────────┘
```

## Skills Policy

Use a skill when:
- The task is repeated often (market scans, trade execution, attestations)
- Quality depends on a checklist (risk validation, EIP-712 signing)
- Output format should be standardized (state JSON schemas)
- Mistakes are expensive (trading with real capital)

### Current Skills

| Skill | Purpose | Model |
|-------|---------|-------|
| `sentry` | Market monitoring, opportunity detection | gemini-2.5-pro |
| `executioner` | Trade execution via Kraken CLI | gemini-2.5-flash-lite |
| `auditor` | EIP-712 signing, ERC-8004 attestations | gemini-2.5-pro |

Each skill should contain:
- Purpose
- When to use / when NOT to use
- Required inputs
- Process steps
- Output schema
- QA checklist
- Escalation rules

## Sub-Agent Policy

Use sub-agents when:
- Work can run in parallel (Sentry + Auditor independent)
- The task is specialized (contract deployment, video rendering)
- The task is long-running (24/7 monitoring)
- Synthesis benefits from independent passes

Do NOT use sub-agents for:
- Simple one-step tasks
- Tiny edits to state files
- Direct user interactions

### Sub-Agent Roster

| Sub-Agent | Role | When to Spawn |
|-----------|------|---------------|
| `sentry-agent` | Market monitoring | Every 30s via heartbeat |
| `executioner-agent` | Trade execution | When opportunities exist |
| `auditor-agent` | Attestation publishing | Every 5m via heartbeat |
| `deployer-agent` | Contract deployment | When ERC-8004 needs setup |
| `social-agent` | Twitter publishing | For social engagement prize |

## Sub-Agent Return Format

Every sub-agent should return:
- **Objective:** What was the task?
- **Inputs used:** What data/context?
- **Work completed:** What happened?
- **Output:** The deliverable
- **Confidence:** 0.0-1.0
- **Risks or blockers:** What could go wrong?
- **Recommended next action:** What's next?

## Heartbeat Integration

**Sentry:** Every 30 seconds
```bash
openclaw heartbeat add --interval 30s --skill sentry --action scan
```

**Executioner:** Every 10 seconds (when opportunities exist)
```bash
openclaw heartbeat add --interval 10s --skill executioner --action check
```

**Auditor:** Every 5 minutes
```bash
openclaw heartbeat add --interval 5m --skill auditor --action attest
```

## Safety Rules

- **Never expose secrets** — API keys, private keys stay in `config/secrets.toml`
- **Never execute without risk checks** — All trades validated against `risk-profile.json`
- **Never publish without signing** — Every attestation needs EIP-712 signature
- **Never hide failures** — Failed trades go to `trades.log` with reason

## Memory Rules

- **Important decision?** → Write to `memory/YYYY-MM-DD.md`
- **Learned preference?** → Update `MEMORY.md`
- **Repeated mistake?** → Add rule to this file or skill
- **Long-term truth?** → Curate into `MEMORY.md`

## Efficiency Rules

- Prefer cheaper models for sub-agents (Flash for execution)
- Keep main session on strongest reasoning (Pro for strategy)
- Limit fan-out (max 3 concurrent sub-agents)
- Summarize before context bloats
- Reset when switching domains

## Hackathon-Specific Rules

- **Build in public** — Every milestone gets a tweet
- **Tag sponsors** — @krakenfx @lablabai @Surgexyz_
- **Document everything** — Judges read the repo
- **Win first, raise later** — Focus on prize, then VC

---

_🦅 Execute with precision. Prove with truth._
