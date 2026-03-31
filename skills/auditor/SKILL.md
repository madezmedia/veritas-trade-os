# Auditor — Trust & Verification Skill

**The soul of Veritas-Trade OS.**

> Auditor proves why we traded. In a world of black-box bots, we bring truth.

---

## Role

**Auditor** is the trust layer. It:

1. **Receives trade intents** from Executioner
2. **Generates rationales** using Gemini Pro (deep analysis)
3. **Signs EIP-712** structured data
4. **Publishes attestations** to ERC-8004 registry on Base
5. **Serves transparency** — Public dashboard queries our registry

**Model:** `gemini-2.5-pro` (deep reasoning for rationales)

---

## Why This Matters

**The problem:** AI trading bots are black boxes. Even if they win, no one knows *why* or if they'll blow up tomorrow.

**Our solution:** Every trade is:
- **Explained** — Natural language rationale
- **Signed** — Cryptographically proven via EIP-712
- **Attested** — On-chain via ERC-8004
- **Verifiable** — Anyone can check our logic

**Result:** Institutional-grade trust. Not just another bot — infrastructure.

---

## When to Use This Skill

- Automatic via OpenClaw heartbeat (every 5 min)
- Manual: "Auditor, attest last trade"
- Public queries: "Auditor, show trade rationale for tx 0x..."

---

## Commands

### `auditor attest <trade_id>`

Generate and publish an attestation for a completed trade.

**Example:** `auditor attest trade_20260331_162500_001`

**Flow:**
1. Read trade from `state/trades.log`
2. Read market context from `state/market.json`
3. Generate rationale using Gemini Pro:
   - Why this trade?
   - What signals triggered it?
   - How did it fit the strategy?
4. Construct EIP-712 structured data
5. Sign with agent private key
6. Publish to ERC-8004 registry on Base Sepolia
7. Update `state/attestations.json`

**Output:**
```json
{
  "attestationId": "att_20260331_162500_001",
  "tradeId": "trade_20260331_162500_001",
  "eip712": {
    "domain": {
      "name": "VeritasTradeOS",
      "version": "1.0.0",
      "chainId": 84532,
      "verifyingContract": "0x..."
    },
    "message": {
      "agent": "veritas-trade-os",
      "strategy": "mean-reversion-btc-usd",
      "trade": {
        "pair": "BTC/USD",
        "side": "buy",
        "size": 0.5,
        "price": 84200
      },
      "rationale": "BTC dipped 3.2% below 20-day moving average ($86,800) on strong volume. Kraken order book shows bid support at $84,000 with $2M depth within 0.5%. Sentry risk score: 12 (low). This fits our mean-reversion strategy with 78% confidence.",
      "riskScore": 12,
      "marketRegime": "trending-up",
      "timestamp": "2026-03-31T16:25:00Z"
    },
    "signature": "0x..."
  },
  "erc8004Tx": "0x...",
  "erc8004AttestationId": "123",
  "publicUrl": "https://base-sepolia.explorer.io/tx/0x...",
  "timestamp": "2026-03-31T16:25:05Z"
}
```

---

### `auditor verify <attestation_id>`

Verify an attestation was properly signed and published.

**Example:** `auditor verify att_20260331_162500_001`

**Checks:**
- EIP-712 signature validity
- ERC-8004 transaction on-chain
- Agent identity match
- Timestamp integrity

**Output:**
```
✅ ATTESTATION VERIFIED

Trade:          BTC/USD buy 0.5 @ $84,200
Strategy:       mean-reversion-btc-usd
Risk Score:     12

Signed By:      0x123...abc (VeritasTradeOS)
On-Chain:       https://base-sepolia.explorer.io/tx/0xabc...
ERC-8004 ID:    123

Published:      2026-03-31 16:25:05 UTC
Verified:       2026-03-31 16:30:00 UTC

Status:         VALID
```

---

