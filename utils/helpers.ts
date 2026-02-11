import crypto from "crypto";

type PreviewText = {
  intro: string;
  benefits: string;
};

/**
 * Formats a number into USD currency.
 */
export function formatCurrency(value: number | string): string {
  const number = Number(value);

  if (Number.isNaN(number)) return "—";

  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

/**
 * Formats a UTC date string into São Paulo timezone.
 */
export function formatDate(value: string): string {
  const date = new Date(value + "Z");

  return date.toLocaleDateString("en-US", {
    timeZone: "America/Sao_Paulo",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formats a date string without forcing UTC.
 */
export function formatDateNoZ(value?: string): string {
  if (!value) return "";

  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    timeZone: "America/Sao_Paulo",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

/**
 * Returns a preview text or splits intro / benefits.
 */
export function getPreviewText(
  text: string = "",
  limit: number = 220,
): PreviewText {
  if (!text) {
    return { intro: "", benefits: "" };
  }

  if (text.length <= limit) {
    return { intro: text, benefits: "" };
  }

  const [intro, ...rest] = text.split("Benefits");

  return {
    intro: intro.trim(),
    benefits: rest.length ? "Benefits" + rest.join("").trim() : "",
  };
}

/**
 * Creates a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Creates a password reset token.
 */
export function createResetToken(): {
  rawToken: string;
  hashedToken: string;
} {
  const rawToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  return {
    rawToken,
    hashedToken,
  };
}

/**
 * Formats a Brazilian CEP.
 */
export function formatCep(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}
