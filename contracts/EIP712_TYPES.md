# EIP-712 Type Definitions for Veritas-Trade OS

## Domain

```typescript
{
  name: "VeritasTradeOS",
  version: "1.0.0",
  chainId: 84532,  // Base Sepolia
  verifyingContract: "0x...",  // ERC-8004 Registry
}
```

## Types

```typescript
{
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
}
```

## Message Example

```typescript
{
  agent: "veritas-trade-os",
  strategy: "mean-reversion-btc-usd",
  pair: "BTC/USD",
  side: "buy",
  size: "50000000",  // 0.5 BTC (8 decimals)
  price: "84200000000",  // $84,200 (8 decimals)
  rationale: "BTC dipped 3.2% below 20-day moving average ($86,800) on strong volume. Kraken order book shows bid support at $84,000 with $2M depth within 0.5%. Sentry risk score: 12 (low). This fits our mean-reversion strategy with 78% confidence.",
  riskScore: 12,
  marketRegime: "trending-up",
  timestamp: 1730387100,  // Unix timestamp
}
```

## Signing with cast

```bash
cast wallet sign \
  --from 0x... \
  --data "$(cat message.json)" \
  private_key_or_keystore_path
```

## Verification

To verify an EIP-712 signature on-chain, use `ecrecover` with:
- `hash = keccak256(abi.encodePacked("\x19\x01", domainSeparator, hashStruct(message)))`
- `signer = ecrecover(hash, v, r, s)`
