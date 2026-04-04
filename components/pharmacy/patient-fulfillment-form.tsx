"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  MapPin,
  MessageCircle,
  Upload,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  Loader2,
  ShieldCheck,
  ClipboardList,
  Send,
  Phone,
} from "lucide-react";
import { useCart } from "@/lib/store/cart-store";
import { submitPharmacyOrder } from "@/app/actions/pharmacy-orders";

// ── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  patientName: string;
  whatsappNumber: string;
  deliveryAddress: string;
  pdpaConsent: boolean;
}

type SubmitState = "idle" | "loading" | "success" | "error";

// ── Component ────────────────────────────────────────────────────────────────

export function PatientFulfillmentForm() {
  const { items, totalPrice, totalItems, clearCart, isHydrated } = useCart();
  const [form, setForm] = useState<FormState>({
    patientName: "",
    whatsappNumber: "",
    deliveryAddress: "",
    pdpaConsent: false,
  });
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasRxItems = items.some((i) => i.requiresPrescription);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrescriptionFile(e.target.files?.[0] ?? null);
  };

  const isValid =
    form.patientName.trim().length > 0 &&
    form.whatsappNumber.trim().length > 0 &&
    form.deliveryAddress.trim().length > 0 &&
    form.pdpaConsent &&
    items.length > 0 &&
    (!hasRxItems || prescriptionFile !== null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitState("loading");
    setErrorMsg("");

    const result = await submitPharmacyOrder({
      patientName: form.patientName.trim(),
      whatsappNumber: form.whatsappNumber.trim(),
      deliveryAddress: form.deliveryAddress.trim(),
      cartItems: items,
      prescriptionFilename: prescriptionFile?.name,
    });

    if (result.success) {
      setOrderId(result.orderId ?? null);
      clearCart();
      setSubmitState("success");
    } else {
      setErrorMsg(result.error ?? "Submission failed. Please try again.");
      setSubmitState("error");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AnimatePresence mode="wait">

      {/* ── SUCCESS STATE ───────────────────────────────────────────────── */}
      {submitState === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center py-4"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", damping: 14, stiffness: 260 }}
            className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-6"
          >
            <CheckCircle2 size={38} className="text-emerald-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              Request Submitted
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
              We&apos;ve received your order
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-md mx-auto mb-2">
              Your fulfillment request is now under pharmacist review. You&apos;ll be
              contacted on WhatsApp once your order is approved and a payment link is ready.
            </p>
            {orderId && (
              <p className="text-white/40 text-xs font-mono mt-1">
                Reference: {orderId.slice(0, 8).toUpperCase()}
              </p>
            )}
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-sm mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 text-left"
          >
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">
              What happens next
            </p>
            {(
              [
                {
                  icon: <ClipboardList size={14} />,
                  label: "Pharmacist Review",
                  desc: "Our team reviews your request within 2 hours.",
                },
                {
                  icon: <CheckCircle2 size={14} />,
                  label: "Approval & Payment",
                  desc: "You receive a PromptPay payment link via WhatsApp.",
                },
                {
                  icon: <Send size={14} />,
                  label: "Dispatch",
                  desc: "Order is packed and dispatched to your address on Koh Samui, Koh Phangan or Koh Tao.",
                },
              ] as const
            ).map((step, i) => (
              <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="w-6 h-6 rounded-full bg-[#3eb5bd]/15 border border-[#3eb5bd]/25 flex items-center justify-center text-[#3eb5bd] shrink-0 mt-0.5">
                  {step.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/90">{step.label}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* WhatsApp + Phone CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 w-full max-w-sm"
          >
            <p className="text-white/40 text-xs text-center mb-3">
              Questions? Message our pharmacist directly
            </p>
            <a
              href={`https://wa.me/660806696915?text=${encodeURIComponent(
                "Hello, I have a question about my pharmacy order I just submitted."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-all"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="tel:0936512888"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 font-medium text-sm transition-all mt-2"
            >
              <Phone size={15} />
              Call Pharmacist: 093-651-2888
            </a>
          </motion.div>
        </motion.div>
      )}

      {/* ── FORM STATE (idle / loading / error) ─────────────────────────── */}
      {submitState !== "success" && (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Cart summary */}
          {isHydrated && items.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ClipboardList size={14} />
                Order Summary
              </h3>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-white/80 truncate pr-4 flex items-center gap-1.5">
                      {item.requiresPrescription && (
                        <FlaskConical size={11} className="text-rose-400 shrink-0" />
                      )}
                      {item.name}
                      <span className="text-white/40">× {item.quantity}</span>
                    </span>
                    <span className="text-white font-semibold shrink-0">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <span className="text-white/60 text-sm">
                  {totalItems()} item{totalItems() !== 1 ? "s" : ""}
                </span>
                <span className="text-[#3eb5bd] font-bold text-lg">
                  ฿{totalPrice().toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Form fields */}
          <div className="space-y-4">
            {/* Patient Name */}
            <div>
              <label
                htmlFor="patientName"
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 mb-2"
              >
                <User size={13} />
                Full Name
              </label>
              <input
                id="patientName"
                name="patientName"
                type="text"
                value={form.patientName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                autoComplete="name"
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3eb5bd] focus:ring-2 focus:ring-[#3eb5bd]/25 transition-all"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label
                htmlFor="whatsappNumber"
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 mb-2"
              >
                <MessageCircle size={13} />
                WhatsApp Number
              </label>
              <div className="flex">
                <span className="flex items-center px-4 bg-white/5 border border-r-0 border-white/20 rounded-l-xl text-white/50 text-sm font-medium select-none">
                  +66
                </span>
                <input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  placeholder="80 123 4567"
                  required
                  autoComplete="tel"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-r-xl px-4 py-3 text-sm outline-none focus:border-[#3eb5bd] focus:ring-2 focus:ring-[#3eb5bd]/25 transition-all"
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <label
                htmlFor="deliveryAddress"
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 mb-2"
              >
                <MapPin size={13} />
                Delivery Address
              </label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                placeholder="Hotel name / room, villa address, or street address on Koh Samui"
                required
                rows={3}
                className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3eb5bd] focus:ring-2 focus:ring-[#3eb5bd]/25 transition-all resize-none"
              />
            </div>

            {/* Prescription upload — only shown if Rx items are in cart */}
            {hasRxItems && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <label className="flex items-center gap-1.5 text-sm font-medium text-white/80 mb-2">
                  <FlaskConical size={13} className="text-rose-400" />
                  Prescription Upload
                  <span className="text-rose-400 text-xs">(required for Rx items)</span>
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-xl px-4 py-4 text-sm transition-all flex flex-col items-center gap-2 ${
                    prescriptionFile
                      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400"
                      : "border-white/20 bg-white/5 text-white/50 hover:border-[#3eb5bd]/50 hover:text-white/70"
                  }`}
                >
                  {prescriptionFile ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald-400" />
                      <span className="font-medium">{prescriptionFile.name}</span>
                      <span className="text-xs text-white/40">Click to change</span>
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      <span>Click to upload your prescription</span>
                      <span className="text-xs text-white/30">JPG, PNG or PDF — max 10 MB</span>
                    </>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  aria-label="Upload prescription file"
                />
              </motion.div>
            )}

            {/* PDPA consent */}
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <input
                id="pdpaConsent"
                name="pdpaConsent"
                type="checkbox"
                checked={form.pdpaConsent}
                onChange={handleChange}
                required
                className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 accent-[#3eb5bd] shrink-0 cursor-pointer"
              />
              <label
                htmlFor="pdpaConsent"
                className="text-xs text-white/60 leading-relaxed cursor-pointer"
              >
                I consent to Samui Home Clinic processing my personal data (name,
                contact, delivery address, and prescription information) for the
                purpose of fulfilling this medical order, in accordance with
                Thailand&apos;s Personal Data Protection Act (PDPA).
              </label>
            </div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {submitState === "error" && errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 flex items-center gap-2"
              >
                <span>⚠</span> {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Security note */}
          <div className="flex items-center gap-2 mt-4 text-white/30 text-xs">
            <ShieldCheck size={13} />
            <span>
              No payment details collected here. A payment link will be sent to
              your WhatsApp after pharmacist approval.
            </span>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!isValid || submitState === "loading"}
            whileTap={isValid ? { scale: 0.98 } : {}}
            className={`w-full mt-5 py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
              isValid && submitState !== "loading"
                ? "bg-[#3eb5bd] hover:bg-[#35a0a8] text-white shadow-lg shadow-[#3eb5bd]/25 hover:-translate-y-0.5"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {submitState === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting Request…
              </>
            ) : (
              <>
                Submit Request
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </motion.form>
      )}

    </AnimatePresence>
  );
}
