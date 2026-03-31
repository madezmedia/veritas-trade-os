# HEARTBEAT.md — Veritas-Trade OS Periodic Checks

This file defines what the agent should check during heartbeat polls.

---

## Current Status: Development Phase

**Priority:** Get API keys and wire up agents

---

## Heartbeat Checklist

### 1. API Keys Status

Check if required credentials are configured:

- [ ] Kraken API key in `config/secrets.toml`
- [ ] Base Sepolia wallet with testnet ETH
- [ ] PRISM API key (code: LABLAB)
- [ ] early.surge.xyz registration complete

**Action if missing:** Remind user to sign up

---

### 2. Agent Health

Check if agents are running:

- [ ] Sentry heartbeat active (every 30s)
- [ ] Executioner heartbeat active (every 10s)
- [ ] Auditor heartbeat active (every 5m)

**Action if inactive:** Restart heartbeats

---

### 3. State Freshness

Check if state files are recent:

- `state/market.json` — Updated within last 60s?
- `state/portfolio.json` — Updated within last hour?
- `state/attestations.json` — Any pending attestations?

**Action if stale:** Trigger agent scan

---

### 4. Hackathon Countdown

**Days remaining:** Calculate from April 12, 2026

**Milestones:**
- [ ] Sentry operational
- [ ] First trade executed
- [ ] First attestation published
- [ ] Social engagement started

---

### 5. Build-in-Public

**Last tweet:** Check timestamp  
**Next milestone:** What to announce?

**Action if >24h since last post:** Suggest next social content

---

## Return Format

If everything is on track: `HEARTBEAT_OK`

If attention needed: Return specific alert with recommended action

---

_Last updated: 2026-03-31_