### `auditor rationale <trade_id>`

Return the human-readable rationale for a trade.

**Example:** `auditor rationale trade_20260331_162500_001`

**Output:**
```
TRADE RATIONALE
═════════════════════════════════════════

BTC/USD — Long 0.5 @ $84,200
Strategy: Mean Reversion
Confidence: 78%

WHY WE TRADED:
  BTC dipped 3.2% below its 20-day moving average ($86,800),
  creating a classic mean-reversion setup. Key signals:

  ✅ Price action: 3.2% below 20DMA
  ✅ Volume: 2.3x average on the dip (strong demand)
  ✅ Order book: $2M bid support within 0.5%
  ✅ Correlation: ETH showing similar pattern (confirmation)

RISK ASSESSMENT:
  Sentry Risk Score: 12 (Low)
  Volatility: Medium (2.1% daily ATR)
  Liquidity: Deep (Kraken + Aerodrome)

EXPECTED OUTCOME:
  Target: $85,800 (+1.9%)
  Stop: $81,990 (-2.6%)
  R:R Ratio: 1.4:1

Published: 2026-03-31 16:25:05 UTC
Verify: https://base-sepolia.explorer.io/tx/0xabc...
```

---

### `auditor registry-stats`

Show public registry metrics.

**Output:**
```
VERITAS-TRADE REGISTRY
═════════════════════════════════════════

Total Attestations:     47
Trades Executed:        52 (9 pending attestation)

Win Rate:               68.1%
Avg Return per Trade:   +1.4%
Best Trade:             +$1,240 (BTC/USD long)
Worst Trade:            -$340 (ETH/USD short)

Current Risk Score:     12 (Low)
Market Regime:          Trending Up

Last Published:         2026-03-31 16:25:05 UTC
Registry URL:           https://base-sepolia.explorer.io/address/0x...
```

---

## EIP-712 Schema

```typescript
const domain = {
  name: "VeritasTradeOS",
  version: "1.0.0",
  chainId: 84532,  // Base Sepolia
  verifyingContract: "0x...",  // ERC-8004 Registry
};

const types = {
  Trade: [
    { name: "agent", type: "string" },
    { name: "strategy", type: "string" },
    { name: "pair", type: "string" },
    { name: "side", type: "string" },
    { name: "size", type: "uint256" },
    { name: "price", type: "uint256" },
    { name: "rationale", type: "string" },
    { name: "riskScore", type: "uint8" },
    { name: "marketRegime", type: "string" },
    { name: "timestamp", type: "uint256" },
  ],
};

const message = {
  agent: "veritas-trade-os",
  strategy: "mean-reversion-btc-usd",
  pair: "BTC/USD",
  side: "buy",
  size: "50000000",  // 0.5 BTC (8 decimals)
  price: "84200000000",  // $84,200 (8 decimals)
  rationale: "BTC dipped 3.2% below 20-day MA...",
  riskScore: 12,
  marketRegime: "trending-up",
  timestamp: 1730387100,
};
```

---

## ERC-8004 Integration

**Registry Contract:** Standard ERC-8004 on Base Sepolia

```solidity
// ERC-8004 Registry Interface
interface IERC8004 {
    function attest(
        bytes32 attestationId,
        address agent,
        bytes calldata data,
        bytes calldata signature
    ) external;

    function getAttestation(bytes32 attestationId)
        external view returns (
            address agent,
            bytes memory data,
            bytes memory signature,
            uint256 timestamp
        );
}
```

**Our attestation data (ABI-encoded):**
- `agent`: VeritasTradeOS identity address
- `data`: EIP-712 message (JSON string)
- `signature`: EIP-712 signature

---

## State Schema

**File:** `~/veritas-trade-os/state/attestations.json`

