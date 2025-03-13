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
export const formatDate = (
  timestamp?: { seconds: number; nanoseconds: number },
  dateFormat: string = "dd/MM/yyyy HH:mm"
): string => {
  if (!timestamp || !timestamp.seconds) return "N/A"; // Se não houver data, retorna "N/A"
  
  const date = new Date(timestamp.seconds * 1000); // Converte o timestamp para Date
  return format(date, dateFormat); // Formata usando date-fns
};