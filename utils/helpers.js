export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDate = (value) => {
  const date = new Date(value + "Z");
  return date.toLocaleDateString("en-US", {
    timeZone: "America/Sao_Paulo",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDateNoZ = (value) => {
  if (!value) return "";

  const date = new Date(value);

  return date.toLocaleDateString("en-US", {
    timeZone: "America/Sao_Paulo",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export const getPreviewText = (text, limit = 220) => {
  if (!text) return "";

  if (text.length <= limit) return text;

  return text.slice(0, limit).trim() + "...";
};
