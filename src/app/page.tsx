// src/app/page.tsx — High-Converting Premium Landing Page
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight, CheckCircle2, Zap, Code, Cloud, TrendingUp,
  Bot, Building2, Search, Users, Star, Clock, ShieldCheck,
  ChevronRight, Sparkles, Terminal, Cpu, ArrowUpRight
} from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Automation & Workflow Engineering',
    tag: 'Next-Gen AI',
    desc: 'Automate high-friction operations, repetitive data extraction, and support triage with intelligent multi-agent AI pipelines.',
    color: 'from-cyan-500/10 to-blue-500/10',
    iconColor: 'text-cyan-600',
    borderColor: 'hover:border-cyan-400/80',
  },
  {
    icon: Code,
    title: 'Custom Software Development',
    tag: 'Full-Stack Engineering',
    desc: 'Production-ready web, microservices, and specialized software tailored precisely to complex corporate workflows.',
    color: 'from-blue-500/10 to-indigo-500/10',
    iconColor: 'text-blue-600',
    borderColor: 'hover:border-blue-400/80',
  },
  {
    icon: Zap,
    title: 'Web & Mobile Application Development',
    tag: 'Modern UI/UX',
    desc: 'High-speed React, Next.js, Flutter, and native mobile apps designed for scalable growth and exceptional customer retention.',
    color: 'from-sky-500/10 to-cyan-500/10',
    iconColor: 'text-sky-600',
    borderColor: 'hover:border-sky-400/80',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & Migration',
    tag: 'DevOps & Reliability',
    desc: 'Zero-downtime cloud migration, Kubernetes orchestration, cost optimization, and multi-region resilience on AWS & Azure.',
    color: 'from-indigo-500/10 to-violet-500/10',
    iconColor: 'text-indigo-600',
    borderColor: 'hover:border-indigo-400/80',
  },
  {
    icon: TrendingUp,
    title: 'Technical SEO & Digital Growth',
    tag: 'Organic Scale',
    desc: 'Core Web Vitals acceleration, programmatic SEO engines, and conversion funnel optimization that generate measurable pipeline.',
    color: 'from-emerald-500/10 to-teal-500/10',
    iconColor: 'text-emerald-600',
    borderColor: 'hover:border-emerald-400/80',
  },
  {
    icon: Building2,
    title: 'Enterprise Software Solutions',
    tag: 'Enterprise Scalability',
    desc: 'Mission-critical ERP, CRM integrations, and data compliance platforms engineered for high throughput and security.',
    color: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-600',
    borderColor: 'hover:border-amber-400/80',
  },
];

const steps = [
  {
    num: '01',
    title: 'Define Strategic Goals',
    desc: 'Select your target business objectives, system scope, and existing infrastructure.',
  },
  {
    num: '02',
    title: 'Detail Scope & Timeline',
    desc: 'Input functional requirements, timeline requirements, and budget brackets.',
  },
  {
    num: '03',
    title: 'AI-Guided Matching',
    desc: 'Our deterministic scoring engine analyzes criteria to recommend the ideal Cynbit domain team.',
  },
  {
    num: '04',
    title: 'Instant Tracking Key',
    desc: 'Receive a guaranteed unique reference ID (e.g. CYN-2026-XXXXXXX) to monitor review status in real time.',
  },
];

const proofMetrics = [
  { value: '< 2 mins', label: 'Average Discovery Time' },
  { value: '100%', label: 'Deterministic Scoring' },
  { value: '24 hrs', label: 'Priority Triage SLA' },
  { value: 'End-to-End', label: 'Client Tracking Pipeline' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-cyan-500/20 selection:text-cyan-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden bg-slate-950 text-white">
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
            diagnoses your project needs and instantly aligns you with the right engineering team.
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
              <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-black text-white mb-1 font-mono">{item.value}</div>
                <div className="text-xs text-slate-400 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 px-4 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Our Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Explore Cynbit&apos;s Engineering Domains
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
                  className={`group relative bg-white p-7 rounded-2xl border border-slate-200/90 card-hover ${svc.borderColor} transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center ${svc.iconColor} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/60">
                        {svc.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-cyan-600 transition-colors">
                      {svc.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {svc.desc}
                    </p>
                  </div>

                  <Link
                    href={`/discovery`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-cyan-600 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Request Discovery for this Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Workflow Overview</h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
              From Inquiry to Engineering Execution
            </h3>
            <p className="text-slate-600 text-sm">
              Our structured discovery workflow eliminates ambiguity and guarantees rapid technical alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div key={i} className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200/80 card-hover">
                <div className="text-3xl font-black font-mono text-slate-300 mb-4">{st.num}</div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cynbit Banner */}
      <section className="py-20 px-4 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 dark-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-widest mb-2 block">
                Enterprise Standards
              </span>
              <h3 className="text-3xl font-extrabold tracking-tight mb-4 leading-snug">
                Why Industry Leaders Choose Cynbit
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                We combine deep engineering discipline with agile speed, giving you enterprise-grade code that scales.
              </p>
              <Link
                href="/discovery"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
              >
                Start an evaluation now →
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Zero Compromise Security', desc: 'Secure architecture, enterprise access controls, and data privacy baked in by default.' },
                { title: 'Full Technical Transparency', desc: 'Real-time enquiry tracking with unique reference IDs and direct technical status updates.' },
                { title: 'Proven Architecture', desc: 'Modular components built on Next.js 15, cloud-native deployments, and scalable database schemas.' },
                { title: 'Rapid Prototype Delivery', desc: 'Transform complex requirements into functional, interactive prototypes in days, not months.' },
              ].map((adv, i) => (
                <div key={i} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <h4 className="text-sm font-bold text-white">{adv.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 text-white text-center relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Accelerate Your Technology Journey?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
            Take 2 minutes to complete the guided discovery questionnaire and receive an immediate service diagnosis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/discovery"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
            >
              Begin Guided Discovery →
            </Link>
            <a
              href="https://www.cynbit.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-700/80"
            >
              Explore Official Cynbit.in
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
