import fs from 'fs';
import path from 'path';

export default function Home() {
  // Read state files at build time
  const dataDir = path.join(process.cwd(), 'state');
  
  let portfolio = { summary: { totalValue: 0, dailyPnL: 0 } };
  let market = { riskScore: 0, regime: 'unknown', opportunities: [] };
  let attestations = { stats: { total: 0, verified: 0 } };
  
  try {
    portfolio = JSON.parse(fs.readFileSync(path.join(dataDir, 'portfolio.json'), 'utf8'));
    market = JSON.parse(fs.readFileSync(path.join(dataDir, 'market.json'), 'utf8'));
    attestations = JSON.parse(fs.readFileSync(path.join(dataDir, 'attestations.json'), 'utf8'));
  } catch (e) {
    // State files may not exist yet
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: '#fff',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '0.5rem',
            background: 'linear-gradient(90deg, #f72585, #7209b7, #3a0ca3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🦅 Veritas-Trade OS
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Verifiable, Multi-Chain AI Trading Orchestration Platform
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.5rem' }}>
            LabLab AI Trading Agents Hackathon • March 30 - April 12, 2026
          </p>
        </header>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <StatCard 
            title="Portfolio Value" 
            value={`$${portfolio.summary.totalValue.toLocaleString()}`}
            subtitle={`${portfolio.summary.dailyPnL >= 0 ? '+' : ''}$${portfolio.summary.dailyPnL} today`}
            color="#4cc9f0"
          />
          <StatCard 
            title="Risk Score" 
            value={market.riskScore.toString()}
            subtitle={`Regime: ${market.regime}`}
            color={market.riskScore < 30 ? '#4ade80' : market.riskScore < 60 ? '#fbbf24' : '#ef4444'}
          />
          <StatCard 
            title="Attestations" 
            value={attestations.stats.total.toString()}
            subtitle={`${attestations.stats.verified} verified on-chain`}
            color="#a78bfa"
          />
          <StatCard 
            title="Opportunities" 
            value={market.opportunities?.length?.toString() || '0'}
            subtitle="Active trading signals"
            color="#f472b6"
          />
        </div>

        {/* Agent Status */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Agent Status</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            <AgentCard 
              name="Sentry" 
              role="Market Monitor"
              model="gemini-2.5-pro"
              status="Active"
              description="Monitors Kraken & Aerodrome liquidity, detects opportunities"
            />
            <AgentCard 
              name="Executioner" 
              role="Trade Runner"
              model="gemini-2.5-flash-lite"
              status="Ready"
              description="Executes trades via Kraken CLI, manages positions"
            />
            <AgentCard 
              name="Auditor" 
              role="Trust Layer"
              model="gemini-2.5-pro"
              status="Ready"
              description="Signs EIP-712 intents, publishes to ERC-8004 registry"
            />
          </div>
        </section>

        {/* Prize Targets */}
        <section style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🏆 Prize Targets</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <PrizeRow name="Best Trustless Trading Agent" amount="$10,000" />
            <PrizeRow name="Best Risk-Adjusted Return" amount="$5,000" />
            <PrizeRow name="Best Validation & Trust Model" amount="$2,500" />
            <PrizeRow name="Social Engagement (1st)" amount="$1,200" />
            <PrizeRow name="Kraken PnL (1st)" amount="$1,800" />
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
          <p>
            <a href="https://github.com/madezmedia/veritas-trade-os" 
               style={{ color: '#4cc9f0' }}>
              GitHub
            </a>
            {' • '}
            <a href="https://lablab.ai" style={{ color: '#4cc9f0' }}>LabLab.ai</a>
            {' • '}
            <span>Hunt deals. Close deals. Verify everything. 🦅</span>
          </p>
        </footer>
      </div>
    </main>
  );
}

function StatCard({ title, value, subtitle, color }: { title: string; value: string; subtitle: string; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '1rem',
      padding: '1.5rem',
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.5rem' }}>{title}</div>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.25rem' }}>{subtitle}</div>
    </div>
  );
}

function AgentCard({ name, role, model, status, description }: { 
  name: string; role: string; model: string; status: string; description: string 
}) {
  const statusColor = status === 'Active' ? '#4ade80' : '#fbbf24';
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)',
      borderRadius: '1rem',
      padding: '1.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{name}</span>
        <span style={{
          background: statusColor,
          color: '#000',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}>{status}</span>
      </div>
      <div style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.5rem' }}>{role}</div>
      <div style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '0.75rem' }}>{model}</div>
      <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{description}</div>
    </div>
  );
}

function PrizeRow({ name, amount }: { name: string; amount: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>{name}</span>
      <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{amount}</span>
    </div>
  );
}
