"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { AlertDialogDelete } from "@/components/alert-dialog-delete";
import { JobApplyAction } from "@/components/jobs/job-apply-action";
import type { Jobs } from "@/lib/types";

interface JobActionsProps {
  job: Jobs;
  userData: {
    role: { id: string };
    education?: { id: string };
    pool?: { id: string };
  };
}

export function JobActions({ job, userData }: JobActionsProps) {
  const isAdmin = ["admin", "super_admin"].includes(userData.role.id);
  const isUser = userData.role.id === "user";

  return (
    <div className="flex gap-x-4 justify-end p-6">
      {isUser && <JobApplyAction job={job} userData={userData} />}

      {isAdmin && (
        <>
          <Button>
            <Pencil />
            <a href={`/jobs/edit/${job.id}`} className="ml-2">Edit Job</a>
          </Button>
          <AlertDialogDelete
            id={job.id}
            resourceType="jobs"
            client:load
            triggerText="Delete Job"
            title="Are you sure you want to delete this Job?"
            description="This will permanently delete the job from the database."
            cancelText="No, cancel"
            actionText="Yes, delete"
          />
        </>
      )}
    </div>
  );
}
