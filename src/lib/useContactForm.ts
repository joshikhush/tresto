"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_SUBJECT = "New enquiry from tresto.io";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED_MESSAGE = "This field is required.";
const EMAIL_MESSAGE = "Enter a valid email address.";
const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again, or reach us on WhatsApp.";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

type ContactFormValues = Record<string, string | boolean>;

interface UseContactFormOptions<T extends ContactFormValues> {
  initialValues: T;
  /** Fields that must be non-empty before submitting. */
  requiredFields: (keyof T)[];
  /** Field that must additionally pass an email-format check, if present. */
  emailField?: keyof T;
}

export function useContactForm<T extends ContactFormValues>({
  initialValues,
  requiredFields,
  emailField,
}: UseContactFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [botcheck, setBotcheck] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name as keyof T];
      return next;
    });
  }

  function handleBotcheckChange(e: ChangeEvent<HTMLInputElement>) {
    setBotcheck(e.target.value);
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof T, string>> = {};

    for (const field of requiredFields) {
      const value = values[field];
      const isEmpty = typeof value === "string" ? value.trim().length === 0 : !value;
      if (isEmpty) nextErrors[field] = REQUIRED_MESSAGE;
    }

    if (emailField) {
      const value = values[emailField];
      if (typeof value === "string" && value.trim().length > 0 && !EMAIL_REGEX.test(value)) {
        nextErrors[emailField] = EMAIL_MESSAGE;
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: WEB3FORMS_SUBJECT,
          botcheck,
          ...values,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(typeof result.message === "string" ? result.message : GENERIC_ERROR_MESSAGE);
      }
    } catch {
      setStatus("error");
      setErrorMessage(GENERIC_ERROR_MESSAGE);
    }
  }

  return {
    values,
    errors,
    status,
    errorMessage,
    botcheck,
    handleChange,
    handleBotcheckChange,
    handleSubmit,
  };
}
