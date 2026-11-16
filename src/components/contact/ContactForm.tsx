"use client";

import { useRef, useState } from "react";

type Texts = Record<string, string | undefined>;
type Field = "name" | "surname" | "email" | "phone" | "message" | "consent";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** The contact form. It posts to this site's /api/contact, which forwards to the CMS API (enquiries inbox). */
export default function ContactForm({ texts, buttonLabel }: { texts: Texts; buttonLabel: string }) {
  const t = (k: string, d: string) => texts[k] || d;
  const [values, setValues] = useState({ name: "", surname: "", email: "", phone: "", message: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k as Field]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: Partial<Record<Field, string>> = {};
    const req = t("required_message", "Please fill in this field.");
    if (!values.name.trim()) er.name = req;
    if (!values.surname.trim()) er.surname = req;
    if (!values.email.trim()) er.email = req;
    else if (!EMAIL.test(values.email.trim())) er.email = t("email_invalid_message", "Please enter a valid email address.");
    if (!values.phone.trim()) er.phone = req;
    if (!values.message.trim()) er.message = req;
    if (!consent) er.consent = t("consent_message", "Please tick the box to continue.");
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || !validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(75000), // the free API may need a minute to wake up
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string[]> };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues({ name: "", surname: "", email: "", phone: "", message: "", website: "" });
        setConsent(false);
        formRef.current?.reset();
      } else if (res.status === 422 && data.errors) {
        const er: Partial<Record<Field, string>> = {};
        for (const k of Object.keys(data.errors)) if (k in values && k !== "website") er[k as Field] = data.errors[k][0];
        setErrors(er);
        setStatus(Object.keys(er).length ? "idle" : "error");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const err = (k: Field) =>
    errors[k] ? (
      <span className="c-err" id={`err-${k}`} role="alert">
        {errors[k]}
      </span>
    ) : null;
  const aria = (k: Field) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `err-${k}` : undefined });

  return (
    <form ref={formRef} className="c-form" onSubmit={onSubmit} noValidate>
      <div className="c-f c-f-name">
        <input type="text" name="name" autoComplete="given-name" placeholder={t("name_placeholder", "Name")} aria-label={t("name_placeholder", "Name")} value={values.name} onChange={set("name")} {...aria("name")} />
        {err("name")}
      </div>
      <div className="c-f c-f-surname">
        <input type="text" name="surname" autoComplete="family-name" placeholder={t("surname_placeholder", "Surname")} aria-label={t("surname_placeholder", "Surname")} value={values.surname} onChange={set("surname")} {...aria("surname")} />
        {err("surname")}
      </div>
      <div className="c-f c-f-email">
        <input type="email" name="email" autoComplete="email" placeholder={t("email_placeholder", "Email ID*")} aria-label={t("email_placeholder", "Email ID*")} value={values.email} onChange={set("email")} {...aria("email")} />
        {err("email")}
      </div>
      <div className="c-f c-f-phone">
        <input type="tel" name="phone" autoComplete="tel" placeholder={t("phone_placeholder", "Phone Number*")} aria-label={t("phone_placeholder", "Phone Number*")} value={values.phone} onChange={set("phone")} {...aria("phone")} />
        {err("phone")}
      </div>
      <div className="c-f c-f-message">
        <textarea name="message" placeholder={t("message_placeholder", "Message")} aria-label={t("message_placeholder", "Message")} value={values.message} onChange={set("message")} {...aria("message")} />
        {err("message")}
      </div>

      {/* Honeypot: invisible to people, bots fill it in and are rejected by the API. */}
      <input className="c-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden value={values.website} onChange={set("website")} />

      <div className="c-f c-f-consent">
        <label className="c-consent">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((er) => ({ ...er, consent: undefined }));
            }}
            {...aria("consent")}
          />
          <span className="c-box" aria-hidden />
          <span className="c-consent-text">{t("consent_text", "I agree to be contacted")}</span>
        </label>
        {err("consent")}
      </div>

      <button type="submit" className="c-submit" disabled={status === "sending"}>
        {status === "sending" ? t("sending_text", "Sending...") : buttonLabel}
      </button>

      <p className={`c-status${status === "success" ? " is-ok" : status === "error" ? " is-bad" : ""}`} role="status" aria-live="polite">
        {status === "success" ? t("success_message", "Thank you! Your message has been sent.") : status === "error" ? t("error_message", "Sorry, something went wrong. Please try again.") : ""}
      </p>
    </form>
  );
}
