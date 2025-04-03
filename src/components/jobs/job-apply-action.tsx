"use client";

import { canUserApply, getIneligibilityReason } from "@/lib/utils";
import { ApplyButton } from "@/components/jobs/apply-button";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { Jobs } from "@/lib/types";

interface JobApplyActionProps {
  job: Jobs;
  userData: {
    role: { id: string };
    education?: { id: string };
    pool?: { id: string };
  };
}

export function JobApplyAction({ job, userData }: JobApplyActionProps) {
  const eligible = canUserApply(job, userData);

  if (eligible) {
    return <ApplyButton jobId={job.id} />;
  }

  const reason = getIneligibilityReason(job, userData);

  return (
    <Button disabled className="bg-gray-400 text-white cursor-not-allowed">
      <CheckCircle className="mr-2" size={16} />
      {reason}
    </Button>
  );
}
