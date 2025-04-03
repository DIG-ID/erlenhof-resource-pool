import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import type { Jobs } from "@/lib/types";

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


interface UserData {
  role: { id: string };
  education?: { id: string };
  pool?: { id: string };
}

/**
 * Verifica se um utilizador tem permissão para se candidatar a um job
 */
export function canUserApply(job: Jobs, userData: UserData): boolean {
  const isUser = userData.role.id === "user";
  const isOpen = job.status?.id === "open";
  const sameEducation = job.education?.id === userData.education?.id;
  const samePool = job.pool?.id === userData.pool?.id;
  const isUnassigned = job.assignedTo === null;

  return isUser && isOpen && sameEducation && samePool && isUnassigned;
}

/**
 * Explica porque é que um utilizador não pode candidatar-se
 */
export function getIneligibilityReason(job: Jobs, userData: UserData): string {
  if (job.status?.id !== "open") return "Closed";
  if (job.assignedTo !== null) return "Taken";
  if (userData.role.id !== "user") return "Not eligible";
  if (job.education?.id !== userData.education?.id) return "Wrong education";
  if (job.pool?.id !== userData.pool?.id) return "Wrong pool";
  return "Not eligible";
}

/**
 * Returns the correct app URL depending on the environment.
 * Defaults to production unless NODE_ENV is 'development'.
 */
export function getAppUrl(): string {
  const isLocal = import.meta.env.DEV;

  return isLocal
    ? import.meta.env.PUBLIC_APP_URL_LOCAL
    : import.meta.env.PUBLIC_APP_URL_PROD;
}

/**
 * Waits a number of milliseconds before continuing.
 * Useful for delaying UI feedback, animations or redirects.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
