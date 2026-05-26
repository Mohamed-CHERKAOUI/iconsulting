"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  service: "",
  phone: "",
  message: ""
};

const contactEmail = "mohamedcherkaoui582@gmail.com";

function FloatingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  i18nKey
}: {
  label: string;
  i18nKey?: string;
  name: keyof FormState;
  value: string;
  onChange: (name: keyof FormState, value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="group relative block">
      <input
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder=" "
        required={required}
        className="peer h-16 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 pt-5 text-text outline-none transition placeholder:text-transparent focus:border-cyan/50 focus:ring-2 focus:ring-electric/40"
      />
      <span data-i18n={i18nKey} className="pointer-events-none absolute left-5 top-5 text-sm text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </span>
    </label>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"emailjs" | "mailto">("emailjs");
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  const valid = useMemo(() => {
    return form.name.trim() && form.email.trim() && form.service && form.message.trim();
  }, [form]);

  useEffect(() => {
    if (!successOpen) return;
    setCountdown(10);
    const interval = window.setInterval(() => {
      setCountdown((value) => {
        if (value <= 1) {
          window.clearInterval(interval);
          router.push("/");
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [router, successOpen]);

  const update = (name: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const openMailClient = () => {
    const subject = `iConsulting consultation request - ${form.service}`;
    const body = [
      "New consultation request",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : "",
      form.phone ? `Phone: ${form.phone}` : "",
      `Service: ${form.service}`,
      "",
      "Message:",
      form.message
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid) {
      toast.error("Please complete the required fields before sending.");
      return;
    }

    setLoading(true);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        openMailClient();
        setDeliveryMethod("mailto");
        setSuccessOpen(true);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          company: form.company,
          service: form.service,
          phone: form.phone,
          message: form.message
        },
        { publicKey }
      );
      setDeliveryMethod("emailjs");
      setSuccessOpen(true);
    } catch {
      openMailClient();
      setDeliveryMethod("mailto");
      setSuccessOpen(true);
      toast.success("Opening your email application to complete the request.");
    } finally {
      setLoading(false);
    }
  };

  const bookAnother = () => {
    setForm(initialState);
    setSuccessOpen(false);
  };

  return (
    <>
      <form onSubmit={submit} className="rounded-3xl border border-white/[0.07] bg-white/[0.035] p-5 backdrop-blur-xl sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <FloatingInput label="Full Name *" i18nKey="formName" name="name" value={form.name} onChange={update} required />
          <FloatingInput label="Professional Email *" i18nKey="formEmail" name="email" value={form.email} onChange={update} type="email" required />
          <FloatingInput label="Company / Organization" i18nKey="formCompany" name="company" value={form.company} onChange={update} />
          <FloatingInput label="Phone (optional)" i18nKey="formPhone" name="phone" value={form.phone} onChange={update} type="tel" />
          <label className="relative block md:col-span-2">
            <select
              value={form.service}
              onChange={(event) => update("service", event.target.value)}
              required
              className={cn(
                "h-16 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.035] px-5 text-sm outline-none transition focus:border-cyan/50 focus:ring-2 focus:ring-electric/40",
                form.service ? "text-text" : "text-muted"
              )}
            >
              <option data-i18n="formService" value="">Select a service *</option>
              {services.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-cyan">v</span>
          </label>
          <label className="group relative block md:col-span-2">
            <textarea
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              placeholder=" "
              required
              rows={6}
              className="peer w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-5 pt-7 text-text outline-none transition placeholder:text-transparent focus:border-cyan/50 focus:ring-2 focus:ring-electric/40"
            />
            <span data-i18n="formMessage" className="pointer-events-none absolute left-5 top-5 text-sm text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs">
              Message *
            </span>
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex h-16 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-electric to-cyan font-semibold text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          <span data-i18n="bookConsultation">Book Consultation</span> -&gt;
        </button>
      </form>

      <AnimatePresence>
        {successOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/75 p-5 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-surface/95 p-7 shadow-glow"
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cyber/10">
                <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.12, type: "spring" }} className="grid h-12 w-12 place-items-center rounded-full bg-cyber text-ink">
                  <Check className="h-7 w-7" />
                </motion.div>
              </div>
              <h2 data-i18n="received" id="success-title" className="mt-6 text-center font-display text-3xl font-bold tracking-[-0.03em] text-text">
                Consultation Request Received!
              </h2>
              <p data-i18n="receivedBody" className="mt-4 text-center leading-7 text-muted">
                {deliveryMethod === "emailjs"
                  ? "Your email has been successfully sent to our team. "
                  : "Your email application has been opened with your request prepared. "}
                We will review your request and get back to you within <strong className="text-text">1 business day</strong>.
              </p>
              <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-sm text-muted">
                <span data-i18n="confirmationSent">Confirmation sent to:</span> <span className="text-cyan">{form.email}</span>
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => router.push("/")} className="rounded-full bg-gradient-to-r from-electric to-cyan px-5 py-3 font-semibold text-white">
                  <span data-i18n="backHome">Back to Home</span>
                </button>
                <button type="button" onClick={bookAnother} className="rounded-full border border-white/10 px-5 py-3 font-semibold text-text transition hover:border-cyan/40">
                  <span data-i18n="bookAnother">Book another</span>
                </button>
              </div>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 10, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-cyber to-cyan"
                />
              </div>
              <p className="mt-3 text-center font-mono text-xs text-muted">Auto-close in {countdown}s</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
