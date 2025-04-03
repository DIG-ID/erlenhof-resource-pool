// src/hooks/useJobActions.ts
import { postWithToast } from "@/lib/apiClient";

export function useJobActions() {
  const assignJob = async (jobId: string) => {
    return await postWithToast("/api/jobs/assign", { jobId }, {
      success: "Application submitted successfully!",
      error: "Failed to submit the application."
    });
  };

  return { assignJob };
}
