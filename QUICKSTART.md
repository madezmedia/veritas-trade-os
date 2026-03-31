# Veritas-Trade OS

> Verifiable, Multi-Chain AI Trading Orchestration Platform

## Quick Links

- 📖 [Full Documentation](README.md)
- 🧠 [Project Memory](PROJECT_MEMORY.md)
- 🔑 [Signup Links](PROJECT_MEMORY.md#signup-links)

## Agent Skills

| Skill | Description | Status |
|-------|-------------|--------|
| [Sentry](skills/sentry/SKILL.md) | Market monitoring & opportunity detection | 📝 Spec'd |
| [Executioner](skills/executioner/SKILL.md) | Trade execution via Kraken CLI + Risk Router | 📝 Spec'd |
| [Auditor](skills/auditor/SKILL.md) | EIP-712 signing + ERC-8004 attestations | 📝 Spec'd |

## Directory Structure

```
veritas-trade-os/
├── README.md              # Full documentation
├── PROJECT_MEMORY.md      # Quick reference & status
├── skills/
│   ├── sentry/            # Market monitor
│   ├── executioner/       # Trade execution
│   └── auditor/           # Trust layer
├── config/
│   ├── secrets.example.toml
│   ├── risk-profile.json
│   ├── sentry.toml
│   ├── executioner.toml
│   └── auditor.toml
├── state/
│   ├── market.json
│   ├── portfolio.json
│   ├── trades.log
│   └── attestations.json
└── contracts/
    ├── IERC8004.sol
    ├── deploy.sh
    └── EIP712_TYPES.md
```

## Hackathon Details

- **Event:** LabLab AI Trading Agents
- **Dates:** March 30 - April 12, 2026
- **Prize Pool:** $55,000
- **Challenges:** Kraken CLI + ERC-8004

## Getting Started

1. Copy config: `cp config/secrets.example.toml config/secrets.toml`
2. Fill in API keys
3. Install Kraken CLI: `brew install kraken-cli`
4. Get testnet ETH: https://docs.base.org/base-chain/network-information/network-faucets
5. Run agents: `openclaw heartbeat add --skill sentry --action monitor`

---

_🦅 Hunt deals. Close deals. Verify everything._
