# Sentry — Market Monitor Skill

**The eyes and ears of Veritas-Trade OS.**

> Sentry never sleeps. It watches liquidity, spots opportunities, and flags risks before they become disasters.

---

## Role

**Sentry** is the surveillance agent. It continuously monitors:

1. **Kraken** — Order book depth, spread width, volume anomalies
2. **Aerodrome (Base)** — DEX liquidity pools, slippage conditions
3. **Cross-venue arbitrage** — Price deviations between CEX and DEX
4. **Market regime** — Volatility, trend strength, correlation shifts

**Output:** Structured market state → `~/veritas-trade-os/state/market.json`

---

## When to Use This Skill

- Automatic via OpenClaw heartbeat (every 30s)
- Manual: "Run Sentry market scan"
- Risk checks: "Sentry, assess current conditions"

---

## Commands

### `sentry scan`

Full market sweep across Kraken + Aerodrome.

**Output:** Updates `state/market.json` with:
```json
{
  "timestamp": "2026-03-31T16:25:00Z",
  "regime": "trending-up",
  "volatility": "medium",
  "opportunities": [
    {
      "pair": "BTC/USD",
      "type": "mean-reversion",
      "entry": 84200,
      "target": 85800,
      "confidence": 0.78,
      "rationale": "3% dip below 20DMA with strong volume support"
    }
  ],
  "risks": [
    {
      "level": "medium",
      "type": "liquidity-thin",
      "venue": "aerodrome-BTC/USDC",
      "detail": "Pool depth < $50k within 0.5%"
    }
  ],
  "riskScore": 12
}
```

---

### `sentry assess <pair>`

Deep dive on a single trading pair.

**Example:** `sentry assess BTC/USD`

Returns:
- Order book shape (bid/ask skew)
- Recent volume profile
- Volatility percentile (30-day)
- Correlation with major assets
- Liquidity health score (1-100)

---

### `sentry arbitrage`

Scan for cross-venue price discrepancies > 0.5%.

**Output:** Updates `state/market.json` with:
```json
{
  "arbitrage": [
    {
      "pair": "ETH/USD",
      "kraken": 1620.50,
      "aerodrome": 1628.75,
      "spread_pct": 0.51,
      "profit_potential": "$8.25 per ETH",
      "actionable": true
    }
  ]
}
```

---

## State Schema

**File:** `~/veritas-trade-os/state/market.json`

```json
{
  "timestamp": "ISO-8601",
  "regime": "trending-up|trending-down|range-bound|volatile",
  "volatility": "low|medium|high",
  "riskScore": 0-100,
  "opportunities": [
    {
      "pair": "BTC/USD",
      "type": "mean-reversion|momentum|arbitrage",
      "confidence": 0.0-1.0,
      "entry": float,
      "target": float,
      "stop": float,
      "rationale": "string"
    }
  ],
  "risks": [
    {
      "level": "low|medium|high",
      "type": "liquidity-thin|volatility-spike|correlation-break",
      "venue": "string",
      "detail": "string"
    }
  ],
  "arbitrage": [
    {
      "pair": "string",
      "kraken": float,
      "aerodrome": float,
      "spread_pct": float,
      "profit_potential": "string",
      "actionable": boolean
    }
  ]
}
```

---

## Integration Points

**Reads from:**
- `~/veritas-trade-os/config/risk-profile.json` — Risk tolerance settings
- Kraken REST API — Order book, ticker, trades
- Aerodrome Subgraph — Pool reserves, prices

**Writes to:**
- `~/veritas-trade-os/state/market.json` — Market state
- `~/veritas-trade-os/state/sentry.log` — Audit trail

**Notifies:**
- Executioner when `opportunities` meets risk thresholds
- Auditor when `riskScore` exceeds configured limits

---

## Risk Scoring

Sentry calculates a composite risk score (0-100) based on:

| Factor | Weight | Notes |
|--------|--------|-------|
| Volatility | 30% | ATR relative to 30-day average |
| Liquidity depth | 25% | Order book depth within 0.5% |
| Correlation stability | 20% | BTC-ETH correlation break flags |
| Spread width | 15% | Wider spreads = higher risk |
| Volume anomaly | 10% | Sudden volume spikes |

**Score interpretation:**
- 0-20: Low risk — Trade freely
- 21-40: Managed risk — Reduce position sizes 25%
- 41-60: Elevated risk — Reduce position sizes 50%
- 61-80: High risk — Only defensive trades
- 81-100: Extreme risk — Halt all new positions

---

## Dependencies

- `kraken-cli` — REST API access
- `curl` — Direct API calls to Aerodrome/Subgraph
- `jq` — JSON parsing
- Gemini 2.5 Pro (via OpenClaw) — Regime classification, rationale generation

---

## Configuration

**File:** `~/veritas-trade-os/config/sentry.toml`

```toml
[monitoring]
pairs = ["BTC/USD", "ETH/USD", "SOL/USD"]
interval_seconds = 30
arbitrage_threshold_pct = 0.5

[regime]
lookback_hours = 24
volatility_window = 30  # days

[risk]
max_volatility_pct = 5.0
min_liquidity_usd = 100000
correlation_break_threshold = 0.3
```

---

## Heartbeat Integration

**Crontab equivalent:**

```bash
# Run Sentry scan every 30 seconds
*/30 * * * * openclaw skill sentry scan >> ~/veritas-trade-os/state/sentry.log 2>&1
```

---

## Edge Cases

**What happens when:**
- **API down:** Sentry logs error, keeps last known state, flags `dataStatus: stale`
- **Zero liquidity:** Marks venue as `degraded`, excludes from routing
- **Price gap > 2%:** Triggers immediate `riskScore: 90` alert to user

---

## Future Enhancements

- [ ] Sentiment analysis from Twitter/Discord
- [ ] On-chain flow monitoring (whale alerts)
- [ ] Cross-exchange arbitrage beyond Aerodrome
- [ ] ML-based regime prediction

---

_🦅 Sentry sees what others miss._
