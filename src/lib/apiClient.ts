// src/lib/apiClient.ts
import { toast } from "sonner";

export async function postWithToast<T = any>(
  url: string,
  body: any,
  messages?: { success?: string; error?: string }
): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message ?? messages?.error ?? "Unexpected error.");
    }

    toast.success(data.message ?? messages?.success ?? "Operation completed.");
    return data;
  } catch (err: any) {
    toast.error(err.message ?? messages?.error ?? "Error while processing the request.");
    return null;
  }
}


