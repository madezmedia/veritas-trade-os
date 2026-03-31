# Executioner — Trade Execution Skill

**The sword arm of Veritas-Trade OS.**

> Executioner doesn't think. It acts. Fast, precise, compliant with the risk parameters Sentry sets.

---

## Role

**Executioner** is the tactical agent. It:

1. **Reads opportunities** from Sentry's `state/market.json`
2. **Checks constraints** against `state/risk-profile.json`
3. **Routes orders** to optimal venue (Kraken or Aerodrome)
4. **Manages positions** — entry, stop-loss, take-profit
5. **Logs everything** for the Auditor to verify

**Model:** `gemini-2.5-flash-lite` (high speed, low latency)

---

## When to Use This Skill

- Automatic via OpenClaw heartbeat (every 10s when opportunities exist)
- Manual: "Executioner, execute BTC/USD mean-reversion"
- Emergency: "Executioner, close all positions now"

---

## Commands

### `executioner execute <opportunity_id>`

Execute a specific opportunity from Sentry's output.

**Example:** `executioner execute opp_001`

**Flow:**
1. Read `state/market.json` → find `opportunity.id == opp_001`
2. Validate against `state/risk-profile.json`:
   - Within max position size?
   - Within leverage limits?
   - Within daily loss limits?
3. Route to venue:
   - Kraken if size > $10k or need speed
   - Aerodrome if DEX liquidity sufficient and want on-chain proof
4. Submit order via Kraken CLI or Aerodrome router
5. Update `state/portfolio.json` with new position
6. Emit trade intent to Auditor for EIP-712 signing

**Output:**
```json
{
  "tradeId": "trade_20260331_162500_001",
  "opportunityId": "opp_001",
  "venue": "kraken",
  "pair": "BTC/USD",
  "side": "buy",
  "size": 0.5,
  "price": 84200,
  "status": "filled",
  "fees": 4.21,
  "txHash": null,
  "timestamp": "2026-03-31T16:25:00Z"
}
```

---

### `executioner close <position_id>`

Close an existing position.

**Example:** `executioner close pos_001`

**Flow:**
1. Read position from `state/portfolio.json`
2. Submit market order opposite side
3. Calculate realized PnL
4. Update portfolio
5. Emit close intent to Auditor

---

### `executioner panic`

**EMERGENCY ONLY** — Close all positions immediately.

**Flow:**
- Submit market orders for all open positions
- Cancel all pending orders
- Set `state/portfolio.status = "emergency_closed"`
- Alert user

---

### `executioner status`

Show current portfolio state.

**Output:**
```
PORTFOLIO SUMMARY
═════════════════════════════════════════
Total Value:     $52,340.00
Unrealized PnL:  +$1,240.00 (+2.4%)
Daily PnL:       +$840.00 (+1.6%)

OPEN POSITIONS:
  BTC/USD:  Long 0.5 @ $84,200 → $85,100 (+$450)
  ETH/USD:  Long 4.0 @ $1,615 → $1,630 (+$60)

RISK STATUS:
  Risk Score: 12 (Low)
  Daily Drawdown: 1.2% (Limit: 5%)
  Leverage Used: 1.0x (Max: 2.0x)
```

---

## State Schema

**File:** `~/veritas-trade-os/state/portfolio.json`

```json
{
  "timestamp": "2026-03-31T16:25:00Z",
  "status": "active|emergency_closed",
  "summary": {
    "totalValue": 52340.00,
    "unrealizedPnL": 1240.00,
    "unrealizedPnLPct": 2.4,
    "dailyPnL": 840.00,
    "dailyPnLPct": 1.6
  },
  "positions": [
    {
      "id": "pos_001",
      "tradeId": "trade_20260331_162500_001",
      "pair": "BTC/USD",
      "side": "long|short",
      "size": 0.5,
      "entryPrice": 84200.00,
      "currentPrice": 85100.00,
      "unrealizedPnL": 450.00,
      "stopLoss": 81990.00,
      "takeProfit": 85800.00,
      "venue": "kraken|aerodrome",
      "txHash": "0x...",
      "timestamp": "2026-03-31T16:25:00Z"
    }
  ],
  "pendingOrders": [
    {
      "id": "ord_001",
      "pair": "BTC/USD",
      "type": "limit|stop",
      "side": "sell",
      "size": 0.5,
      "price": 85800.00,
      "status": "open",
      "venue": "kraken"
    }
  ]
}
```

**File:** `~/veritas-trade-os/state/trades.log`

