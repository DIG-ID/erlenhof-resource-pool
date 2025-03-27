import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um timestamp do Firestore em uma data legível.
 * @param timestamp - O timestamp do Firestore (objeto com `seconds` e `nanoseconds`).
 * @param dateFormat - O formato desejado (opcional, padrão: "dd/MM/yyyy HH:mm").
 * @returns A data formatada como string.
 */
type FormatType = "full" | "short" | "custom";

export const formatDate = (
  timestamp?: { seconds: number; nanoseconds: number },
  type: FormatType = "full",
  customFormat?: string // para quando se quiser um formato à parte
): string => {
  if (!timestamp || !timestamp.seconds) return "N/A";

  const date = new Date(timestamp.seconds * 1000);

  const formatString =
    type === "custom"
      ? customFormat ?? "dd/MM/yyyy HH:mm"
      : type === "short"
      ? "dd/MM/yyyy"
      : "dd/MM/yyyy HH:mm"; // default: full

  return format(date, formatString);
};

export function timestampToDateInputValue(timestamp?: { seconds: number; nanoseconds: number }): string {
  if (!timestamp || !timestamp.seconds) return "";
  const date = new Date(timestamp.seconds * 1000);
  return date.toISOString().split("T")[0]; // yyyy-MM-dd
}

export function sanitizeId(input: string): string {
  return input
    .normalize("NFD") // Separa acentos dos caracteres
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[\/\.\*\[\]#%]/g, "") // Remove caracteres proibidos pelo Firestore
    .trim()
    .replace(/\s+/g, "-") // Substitui espaços por "-"
    .toLowerCase(); // Converte para minúsculas
}