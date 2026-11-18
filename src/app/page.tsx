// src/app/page.tsx — High-Converting Premium Landing Page (Dark SaaS Studio)
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight, CheckCircle2, Zap, Code, Cloud, TrendingUp,
  Bot, Building2, Search, Target, Sliders, ChevronRight,
  Sparkles, Terminal, Cpu, ArrowUpRight, ShieldCheck, Clock
} from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Automation & Workflow Engineering',
    tag: 'Next-Gen AI',
    desc: 'Automate high-friction operations, repetitive data extraction, and support triage with intelligent multi-agent AI pipelines.',
    color: 'from-cyan-500/10 to-blue-500/10',
    iconColor: 'text-cyan-400',
    borderColor: 'group-hover:border-cyan-500/60',
  },
  {
    icon: Code,
    title: 'Custom Software Development',
    tag: 'Full-Stack Engineering',
    desc: 'Production-ready web, microservices, and specialized software tailored precisely to complex corporate workflows.',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-sky-400',
    borderColor: 'group-hover:border-sky-500/60',
  },
  {
    icon: Zap,
    title: 'Web & Mobile Application Development',
    tag: 'Modern UI/UX',
    desc: 'High-speed React, Next.js, Flutter, and native mobile apps designed for scalable growth and exceptional customer retention.',
    color: 'from-sky-500/10 to-cyan-500/10',
    iconColor: 'text-cyan-300',
    borderColor: 'group-hover:border-cyan-400/60',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & Migration',
    tag: 'DevOps & Reliability',
    desc: 'Zero-downtime cloud migration, Kubernetes orchestration, cost optimization, and multi-region resilience on AWS & Azure.',
    color: 'from-indigo-500/10 to-violet-500/10',
    iconColor: 'text-indigo-400',
    borderColor: 'group-hover:border-indigo-500/60',
  },
  {
    icon: TrendingUp,
    title: 'Technical SEO & Digital Growth',
    tag: 'Organic Scale',
    desc: 'Core Web Vitals acceleration, programmatic SEO engines, and conversion funnel optimization that generate measurable pipeline.',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-400',
    borderColor: 'group-hover:border-emerald-500/60',
  },
  {
    icon: Building2,
    title: 'Enterprise Software Solutions',
    tag: 'Enterprise Scalability',
    desc: 'Mission-critical ERP, CRM integrations, and data compliance platforms engineered for high throughput and security.',
    color: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-400',
    borderColor: 'group-hover:border-amber-500/60',
  },
];

const steps = [
  {
    num: '01',
    icon: Target,
    title: 'Define Strategic Goals',
    desc: 'Select your target business objectives, enterprise scope, and existing infrastructure constraints.',
  },
  {
    num: '02',
    icon: Sliders,
    title: 'Detail Scope & Timeline',
    desc: 'Input core functional requirements, delivery deadlines, and realistic budget allocations.',
  },
  {
    num: '03',
    icon: Cpu,
    title: 'Deterministic Diagnosis',
    desc: 'Our scoring engine evaluates parameters to match you with the optimal Cynbit engineering domain squad.',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'Instant Reference Key',
    desc: 'Receive a guaranteed unique reference code (CYN-2026-XXXXXXX) to monitor review status in real time.',
  },
];

const proofMetrics = [
  { value: '< 2 mins', label: 'Average Discovery Time' },
  { value: '100%', label: 'Deterministic Scoring' },
  { value: '24 hrs', label: 'Priority Triage SLA' },
  { value: 'End-to-End', label: 'Live Lifecycle Tracking' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 overflow-hidden bg-slate-950 text-white">
        {/* Glow backdrop */}
        <div className="absolute inset-0 hero-glow-dark pointer-events-none" />
        <div className="absolute inset-0 dark-grid-pattern opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-inner mb-8">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Cynbit Technologies — Smart Project Discovery</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Let&apos;s Build Something <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Exceptional Together.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Tell us about your technical requirements and vision. Our intelligent discovery studio
            diagnoses your project scope and instantly aligns you with the right engineering team.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <Link
              href="/discovery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:opacity-95 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Start Project Discovery</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>

            <Link
              href="/track"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Track Existing Enquiry</span>
            </Link>
          </div>

          {/* Metrics ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-900/90 text-left">
            {proofMetrics.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/70 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-white mb-1 font-mono">{item.value}</div>
                <div className="text-xs text-slate-400 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section: Explore Cynbit's Engineering Domains */}
      <section className="py-24 px-4 bg-slate-950 relative border-t border-slate-850 overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dark-grid-pattern opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span>Full-Stack Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              Explore Cynbit&apos;s Engineering Domains
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From automated cognitive workflows to high-scale enterprise platforms, we deploy specialized squads 
              ready to accelerate your digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className={`group relative bg-slate-900/60 backdrop-blur-md p-7 rounded-2xl border border-slate-800 ${svc.borderColor} hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-cyan-400 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center group-hover:scale-105 group-hover:border-cyan-500/40 transition-all shadow-inner">
                        <Icon className={`w-6 h-6 ${svc.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                        {svc.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                      {svc.desc}
                    </p>
                  </div>

                  <Link
                    href={`/discovery`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Request Discovery for this Domain</span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow Section: From Inquiry to Engineering Execution */}
      <section className="py-24 px-4 bg-slate-950 relative border-t border-slate-850 overflow-hidden">
        <div className="absolute inset-0 dark-grid-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span>Standardized Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              From Inquiry to Engineering Execution
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Our structured discovery workflow eliminates ambiguity and guarantees rapid technical alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => {
              const StepIcon = st.icon;
              return (
                <div
                  key={i}
                  className="relative bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors">
                        {st.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                        <StepIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Phase 0{i + 1}</span>
                    <span className="text-cyan-500/60 font-bold">● Active</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Cynbit Banner */}
      <section className="py-20 px-4 bg-slate-900/50 text-white relative overflow-hidden border-t border-slate-850">
        <div className="absolute inset-0 dark-grid-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider mb-2 block">
                Enterprise Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4 leading-snug">
                Why Industry Leaders Choose Cynbit
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                We combine deep engineering discipline with agile speed, giving you enterprise-grade software that scales effortlessly.
              </p>
              <Link
                href="/discovery"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 group"
              >
                <span>Start a discovery evaluation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Zero Compromise Security', desc: 'Secure architecture, enterprise access controls, and data privacy baked in by default.' },
                { title: 'Full Technical Transparency', desc: 'Real-time enquiry tracking with unique reference IDs and direct technical status updates.' },
                { title: 'Proven Modern Architecture', desc: 'Modular components built on Next.js 16, cloud-native deployments, and indexed MongoDB clusters.' },
                { title: 'Rapid Prototype Delivery', desc: 'Transform complex requirements into functional, interactive prototypes in days, not months.' },
              ].map((adv, i) => (
                <div key={i} className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <h3 className="text-sm font-bold text-white">{adv.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-slate-900 text-white text-center relative border-t border-slate-800">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Deployment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Accelerate Your Engineering Roadmap Today
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            Take 2 minutes to complete our guided discovery questionnaire and receive an instant technical squad diagnosis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/discovery"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:opacity-95 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Begin Guided Discovery</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
            <a
              href="https://www.cynbit.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-850 hover:border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Official Cynbit.in</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
