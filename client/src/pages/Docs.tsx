/**
 * Docs — Quick start, MCP configuration, API reference, self-hosting
 * Design: Atmospheric Dark Gallery, developer-focused with code blocks
 * Per CC brief: Quick start (3 steps), MCP config per platform, REST API, self-hosting, GitHub link
 */
import { useState } from 'react';
import { ArrowLeft, Copy, Check, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import Reveal from '@/components/Reveal';
import { usePageTitle } from '@/hooks/usePageTitle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-border/30 group my-4">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/20" style={{ background: 'oklch(0.08 0.004 285)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/40" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
            <div className="w-2 h-2 rounded-full bg-green-500/40" />
          </div>
          {label && (
            <span className="text-[10px] font-mono text-muted-foreground/50 tracking-wider uppercase">{label}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md text-muted-foreground/40 hover:text-muted-foreground hover:bg-primary/5 transition-all"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto" style={{ background: 'oklch(0.06 0.004 285)' }}>
        <pre className="text-xs sm:text-sm font-mono text-foreground/70 leading-relaxed whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

const mcpConfigs = [
  {
    name: 'Claude Desktop',
    config: `{
  "mcpServers": {
    "collab-memory": {
      "command": "uvx",
      "args": [
        "--from", "collab-memory",
        "collab-memory-mcp"
      ],
      "env": {
        "COLLAB_API_URL": "https://your-instance.ohaco.org",
        "COLLAB_API_KEY": "your-api-key"
      }
    }
  }
}`,
  },
  {
    name: 'Cursor',
    config: `{
  "mcpServers": {
    "collab-memory": {
      "command": "uvx",
      "args": [
        "--from", "collab-memory",
        "collab-memory-mcp"
      ],
      "env": {
        "COLLAB_API_URL": "https://your-instance.ohaco.org",
        "COLLAB_API_KEY": "your-api-key"
      }
    }
  }
}`,
  },
  {
    name: 'Windsurf',
    config: `{
  "mcpServers": {
    "collab-memory": {
      "command": "uvx",
      "args": [
        "--from", "collab-memory",
        "collab-memory-mcp"
      ],
      "env": {
        "COLLAB_API_URL": "https://your-instance.ohaco.org",
        "COLLAB_API_KEY": "your-api-key"
      }
    }
  }
}`,
  },
  {
    name: 'Cline',
    config: `{
  "mcpServers": {
    "collab-memory": {
      "command": "uvx",
      "args": [
        "--from", "collab-memory",
        "collab-memory-mcp"
      ],
      "env": {
        "COLLAB_API_URL": "https://your-instance.ohaco.org",
        "COLLAB_API_KEY": "your-api-key"
      }
    }
  }
}`,
  },
];

const apiEndpoints = [
  { method: 'GET', path: '/memory/context', description: 'Retrieve full project context with optional role and time filters' },
  { method: 'POST', path: '/memory/store', description: 'Store a new memory entry (decision, preference, constraint)' },
  { method: 'GET', path: '/memory/search', description: 'Semantic search across stored memories' },
  { method: 'DELETE', path: '/memory/{id}', description: 'Delete a specific memory entry' },
  { method: 'GET', path: '/agent/onboarding', description: 'Get agent capabilities and configuration' },
  { method: 'POST', path: '/agent/register', description: 'Register a new agent in the workspace' },
  { method: 'GET', path: '/health', description: 'Health check endpoint' },
];

export default function Docs() {
  usePageTitle('Documentation');
  const [activeTab, setActiveTab] = useState('quickstart');
  const [activeMCP, setActiveMCP] = useState(0);

  const tabs = [
    { id: 'quickstart', label: 'Quick Start' },
    { id: 'mcp', label: 'MCP Config' },
    { id: 'api', label: 'REST API' },
    { id: 'selfhost', label: 'Self-Hosting' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                Documentation
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Get started with{' '}
              <span className="gradient-text">Semantic Memory</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12">
              From zero to persistent AI memory in under five minutes. Connect any MCP client, self-host with Docker, or use the managed API.
            </p>
          </Reveal>

          {/* Tab navigation */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2 mb-12 border-b border-border/20 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${activeTab === tab.id
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Quick Start */}
          {activeTab === 'quickstart' && (
            <Reveal>
              <div className="space-y-12">
                <div>
                  <h2 className="text-xl font-semibold mb-2 flex items-center gap-3">
                    <span className="text-sm font-mono text-primary/50">01</span>
                    Install the package
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Install collab-memory from PyPI. This gives you both the MCP server and the Python client.
                  </p>
                  <CodeBlock code="pip install collab-memory" label="Terminal" />
                  <p className="text-xs text-muted-foreground/60 mt-2">
                    Or use uvx for isolated execution: <code className="font-mono text-primary/50">uvx --from collab-memory collab-memory-mcp</code>
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2 flex items-center gap-3">
                    <span className="text-sm font-mono text-primary/50">02</span>
                    Configure your MCP client
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add the collab-memory server to your MCP client configuration. See the MCP Config tab for platform-specific examples.
                  </p>
                  <CodeBlock
                    code={`# Set your environment variables
export COLLAB_API_URL="https://your-instance.ohaco.org"
export COLLAB_API_KEY="your-api-key"

# Test the connection
curl -s "$COLLAB_API_URL/health" \\
  -H "X-API-Key: $COLLAB_API_KEY"`}
                    label="Terminal"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2 flex items-center gap-3">
                    <span className="text-sm font-mono text-primary/50">03</span>
                    Start using memory
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your AI agent now has persistent memory. Every decision, preference, and constraint is captured across sessions.
                  </p>
                  <CodeBlock
                    code={`# Query your project context
curl -s "$COLLAB_API_URL/memory/context" \\
  -H "X-API-Key: $COLLAB_API_KEY" \\
  | python3 -m json.tool

# Store a new memory
curl -X POST "$COLLAB_API_URL/memory/store" \\
  -H "X-API-Key: $COLLAB_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"type": "decision", "content": "Use PostgreSQL for persistence"}'`}
                    label="Terminal"
                  />
                </div>

                <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                  <p className="text-sm text-foreground/80">
                    <strong>That's it.</strong> Your AI never starts from zero again. Every session builds on the last.
                    See the <button onClick={() => setActiveTab('api')} className="text-primary hover:underline">REST API reference</button> for the full endpoint list.
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {/* MCP Config */}
          {activeTab === 'mcp' && (
            <Reveal>
              <div>
                <h2 className="text-xl font-semibold mb-6">MCP Client Configuration</h2>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  Add the collab-memory MCP server to your preferred client. Each configuration below is ready to paste — just replace the API URL and key with your own.
                </p>

                {/* Platform tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {mcpConfigs.map((config, i) => (
                    <button
                      key={config.name}
                      onClick={() => setActiveMCP(i)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${activeMCP === i
                          ? 'bg-primary/15 text-primary border border-primary/20'
                          : 'text-muted-foreground hover:text-foreground hover:bg-primary/5 border border-transparent'
                        }`}
                    >
                      {config.name}
                    </button>
                  ))}
                </div>

                <CodeBlock code={mcpConfigs[activeMCP].config} label={`${mcpConfigs[activeMCP].name} — mcp_config.json`} />

                <div className="mt-8 p-6 rounded-xl border border-border/30" style={{ background: 'oklch(0.1 0.006 285 / 40%)' }}>
                  <h3 className="text-sm font-semibold mb-3">Prerequisites</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                      Python 3.10+ installed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                      <code className="font-mono text-xs text-primary/60">uvx</code> or <code className="font-mono text-xs text-primary/60">pip</code> available in PATH
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" />
                      A valid OHACO API key (get one at <a href="/signup" className="text-primary hover:underline">/signup</a>)
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          )}

          {/* REST API */}
          {activeTab === 'api' && (
            <Reveal>
              <div>
                <h2 className="text-xl font-semibold mb-6">REST API Reference</h2>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  All endpoints require the <code className="font-mono text-xs text-primary/60">X-API-Key</code> header.
                  Base URL: <code className="font-mono text-xs text-primary/60">https://your-instance.ohaco.org</code>
                </p>

                <div className="space-y-3">
                  {apiEndpoints.map((endpoint) => (
                    <div
                      key={endpoint.path}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border/20 hover:border-primary/15 transition-colors"
                      style={{ background: 'oklch(0.1 0.006 285 / 30%)' }}
                    >
                      <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md flex-shrink-0 ${endpoint.method === 'GET'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : endpoint.method === 'POST'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                        {endpoint.method}
                      </span>
                      <div>
                        <code className="text-sm font-mono text-foreground/80">{endpoint.path}</code>
                        <p className="text-xs text-muted-foreground mt-1">{endpoint.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="https://github.com/OHACO-LABS/collab-memory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Full API docs on GitHub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>
          )}

          {/* Self-Hosting */}
          {activeTab === 'selfhost' && (
            <Reveal>
              <div className="space-y-12">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Self-Hosting with Docker Compose</h2>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Collab-memory's core is MIT-licensed. Run your own instance with a single command.
                  </p>

                  <CodeBlock
                    code={`# Clone the repository
git clone https://github.com/OHACO-LABS/collab-memory.git
cd collab-memory

# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
# - Set your database credentials
# - Configure your LLM provider (optional)
# - Set your API key

# Start the services
docker compose up -d`}
                    label="Terminal"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Architecture</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { name: 'API Server', desc: 'FastAPI application handling all REST and MCP endpoints' },
                      { name: 'PostgreSQL', desc: 'Primary data store for memories, agents, and workspaces' },
                      { name: 'Neo4j (optional)', desc: 'Graph database for relationship-aware memory queries' },
                    ].map((service) => (
                      <div
                        key={service.name}
                        className="p-4 rounded-xl border border-border/20"
                        style={{ background: 'oklch(0.1 0.006 285 / 30%)' }}
                      >
                        <h4 className="text-sm font-semibold mb-1">{service.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                  <p className="text-sm text-foreground/80">
                    <strong>Need help?</strong> Join the community on GitHub Discussions or reach out at{' '}
                    <a href="mailto:hello@ohaco.org" className="text-primary hover:underline">hello@ohaco.org</a>.
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
