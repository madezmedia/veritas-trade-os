# Deployment Strategy — Veritas-Trade OS

## Options Overview

| Option | Pros | Cons | Cost |
|--------|------|------|------|
| **Local (Mac)** | Zero cost, full control, fastest iteration | Downtime if laptop sleeps, no redundancy | $0 |
| **Elest.io** | Managed, 24/7 uptime, 9 cloud providers | Requires setup, ongoing cost | $14-55/mo |
| **NVIDIA NemoClaw** | Enterprise security, GPU acceleration, privacy guardrails | New platform, learning curve | TBD |

---

## Recommended Approach: Hybrid

**For Hackathon (12 days):**
1. **Develop locally** on Mac — fastest iteration, direct debugging
2. **Deploy to Elest.io** for 24/7 agent runtime (trading needs uptime)
3. **Optionally add NemoClaw** for security hardening if handling real capital

---

## Option 1: Local Deployment (Recommended for Development)

**Already running!** OpenClaw Gateway is active on this Mac.

**Pros:**
- Zero setup time
- Direct file access for debugging
- No latency to Kraken API

**Cons:**
- Laptop must stay awake
- No automatic failover

**For 24/7 uptime on Mac:**
```bash
# Prevent sleep
caffeinate -d

# Or use pmset
sudo pmset -a disablesleep 1
```

---

## Option 2: Elest.io Deployment (Recommended for Production)

**Official OpenClaw template:** https://elest.io/open-source/openclaw

**What Elest.io provides:**
- Managed OpenClaw on dedicated VMs
- 9 cloud providers (AWS, Azure, Hetzner, netcup, etc.)
- 100+ regions
- Automated backups, SSL, updates
- 24/7 monitoring
- Starting at $14/month (MEDIUM-2C-4G)

**Deployment Steps:**

```bash
# 1. Install Elestio CLI
npm install -g elestio

# 2. Login (requires account at dash.elest.io)
elestio login --email "your@email.com" --token "xxx_..."

# 3. Create project
elestio projects create veritas-trade-os

# 4. Deploy OpenClaw
elestio deploy openclaw --project <projectID> --name veritas-agent

# 5. Get credentials
elestio credentials <vmID>
```

**Recommended config for trading agent:**
- **Provider:** Hetzner (best features) or netcup (best value)
- **Region:** nbg (Germany) or ash (US East)
- **Size:** MEDIUM-2C-4G ($14/mo) — sufficient for agent + heartbeat jobs

**Total hackathon cost:** ~$5-7 (prorated 12 days)

---

## Option 3: NVIDIA NemoClaw (Enterprise Security)

**What it is:**
- NVIDIA's official plugin for OpenClaw
- Adds security controls: sandboxed execution, network policies, privacy-preserving model routing, audit logging
- Built on NVIDIA NeMo + NIM integration

**When to use:**
- Handling real capital (not just testnet)
- Need enterprise compliance/audit trails
- Want GPU-accelerated model inference

**Deployment:**
```bash
# Install NemoClaw plugin (if available)
openclaw plugin install nemoclaw

# Or use hosted version
# https://nemoclaw.run/
```

**Status:** New platform (announced March 2026). May require NVIDIA developer access.

---

## Interface & Interaction Strategy

### User Interaction Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    VERITAS-TRADE OS                         │
│                                                             │
│  USER COMMANDS (via Slack/Discord/Telegram)                │
│  ──────────────────────────────────────────                │
│  "Set max leverage to 2x"     → Updates risk-profile.json  │
│  "Show portfolio"             → Reads state/portfolio.json │
│  "Pause trading"              → Sets status: paused        │
│  "Why did we buy BTC?"        → Auditor retrieves rationale│
│                                                             │
│  AUTONOMOUS OPERATIONS                                       │
│  ──────────────────────────────────────────                │
│  Sentry (every 30s)           → Scans market               │
│  Executioner (on opportunity) → Executes trades            │
│  Auditor (every 5m)           → Publishes attestations     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Command Reference

| User Command | Agent Action | Response |
|--------------|--------------|----------|
| `status` | Read all state files | Portfolio + risk + opportunities summary |
| `set leverage <X>` | Update risk-profile.json | ✅ Updated max leverage to X |
| `set max-size <$X>` | Update risk-profile.json | ✅ Updated max position to $X |
| `pause` | Set status=paused | ⏸️ Trading paused. Positions held. |
| `resume` | Set status=active | ▶️ Trading resumed. |
| `panic` | Close all positions | 🚨 All positions closed. PnL: $X |
| `why <trade_id>` | Auditor rationale | Full explanation with on-chain proof |
| `verify <tx>` | Check ERC-8004 | ✅ Attestation valid on Base Sepolia |

### Public Interface (Dashboard)

**URL:** `https://veritas-trade.io` (or Elest.io subdomain)

**Displays:**
- Live portfolio value
- Risk score (real-time)
- Recent trades with rationales
- ERC-8004 attestation feed
- "Trust Score" (aggregate validation quality)

### Social Interface (Twitter/X)

**Automated posts:**
- Trade executed → Tweet rationale + attestation link
- Daily summary → PnL, win rate, risk score
- Milestone → "First 10 trades verified on-chain!"

**Tagging:**
- @krakenfx
- @lablabai
- @Surgexyz_

---

## Recommended Timeline

| Day | Action |
|-----|--------|
| **Today (Mar 31)** | Scaffold complete ✅, Get API keys, Local testing |
| **Apr 1-2** | Build Sentry + Executioner, Test on Kraken sandbox |
| **Apr 3-4** | Build Auditor, Deploy ERC-8004 registry |
| **Apr 5-6** | Deploy to Elest.io for 24/7 uptime |
| **Apr 7-10** | Live trading (small size), Build in public |
| **Apr 11-12** | Polish, documentation, final submission |

---

## Next Actions

1. **Get API keys:**
   - Kraken: https://support.kraken.com/articles/360000919966
   - Base Sepolia faucet: https://docs.base.org/base-chain/network-information/network-faucets
   - PRISM API (code: LABLAB): https://prismapi.ai

2. **Register on early.surge.xyz:**
   - Login: admin / JBRv2xWG7AzwVrLz88
   - Create project for hackathon eligibility

3. **Deploy to Elest.io** (optional, when ready for 24/7):
   ```bash
   elestio deploy openclaw --project <id> --name veritas-agent
   ```

---

_🦅 Deploy. Trade. Verify._
