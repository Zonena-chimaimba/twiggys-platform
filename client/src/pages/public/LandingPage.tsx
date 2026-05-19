import { useState } from 'react'
import {
  ChevronDown,
  MessageCircle,
  Instagram,
  CheckCircle2,
  Phone,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { PaymentMethodCard, PAYMENT_METHODS } from '@/components/public/PaymentMethodCard'
import { OrderForm } from '@/components/public/OrderForm'

// ─── Success confirmation ─────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-pink/5 blur-[120px]" />
      </div>

      <div className="relative text-center max-w-md animate-fade-up">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-brand-pink/10 border border-brand-pink/25 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={38} className="text-brand-pink" />
        </div>

        <h2 className="font-display text-4xl text-brand-white font-light mb-3">
          Order Received
        </h2>
        <p className="font-body text-brand-white/50 leading-relaxed mb-8">
          Thank you! We've received your submission and will review your payment proof
          shortly. We'll reach out via WhatsApp to confirm your order.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/27673216782"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-body font-medium py-3.5 px-6 rounded-full hover:bg-[#1ebe57] transition-colors"
          >
            <MessageCircle size={17} />
            Follow up on WhatsApp
          </a>
          <button
            onClick={onReset}
            className="font-body text-brand-white/35 hover:text-brand-pink text-sm transition-colors"
          >
            Submit another order
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return <SuccessState onReset={() => setSubmitted(false)} />
  }

  return (
    <div className="min-h-screen bg-brand-black font-body text-brand-white">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-20 overflow-hidden">

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-pink/[0.04] blur-[140px] pointer-events-none" />

        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent" />

        {/* Logo */}
        <div className="animate-fade-up mb-8" style={{ animationDelay: '0s' }}>
          <img
            src="/logo.jpg"
            alt="Twiggy & Sithe's Online Shopping"
            className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>

        {/* Headline */}
        <div className="animate-fade-up text-center mb-5" style={{ animationDelay: '0.1s' }}>
          <p className="font-script text-brand-pink text-xl md:text-2xl mb-3 tracking-wide">
            South Africa to Malawi
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-brand-white tracking-tight leading-none">
            Twiggy &amp; Sithe's
          </h1>
          <p className="font-body text-brand-white/35 tracking-[0.35em] text-xs uppercase mt-4">
            Online Shopping
          </p>
        </div>

        {/* Tagline */}
        <p
          className="animate-fade-up font-display italic text-brand-white/35 text-lg md:text-xl text-center max-w-lg mt-3 mb-10 leading-relaxed"
          style={{ animationDelay: '0.2s' }}
        >
          True prestige is revealed through uncompromising choices
          and unparalleled quality.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-4 items-center"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#submit"
            className="bg-brand-pink text-white font-body font-medium px-8 py-3.5 rounded-full hover:bg-brand-pink/90 transition-colors animate-pulse-pink"
          >
            Submit Your Order
          </a>
          <a
            href="#payment-methods"
            className="font-body text-brand-white/50 hover:text-brand-white transition-colors flex items-center gap-1.5 text-sm"
          >
            View Payment Methods
            <ChevronDown size={14} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={16} className="text-brand-pink/35" />
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <p className="font-script text-brand-pink text-center text-xl mb-2">
            Simple Process
          </p>
          <h2 className="font-display text-4xl text-center text-brand-white font-light mb-14">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Choose & Shop',
                desc: 'Browse South African stores and find what you love. Share the product links with us.',
              },
              {
                step: '02',
                title: 'Pay & Upload',
                desc: 'Send payment via Mpamba, Airtel Money, or National Bank. Upload your proof of payment here.',
              },
              {
                step: '03',
                title: 'We Deliver',
                desc: "We confirm your order on WhatsApp and handle the full delivery from South Africa to Malawi.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative bg-brand-black-card border border-white/[0.07] rounded-2xl p-7 hover:border-brand-pink/20 transition-colors"
              >
                <div className="font-display text-6xl text-brand-pink/8 font-light absolute top-4 right-5 select-none leading-none">
                  {step}
                </div>
                <p className="font-body text-brand-pink text-[10px] tracking-widest uppercase mb-3">
                  Step {step}
                </p>
                <h3 className="font-display text-xl text-brand-white font-light mb-3">
                  {title}
                </h3>
                <p className="font-body text-brand-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAYMENT METHODS ─────────────────────────────────────────────────── */}
      <section id="payment-methods" className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <p className="font-script text-brand-pink text-center text-xl mb-2">
            Pay Securely
          </p>
          <h2 className="font-display text-4xl text-center text-brand-white font-light mb-4">
            Payment Methods
          </h2>
          <p className="font-body text-brand-white/35 text-center text-sm mb-12 max-w-sm mx-auto leading-relaxed">
            Send your payment using any method below, then upload the proof in the form.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PAYMENT_METHODS.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER FORM ──────────────────────────────────────────────────────── */}
      <section id="submit" className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto">
          <p className="font-script text-brand-pink text-center text-xl mb-2">
            Place Your Order
          </p>
          <h2 className="font-display text-4xl text-center text-brand-white font-light mb-3">
            Submit Your Order
          </h2>
          <p className="font-body text-brand-white/35 text-center text-sm mb-12 max-w-sm mx-auto leading-relaxed">
            Fill in your details, describe your order, and upload your payment proof.
          </p>

          <OrderForm onSuccess={() => setSubmitted(true)} />
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-script text-brand-pink text-xl mb-2">Get In Touch</p>
          <h2 className="font-display text-4xl text-brand-white font-light mb-4">
            Contact Us
          </h2>
          <p className="font-body text-brand-white/35 text-sm mb-10 max-w-xs mx-auto leading-relaxed">
            Questions about your order? Reach us directly on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {[
              { label: '+27 673 216 782',  href: 'https://wa.me/27673216782',  flag: '🇿🇦', country: 'South Africa' },
              { label: '+265 989 322 019', href: 'https://wa.me/265989322019', flag: '🇲🇼', country: 'Malawi' },
            ].map(({ label, href, flag, country }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-brand-black-card border border-white/[0.08] hover:border-[#25D366]/30 rounded-2xl px-6 py-4 transition-all hover:bg-[#25D366]/[0.04]"
              >
                <span className="text-2xl">{flag}</span>
                <div className="text-left">
                  <p className="font-body text-[10px] text-brand-white/25 uppercase tracking-widest mb-0.5">
                    {country}
                  </p>
                  <p className="font-body text-brand-white font-medium text-sm">{label}</p>
                </div>
                <MessageCircle
                  size={16}
                  className="text-[#25D366] ml-auto flex-shrink-0"
                />
              </a>
            ))}
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-brand-white/30 hover:text-brand-pink transition-colors text-sm"
          >
            <Instagram size={15} />
            Follow us on Instagram
          </a>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={28} showText />
          </div>
          <div className="flex items-center gap-2 text-brand-white/20 text-xs font-body">
            <Phone size={11} />
            <span>South Africa to Malawi</span>
          </div>
          <p className="font-body text-brand-white/20 text-xs">
            © {new Date().getFullYear()} Twiggy &amp; Sithe's. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
