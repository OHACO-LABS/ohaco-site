/**
 * Investors Page — Inquiry-only positioning with NCNDA gate
 * Design: Atmospheric Dark Gallery, professional but understated
 * NJ-governed NCNDA, global applicability
 * No materials exposed yet — inquiry is the action
 */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2, FileText, Shield, Globe, Clock } from 'lucide-react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import Reveal from '@/components/Reveal';
import { usePageTitle } from '@/hooks/usePageTitle';

const NCNDA_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663075749204/amstX3XdXJM3AMGdoXYXU5/ohaco-ncnda-v1_c677719c.pdf';

type InquiryStep = 'info' | 'form' | 'submitting' | 'success';

const thesisPoints = [
  {
    icon: Globe,
    title: 'Data as Capital',
    text: 'A new economic model where the value of data flows back to the people who create it — not the platforms that extract it.',
  },
  {
    icon: Shield,
    title: 'Privacy-First Architecture',
    text: 'Zero-knowledge infrastructure that makes consent the default. Better data through voluntary contribution, not surveillance.',
  },
  {
    icon: Clock,
    title: 'Time-Value Compounding',
    text: 'Systems designed to increase efficiency over time. The knowledge market gives back time, energy, and compute demand.',
  },
];

export default function Investors() {
  usePageTitle('Investors');
  const [step, setStep] = useState<InquiryStep>('info');
  const [ncndaAccepted, setNcndaAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    interest: '',
    message: '',
  });
  const formRef = useRef<HTMLDivElement>(null);

  const handleProceed = () => {
    if (ncndaAccepted) {
      setStep('form');
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.organization) return;

    setStep('submitting');

    // Simulate submission — in production this would POST to an API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStep('success');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to home
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
                Investor Relations
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 max-w-3xl">
              Building the infrastructure for a{' '}
              <span className="gradient-text">sovereign creative economy</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-16">
              OHACO Labs is an OpenCore technology collective developing AI-assisted creative infrastructure. We are currently accepting investor inquiries for our next phase of growth.
            </p>
          </Reveal>

          {/* Thesis highlights for investors */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {thesisPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <Reveal key={point.title} delay={0.15 + i * 0.08}>
                  <div className="group p-6 rounded-2xl border border-border/30 hover:border-primary/20 transition-all duration-500"
                    style={{
                      background: 'oklch(0.09 0.005 285 / 50%)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <div className="p-2.5 rounded-lg bg-primary/8 border border-primary/10 w-fit mb-4 group-hover:bg-primary/12 transition-all duration-500">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Market context */}
          <Reveal delay={0.2}>
            <div className="mb-20">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">The Opportunity</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border/20" style={{ background: 'oklch(0.09 0.005 285 / 40%)' }}>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The global AI market is projected to exceed $1.8 trillion by 2030. Within that, the data infrastructure layer — where OHACO operates — represents the fastest-growing segment. As AI models commoditize, the value shifts to data quality, provenance, and consent architecture.
                  </p>
                </div>
                <div className="p-6 rounded-2xl border border-border/20" style={{ background: 'oklch(0.09 0.005 285 / 40%)' }}>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    OHACO's opt-in data marketplace model creates a new category: ethical data infrastructure that produces better outcomes precisely because it respects contributor sovereignty. Early traction includes a live Semantic Memory product, MCP Adapter on PyPI, and a growing OpenCore community.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* NCNDA + Inquiry flow */}
          <div ref={formRef}>
            <Reveal delay={0.1}>
              <div className="arch-line mb-12 mx-auto max-w-xl" />
            </Reveal>

            <AnimatePresence mode="wait">
              {/* Step 1: NCNDA acknowledgment */}
              {step === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Reveal delay={0.1}>
                    <div className="max-w-2xl mx-auto">
                      <div className="flex items-center gap-3 mb-6">
                        <FileText className="w-5 h-5 text-primary/60" />
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                          Before We Begin
                        </h2>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-8">
                        To protect the interests of our collective, contributors, and partners, we require all investor inquiries to acknowledge our Non-Circumvention and Non-Disclosure Agreement (NCNDA) before proceeding.
                      </p>

                      {/* NCNDA summary card */}
                      <div className="p-6 rounded-2xl border border-border/30 mb-8"
                        style={{ background: 'oklch(0.1 0.006 285 / 60%)', backdropFilter: 'blur(12px)' }}
                      >
                        <h3 className="text-sm font-semibold text-foreground mb-4">NCNDA Summary</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                            <span>All disclosed information is confidential and may not be shared with third parties</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                            <span>Non-circumvention obligations apply for 24 months regarding introduced contacts and opportunities</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                            <span>Software-specific protections covering source code, architecture, and proprietary methodologies</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                            <span>Governed by the laws of New Jersey, USA, with international applicability provisions</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                            <span>MIT-licensed core code is explicitly excluded from these restrictions</span>
                          </li>
                        </ul>

                        <a
                          href={NCNDA_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-6 text-xs font-mono text-primary/70 hover:text-primary transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Read the full NCNDA (PDF)
                        </a>
                      </div>

                      {/* Checkbox + proceed */}
                      <div className="space-y-6">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative mt-0.5">
                            <input
                              type="checkbox"
                              checked={ncndaAccepted}
                              onChange={(e) => setNcndaAccepted(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${ncndaAccepted
                                ? 'bg-primary border-primary'
                                : 'border-border/60 group-hover:border-primary/40'
                              }`}>
                              {ncndaAccepted && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            I have read and agree to the terms of the OHACO Labs Non-Circumvention and Non-Disclosure Agreement. I understand that all information disclosed during the inquiry process is confidential.
                          </span>
                        </label>

                        <button
                          onClick={handleProceed}
                          disabled={!ncndaAccepted}
                          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,92,231,0.3)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
                        >
                          <span>Proceed to Inquiry</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </Reveal>
                </motion.div>
              )}

              {/* Step 2: Inquiry form */}
              {(step === 'form' || step === 'submitting') && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                      Investor Inquiry
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8">
                      All fields marked with * are required. We respond to all inquiries within 5 business days.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-mono text-muted-foreground/70 tracking-wider uppercase mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            required
                            disabled={step === 'submitting'}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50"
                            placeholder="Jane Smith"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-mono text-muted-foreground/70 tracking-wider uppercase mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            required
                            disabled={step === 'submitting'}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50"
                            placeholder="jane@fund.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Organization */}
                        <div>
                          <label className="block text-xs font-mono text-muted-foreground/70 tracking-wider uppercase mb-2">
                            Organization *
                          </label>
                          <input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => updateField('organization', e.target.value)}
                            required
                            disabled={step === 'submitting'}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50"
                            placeholder="Venture Partners LLC"
                          />
                        </div>

                        {/* Role */}
                        <div>
                          <label className="block text-xs font-mono text-muted-foreground/70 tracking-wider uppercase mb-2">
                            Role / Title
                          </label>
                          <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => updateField('role', e.target.value)}
                            disabled={step === 'submitting'}
                            className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50"
                            placeholder="Managing Partner"
                          />
                        </div>
                      </div>

                      {/* Interest area */}
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground/70 tracking-wider uppercase mb-2">
                          Area of Interest
                        </label>
                        <select
                          value={formData.interest}
                          onChange={(e) => updateField('interest', e.target.value)}
                          disabled={step === 'submitting'}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50 appearance-none"
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M3 4.5L6 7.5L9 4.5\' stroke=\'%236c5ce7\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                        >
                          <option value="">Select an area...</option>
                          <option value="seed">Seed Investment</option>
                          <option value="series-a">Series A</option>
                          <option value="strategic">Strategic Partnership</option>
                          <option value="advisory">Advisory Role</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-mono text-muted-foreground/70 tracking-wider uppercase mb-2">
                          Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          disabled={step === 'submitting'}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 text-sm disabled:opacity-50 resize-none"
                          placeholder="Tell us about your interest in OHACO..."
                        />
                      </div>

                      {/* NCNDA reminder */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground/50 font-mono">
                        <Shield className="w-3 h-3" />
                        <span>Protected under NCNDA v1.0 · NJ, USA</span>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={step === 'submitting' || !formData.name || !formData.email || !formData.organization}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,92,231,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {step === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Inquiry</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep('info')}
                        className="block mt-2 text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                      >
                        ← Back to NCNDA
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-lg mx-auto text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-7 h-7 text-emerald-400" />
                  </motion.div>

                  <h2 className="text-2xl font-bold tracking-tight mb-3">
                    Inquiry Received
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Thank you for your interest in OHACO Labs. Your inquiry has been submitted under the terms of our NCNDA.
                  </p>
                  <p className="text-sm text-muted-foreground/60 mb-8">
                    We will respond to <span className="font-mono text-primary/70">{formData.email}</span> within 5 business days.
                  </p>

                  <div className="h-px w-20 bg-primary/20 mx-auto mb-8" />

                  <p className="text-xs text-muted-foreground/40 font-mono">
                    NCNDA v1.0 · Governed by the laws of New Jersey, USA
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
