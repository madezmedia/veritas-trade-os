# Veritas-Trade OS 🦅

**Verifiable, Multi-Chain AI Trading Orchestration Platform**

> "In a world of infinite AI bots, truth is the only scarce resource."

---

## Mission

Build the most *trusted* autonomous trading agent in the LabLab "AI Trading Agents" Hackathon by solving the "Black Box" problem through verifiable, EIP-712 signed trade intents and ERC-8004 attestations.

**Hackathon:** March 30 - April 12, 2026  
**Prize Pool:** $55,000  
**Target:** Best Trustless Trading Agent + Social Engagement

---

## Architecture

### Agent Swarm

```
┌─────────────────────────────────────────────────────────────────┐
│                         Veritas-Trade OS                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────────┐   │
│  │   SENTRY     │───▶│  EXECUTIONER  │───▶│   AUDITOR    │   │
│  │              │    │               │    │              │   │
│  │  Market      │    │  Kraken CLI   │    │  EIP-712     │   │
│  │  Monitor     │    │  + Risk Router│    │  + ERC-8004  │   │
│  │              │    │               │    │              │   │
│  └──────────────┘    └───────────────┘    └──────────────┘   │
│         │                    │                    │          │
│         └────────────────────┴────────────────────┘          │
│                      │                                         │
│               ┌──────▼──────┐                                 │
│               │  STATE LAYER│ ◀── Shared file system          │
│               │  (local FS) │                                  │
│               └─────────────┘                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### The Three Agents

| Agent | Role | Model | Responsibility |
|-------|------|-------|----------------|
| **Sentry** | Market Monitor | `gemini-2.5-pro` | Liquidity surveillance, opportunity detection, risk scoring |
| **Executioner** | Trade Runner | `gemini-2.5-flash-lite` | High-speed execution via Kraken CLI, order routing |
| **Auditor** | Trust Layer | `gemini-2.5-pro` | EIP-712 signing, ERC-8004 attestations, public transparency |

---

## Infrastructure

| Component | Provider | Purpose |
|-----------|----------|---------|
| **CEX Execution** | Kraken CLI (Rust) | Centralized liquidity, fast fills |
| **DEX Liquidity** | Aerodrome Finance (Base) | Decentralized routes, on-chain verification |
| **Trust Registry** | ERC-8004 (Base Sepolia) | On-chain attestations, public audit trail |
| **Orchestration** | OpenClaw heartbeat/cron | 24/7 autonomous operation |

---

## Quick Start

### 1. Install Dependencies

```bash
# Kraken CLI
brew install kraken-cli

# Node.js deps (for ERC-8004 interaction)
cd ~/veritas-trade-os/contracts
npm install

# OpenClaw skills (auto-loaded)
# ln -s ~/veritas-trade-os/skills/* ~/.openclaw/workspace/skills/
```

### 2. Configure API Keys

```bash
cp ~/veritas-trade-os/config/secrets.example.toml \
   ~/veritas-trade-os/config/secrets.toml

# Edit secrets.toml with your keys
nano ~/veritas-trade-os/config/secrets.toml
```

### 3. Start the Agents

```bash
# Sentry: Market monitoring (heartbeat: every 30s)
openclaw heartbeat add --interval 30s \
  --skill sentry --action monitor

# Executioner: Trade execution (heartbeat: every 10s)
openclaw heartbeat add --interval 10s \
  --skill executioner --action execute

# Auditor: Attestation publishing (heartbeat: every 5m)
openclaw heartbeat add --interval 5m \
  --skill auditor --action attest
```

### 4. Set Risk Parameters

In your OpenClaw chat:

```
@hawk Set max leverage to 2x for the next 24 hours
@hawk Max position size: $5,000 per asset
@hawk Stop-loss threshold: -5% daily PnL
```

---

## State Management

All agents share state through the local filesystem:

```
~/veritas-trade-os/state/
├── market.json           # Sentry: current conditions, opportunities
├── portfolio.json        # Executioner: positions, open orders
├── trades.log            # Executioner: trade history
├── attestations.json     # Auditor: signed intents, ERC-8004 hashes
└── risk-profile.json     # User-defined risk parameters
```

---

## Verification & Transparency

### Public Dashboard (WIP)

- Real-time "Risk Score" based on Sentry analysis
- Trade rationales published with ERC-8004 attestations
- On-chain verification via Base Sepolia explorer

### ERC-8004 Attestation Format

```json
{
  "agent": "veritas-trade-os",
  "strategy": "mean-reversion-btc-usd",
  "trade": {
    "pair": "BTCUSD",
    "side": "buy",
    "size": 0.5,
    "price": 85000
  },
  "rationale": "BTC dipped 3% below 20-day MA with strong buy volume on Kraken",
  "riskScore": 12,
  "timestamp": "2026-03-31T16:20:00Z"
}
```

---

## Development Status

- [x] Project scaffolding
- [ ] Sentry skill (market monitoring)
- [ ] Executioner skill (Kraken CLI integration)
- [ ] Auditor skill (EIP-712 + ERC-8004)
- [ ] State layer implementation
- [ ] Risk Router logic
- [ ] Public dashboard
- [ ] Social media integration (for engagement prize)

---

## Differentiation

**Why Veritas-Trade wins:**

1. **Category Creation** — We're not just a trading bot; we're the *trust layer* other bots use.
2. **Network Effects** — Other teams query our Auditor Registry for their own decisions.
3. **Institutional-Grade** — Verifiable = fundable. "Black box" = casino.

---

## License

MIT — Build in public, win together.

_🦅 Hunt deals. Close deals. Verify everything._
