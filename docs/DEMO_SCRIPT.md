# Veritas-Trade OS — 60-Second Demo Script

> 🎬 For Product Demo Video

---

## Pre-Recording Setup

**Terminal:**
- Clear terminal (Cmd+K)
- Increase font size (Cmd++ x3)
- Dark mode enabled
- Working directory: `~/veritas-trade-os`

**Browser:**
- Open https://veritas-trade-os.vercel.app
- Open Base Sepolia explorer (example attestation)
- Open GitHub repo

**Audio:**
- Clear microphone
- Quiet environment
- Enthusiastic but professional tone

---

## Script (60 seconds)

### [0:00-0:05] Hook

**[ON SCREEN: Terminal with Veritas-Trade OS ASCII logo]**

> "What if every AI trade came with a signed, on-chain explanation of *why* it traded?"

---

### [0:05-0:15] Problem

**[ON SCREEN: Screenshot of black-box trading bot UI]**

> "Right now, $2.1 trillion is traded by AI agents every day — and zero of those trades are verifiable. Institutions won't touch black boxes."

---

### [0:15-0:30] Solution

**[ON SCREEN: Terminal showing OpenClaw agent running]**

```bash
cd ~/veritas-trade-os
openclaw skill sentry scan
```

> "We built Veritas-Trade OS — a three-agent system that doesn't just trade, but *proves* every decision."

**[Show Sentry output with opportunities]**

> "Sentry monitors Kraken and Aerodrome 24/7, detecting opportunities and calculating risk scores."

---

### [0:30-0:45] Execution + Audit

**[ON SCREEN: Executioner running a trade]**

```bash
openclaw skill executioner execute opp_001
```

> "Executioner routes the trade through Kraken CLI with risk limits enforced."

**[ON SCREEN: Auditor generating attestation]**

```bash
openclaw skill auditor attest trade_001
```

> "Then Auditor signs the trade intent with EIP-712 and publishes it to the ERC-8004 registry on Base."

---

### [0:45-0:55] Verification

**[ON SCREEN: Browser showing Base Sepolia explorer]**

> "Now anyone can verify this trade on-chain — the rationale, the risk score, the exact market conditions."

**[Show live dashboard]**

> "Our dashboard shows portfolio status, risk scores, and all attestations in real-time."

---

### [0:55-0:60] Call to Action

**[ON SCREEN: GitHub repo + dashboard URL]**

> "We're building the trust layer for AI trading. Check out the repo, try the demo, and let's make every trade verifiable."

**[Logo + URLs]**

> "Veritas-Trade OS. Hunt deals. Close deals. Verify everything. 🦅"

---

## Post-Production Notes

**B-Roll Ideas:**
- Screen recording of actual agent execution
- Animated architecture diagram
- Base Sepolia explorer showing real attestation
- Dashboard with live data

**Music:**
- Upbeat, tech-forward instrumental
- Volume: Low background, duck under voiceover

**Text Overlays:**
- Key stats ($2.1T daily volume)
- URLs (veritas-trade-os.vercel.app)
- Logo watermark throughout

**Duration:**
- Keep tight to 60 seconds
- Can extend to 90 seconds for social engagement prize

---

## Alternative: 30-Second Teaser

**[0:00-0:10]**  
> "AI trades $2.1 trillion daily. Zero of it is verifiable."

**[0:10-0:20]**  
> "Veritas-Trade OS: Every trade explained, signed, and published on-chain."

**[0:20-0:30]**  
> "The trust layer for AI trading. 🦅 Demo link in bio."

---

## Alternative: 2-Minute Deep-Dive

**Add after 0:45:**

### [0:45-1:15] Architecture Deep-Dive

**[ON SCREEN: Architecture diagram]**

> "Here's how it works. Three specialized agents coordinate through a shared state layer..."

> "Sentry uses Gemini Pro for deep market analysis..."

> "Executioner runs on Flash Lite for sub-second response times..."

> "Auditor generates natural language rationales and signs them cryptographically..."

### [1:15-1:45] Live Demo

**[ON SCREEN: Full terminal workflow]**

> "Let me show you a complete trade cycle..."

**[Run full workflow: scan → execute → attest → verify]**

### [1:45-2:00] Vision

> "We're not just building a bot. We're building the infrastructure other bots rely on for trust. Join us."

---

_🦅 Ready to record? Let's make every trade verifiable._