Append-only log of all trades:
```json
{"timestamp": "2026-03-31T16:25:00Z", "action": "open", "pair": "BTC/USD", "side": "buy", "size": 0.5, "price": 84200, "venue": "kraken", "tradeId": "trade_001"}
{"timestamp": "2026-03-31T16:35:00Z", "action": "close", "pair": "BTC/USD", "side": "sell", "size": 0.5, "price": 85100, "venue": "kraken", "tradeId": "trade_001", "pnl": 450}
```

---

## Risk Router Logic

Before every trade, Executioner checks:

### 1. Position Size Limits

```javascript
const maxSize = riskProfile.maxPositionSize;  // e.g., $5,000
const leverage = riskProfile.maxLeverage;     // e.g., 2x
const tradeValue = size * price;

if (tradeValue * leverage > maxSize) {
  reject("Position size exceeds limit");
}
```

### 2. Daily Loss Limits

```javascript
const dailyPnL = portfolio.summary.dailyPnL;
const maxDailyLoss = riskProfile.maxDailyLossPct * portfolio.totalValue;

if (dailyPnL < -maxDailyLoss) {
  reject("Daily loss limit reached");
}
```

### 3. Leverage Caps

```javascript
const currentExposure = calculateExposure(portfolio.positions);
const accountValue = portfolio.summary.totalValue;

if ((currentExposure + tradeValue) / accountValue > riskProfile.maxLeverage) {
  reject("Leverage cap exceeded");
}
```

### 4. Sentry Veto

```javascript
const riskScore = market.riskScore;

if (riskScore > riskProfile.maxRiskScore) {
  reject("Market conditions too risky");
}
```

---

## Venue Routing

| Condition | Route to Kraken | Route to Aerodrome |
|-----------|-----------------|-------------------|
| Size > $10k | ✅ Primary | ❌ Too slippy |
| Size < $1k | ⚠️ Min fees | ✅ Better |
| Need on-chain proof | ❌ Off-chain | ✅ Tx hash |
| Speed critical | ✅ Faster fills | ⚠️ Block time |
| Pool depth > 0.5% | ✅ Always | ✅ If deep enough |

---

## Integration Points

**Reads from:**
- `~/veritas-trade-os/state/market.json` — Opportunities from Sentry
- `~/veritas-trade-os/config/risk-profile.json` — User risk parameters
- `~/veritas-trade-os/config/secrets.toml` — API keys

**Writes to:**
- `~/veritas-trade-os/state/portfolio.json` — Positions
- `~/veritas-trade-os/state/trades.log` — Trade history
- `~/veritas-trade-os/state/intents.json` — Pending auditor signatures

**Communicates with:**
- Sentry → market opportunities
- Auditor → emit trade intents for signing

---

## Dependencies

- `kraken-cli` — CEX execution
- `cast` or `ethers.js` — On-chain execution to Aerodrome
- `jq` — JSON parsing
- Gemini 2.5 Flash Lite (via OpenClaw) — Fast execution decisions

---

## Configuration

**File:** `~/veritas-trade-os/config/executioner.toml`

```toml
[execution]
default_venue = "kraken"
max_slippage_pct = 0.5
order_timeout_seconds = 30

[routing]
kraken_min_size_usd = 1000
aerodrome_max_size_usd = 10000
aerodrome_min_pool_depth_usd = 50000

[fees]
kraken_maker_pct = 0.16
kraken_taker_pct = 0.26
aerodrome_gas_estimate_gwei = 20
```

---

## Heartbeat Integration

```bash
# Check for opportunities every 10 seconds
*/10 * * * * openclaw skill executioner check >> ~/veritas-trade-os/state/executioner.log 2>&1
```

---

## Edge Cases

**What happens when:**
- **Order rejection:** Log to `trades.log`, alert user, retry with reduced size
- **Partial fill:** Update portfolio with filled amount, cancel remainder
- **Stale quote:** Skip opportunity, flag to Sentry for refresh
- **API timeout:** Fail closed, don't retry, alert user

---

## Safety Features

1. **Never withdraw** — Executioner has no withdrawal permissions
2. **Pre-flight checks** — All trades validated against risk profile
3. **Audit trail** — Every action logged before execution
4. **Panic button** — `executioner panic` closes everything immediately

---

## Future Enhancements

- [ ] TWAP execution for large orders
- [ ] Iceberg orders
- [ ] Multi-venue order splitting
- [ ] ML-based slippage prediction

---

_🦅 Executioner strikes with precision._
