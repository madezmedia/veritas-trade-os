# TOOLS.md — Veritas-Trade OS Technical Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to this trading setup.

---

## Kraken API

**Signup:** https://support.kraken.com/articles/360000919966-how-to-create-an-api-key

**Permissions needed:**
- ✅ Query funds
- ✅ Query open orders & trades
- ✅ Query closed orders & trades
- ✅ Create & cancel orders
- ❌ Withdraw (NEVER enable for bots)

**CLI Install:**
```bash
brew install kraken-cli
```

**Config Location:** `config/secrets.toml`

---

## Base Sepolia (Aerodrome DEX)

**Faucet:** https://docs.base.org/base-chain/network-information/network-faucets

**Requirements:**
- Free Alchemy account
- Request testnet ETH (1 per 24h)

**RPC:** `https://sepolia.base.org`  
**Chain ID:** 84532

**Aerodrome Testnet:** Switch wallet to Base Sepolia, visit aerodrome.finance

---

## ERC-8004 Registry

**Contract Interface:** `contracts/IERC8004.sol`

**EIP-712 Signing:**
- Domain: Veritas-Trade OS
- Chain: Base Sepolia (84532)
- Types: See `contracts/EIP712_TYPES.md`

**Deployment:**
```bash
cd contracts
./deploy.sh
```

---

## PRISM API (Market Data)

**Signup:** https://prismapi.ai  
**Promo Code:** `LABLAB` ($10 free credits, ~15K calls)

**Endpoints:**
- `/resolve/{asset}` — Universal asset identity
- `/crypto/{symbol}/price` — Real-time prices
- `/signals/{symbol}` — AI signals
- `/risk/{symbol}` — Volatility + metrics

---

## OpenClaw Heartbeat

**Sentry (30s):**
```bash
openclaw heartbeat add --interval 30s --skill sentry --action scan
```

**Executioner (10s):**
```bash
openclaw heartbeat add --interval 10s --skill executioner --action check
```

**Auditor (5m):**
```bash
openclaw heartbeat add --interval 5m --skill auditor --action attest
```

---

## State Files

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `state/market.json` | Market conditions, opportunities | Every 30s |
| `state/portfolio.json` | Positions, PnL | Per trade |
| `state/trades.log` | Trade history (append-only) | Per trade |
| `state/attestations.json` | ERC-8004 attestations | Every 5m |

---

## Deployment Options

| Platform | Cost | Use Case |
|----------|------|----------|
| Local (Mac) | $0 | Development |
| Elest.io | $14/mo | 24/7 production |
| NVIDIA NemoClaw | TBD | Enterprise security |

**Elest.io Quick Deploy:**
```bash
npm install -g elestio
elestio login --email "..." --token "..."
elestio deploy openclaw --project <id> --name veritas-agent
```

---

## Social Media (Engagement Prize)

**Hashtags:** #VeritasTradeOS #AITrading #ERC8004 #KrakenCLI  
**Tag:** @krakenfx @lablabai @Surgexyz_

**Auto-post triggers:**
- Trade executed → Post rationale + attestation link
- Daily summary → PnL, win rate, risk score
- Milestones → "First 10 trades verified on-chain"

---

_Last updated: 2026-03-31_
