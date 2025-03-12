import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um timestamp do Firebase em uma data legível.
 * @param timestamp - O timestamp do Firebase (objeto com `seconds` e `nanoseconds`).
 * @returns A data formatada como string.
 */
export const formatDate = (timestamp: { seconds: number; nanoseconds: number }): string => {
  const date = new Date(timestamp.seconds * 1000); // Converte para milissegundos
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};