```json
{
  "attestations": [
    {
      "attestationId": "att_20260331_162500_001",
      "tradeId": "trade_20260331_162500_001",
      "erc8004AttestationId": "123",
      "erc8004Tx": "0x...",
      "pair": "BTC/USD",
      "side": "buy",
      "size": 0.5,
      "price": 84200,
      "strategy": "mean-reversion-btc-usd",
      "rationale": "BTC dipped 3.2% below 20-day MA...",
      "riskScore": 12,
      "marketRegime": "trending-up",
      "signature": "0x...",
      "publicUrl": "https://base-sepolia.explorer.io/tx/0x...",
      "timestamp": "2026-03-31T16:25:05Z",
      "verified": true
    }
  ],
  "stats": {
    "total": 47,
    "verified": 47,
    "pending": 0
  }
}
```

---

## Rationale Generation

Auditor uses Gemini Pro to generate detailed rationales:

**Prompt Template:**
```
You are the Auditor for Veritas-Trade OS, a verifiable AI trading agent.

Explain this trade in detail:

TRADE:
- Pair: {pair}
- Side: {side}
- Size: {size}
- Entry: {price}
- Strategy: {strategy}

MARKET CONTEXT:
- Regime: {regime}
- Volatility: {volatility}
- Risk Score: {riskScore}
- Opportunity: {opportunity_data}

Provide a rationale covering:
1. WHY: What signals triggered this trade?
2. CONFIDENCE: How strong is the setup?
3. RISK: What are the key risks?
4. OUTCOME: What's the expected result?

Keep it concise but detailed enough for institutional verification.
```

---

## Integration Points

**Reads from:**
- `~/veritas-trade-os/state/trades.log` — Trade history
- `~/veritas-trade-os/state/market.json` — Market context
- `~/veritas-trade-os/config/auditor.toml` — Registry addresses

**Writes to:**
- `~/veritas-trade-os/state/attestations.json` — Attestation log
- Base Sepolia (ERC-8004 Registry) — On-chain attestations

**Communicates with:**
- Executioner → receives trade intents
- Public → serves verification queries

---

## Public Dashboard (WIP)

Anyone can query our registry:

```
GET https://api.veritas-trade.io/attestations/{attestationId}
```

Returns full attestation with:
- Trade details
- Rationale
- EIP-712 signature
- On-chain verification link

---

## Dependencies

- `cast` or `ethers.js` — On-chain interactions
- `jq` — JSON parsing
- Gemini 2.5 Pro (via OpenClaw) — Rationale generation
- Base Sepolia RPC — On-chain publishing

---

## Configuration

**File:** `~/veritas-trade-os/config/auditor.toml`

```toml
[registry]
contract_address = "0x..."  # ERC-8004 on Base Sepolia
chain_id = 84532
rpc_url = "https://sepolia.base.org"

[agent]
private_key_env = "VERITAS_PRIVATE_KEY"
identity_address = "0x..."

[attestation]
batch_size = 10
publish_interval_seconds = 300
```

---

## Heartbeat Integration

```bash
# Publish pending attestations every 5 minutes
*/5 * * * * openclaw skill auditor publish >> ~/veritas-trade-os/state/auditor.log 2>&1
```

---

## Edge Cases

**What happens when:**
- **RPC down:** Queue attestations, retry next heartbeat
- **Gas too high:** Wait, retry when gas drops
- **Invalid signature:** Reject, alert user, don't publish
- **Registry contract error:** Log, retry with increased gas

---

## Security Features

1. **Private key never exposed** — Uses `cast wallet sign` or hardware wallet
2. **Sign-then-publish** — Signature generated off-chain
3. **Immutable attestations** — Once on-chain, cannot be altered
4. **Public verification** — Anyone can check our work

---

## Future Enhancements

- [ ] ZK-proof of strategy execution
- [ ] Cross-chain attestations (Ethereum, Arbitrum)
- [ ] Real-time dashboard with live updates
- [ ] Twitter bot auto-publishing attestations

---

_🦅 Auditor proves our worth._
