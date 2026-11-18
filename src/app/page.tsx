// src/app/page.tsx — Landing Page
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight, CheckCircle, Zap, Code, Cloud, TrendingUp,
  Bot, Building2, Search, Users, Star, Clock, Shield
} from 'lucide-react';

const services = [
  { icon: Bot, title: 'AI Automation & Workflow Engineering', desc: 'Automate repetitive tasks and processes with intelligent AI-powered workflows.' },
  { icon: Code, title: 'Custom Software Development', desc: 'Bespoke software solutions tailored precisely to your business requirements.' },
  { icon: Zap, title: 'Web & Mobile Application Development', desc: 'Modern, responsive web and mobile apps built for performance and scale.' },
  { icon: Cloud, title: 'Cloud Infrastructure & Migration', desc: 'Seamless cloud adoption, migration, and optimization services.' },
  { icon: TrendingUp, title: 'Technical SEO & Digital Growth', desc: 'Data-driven strategies to improve your online visibility and conversions.' },
  { icon: Building2, title: 'Enterprise Software Solutions', desc: 'Robust enterprise-grade platforms designed for complex business operations.' },
];

const steps = [
  { step: '01', title: 'Describe Your Goal', desc: 'Tell us what you want to build or improve.' },
  { step: '02', title: 'Share Your Details', desc: 'Provide business context, budget, and timeline.' },
  { step: '03', title: 'Get Recommendations', desc: 'Our system recommends the right Cynbit service.' },
  { step: '04', title: 'Submit & Track', desc: 'Receive a unique reference ID and track your enquiry.' },
];

const benefits = [
  { icon: Clock, title: 'Save Time', desc: 'Get a service recommendation in minutes, not days.' },
  { icon: Users, title: 'Expert Matching', desc: 'Matched to the right Cynbit team for your project.' },
  { icon: Star, title: 'Quality First', desc: 'Cynbit delivers excellence across every project.' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your data is handled with complete confidentiality.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 80% 20%, #38bdf8 0%, transparent 40%)' }} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#38bdf8] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/20">
            <Zap className="w-3 h-3" />
            Intelligent Project Discovery System
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Let&apos;s Build Something<br />
            <span className="text-[#0ea5e9]">Exceptional Together.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your vision. Our intelligent project discovery system will help identify
            the right technology solutions for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/discovery"
              className="inline-flex items-center gap-2 bg-[#0ea5e9] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0284c7] transition-all shadow-lg shadow-blue-500/30 text-base"
            >
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20 text-base"
            >
              <Search className="w-5 h-5" /> Track Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Our guided discovery process makes it easy to submit your project requirements in just a few minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl font-black text-gray-100 mb-3">{step}</div>
                <h3 className="font-bold text-[#1a1a2e] mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">Our Service Categories</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Cynbit Technologies offers a comprehensive range of digital and technology services.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#0ea5e9] hover:shadow-lg transition-all">
                <div className="w-11 h-11 bg-[#f0f9ff] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0ea5e9] transition-colors">
                  <Icon className="w-5 h-5 text-[#0ea5e9] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-2 text-sm">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-[#1a1a2e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Why Cynbit Smart Discovery?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">We make the first step of your technology journey as smooth as possible.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="w-12 h-12 bg-[#0ea5e9]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#0ea5e9]" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg">Submit your project enquiry today and receive a personalised service recommendation from Cynbit.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/discovery"
              className="inline-flex items-center gap-2 bg-white text-[#0ea5e9] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all shadow-lg text-base"
            >
              Start Discovery <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://www.cynbit.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/30 text-base"
            >
              Visit Cynbit.in
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {['No commitment required', 'Instant recommendation', 'Secure & confidential'].map(item => (
              <div key={item} className="flex items-center gap-2 text-blue-100 text-sm">
                <CheckCircle className="w-4 h-4" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
