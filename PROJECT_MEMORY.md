# Veritas-Trade OS - Project Memory

## Quick Reference

**Hackathon:** LabLab AI Trading Agents  
**Dates:** March 30 - April 12, 2026 (12 days remaining)  
**Prize Pool:** $55,000

**Primary Targets:**
- 🥇 Best Trustless Trading Agent ($10,000)
- 🥈 Best Risk-Adjusted Return ($5,000)
- 🏆 Social Engagement 1st Place ($1,200)

**Strategy:** Combine Kraken CLI + ERC-8004 for maximum differentiation

---

## Signup Links

| Service | Link | Status |
|---------|------|--------|
| **Kraken API** | https://support.kraken.com/articles/360000919966-how-to-create-an-api-key | ⏳ Pending |
| **Base Sepolia Faucet** | https://docs.base.org/base-chain/network-information/network-faucets | ⏳ Pending |
| **early.surge.xyz** | https://early.surge.xyz (admin / JBRv2xWG7AzwVrLz88) | ⏳ Pending |
| **PRISM API** | https://prismapi.ai (code: LABLAB) | ⏳ Pending |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Veritas-Trade OS                        │
├─────────────────────────────────────────────────────────────────┤
│  SENTRY          │  EXECUTIONER      │  AUDITOR                │
│  Market Monitor  │  Trade Runner     │  Trust Layer            │
│  gemini-2.5-pro  │  gemini-2.5-flash │  gemini-2.5-pro         │
└─────────────────────────────────────────────────────────────────┘
         │                  │                   │
         └──────────────────┴───────────────────┘
                            │
                    ┌───────▼───────┐
                    │  STATE LAYER  │
                    │  (local FS)   │
                    └───────────────┘
```

---

## Key Differentiators

1. **Verifiable Trust** — Every trade signed via EIP-712, published to ERC-8004
2. **Network Effects** — Other teams query our registry for their decisions
3. **Build in Public** — Real-time dashboard + Twitter feed for social engagement prize

---

## Next Steps

1. [ ] Get Kraken API keys
2. [ ] Get Base Sepolia testnet ETH from faucet
3. [ ] Register project on early.surge.xyz
4. [ ] Claim PRISM API credits (code: LABLAB)
5. [ ] Deploy ERC-8004 registry contract
6. [ ] Wire up Sentry heartbeat
7. [ ] Start building in public on Twitter

---

## Deployment Options (Research Needed)

- **NVIDIA NemoClaw** — GPU-accelerated agent deployment?
- **Elest.io** — Cloud hosting via skill
- **Local** — Run on Mac for hackathon duration

---

_Last updated: 2026-03-31_
