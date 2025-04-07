import { useJobActions } from "@/hooks/useJobActions";
import { formatDate } from "@/lib/utils";
import type { Jobs, UserData } from "@/lib/types";
import { JobActions } from "@/components/jobs/job-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, CalendarDays } from "lucide-react";

export function OpenJobs({
  jobs,
  userData
}: {
  jobs: Jobs[];
  userData: UserData;
}) {
  const { assignJob } = useJobActions();

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.status.id === "open" &&
        job.education.id === userData.education.id &&
        job.pool.id === userData.pool.id
    )
    .sort(
      (a, b) =>
        new Date(a.date.seconds * 1000).getTime() -
        new Date(b.date.seconds * 1000).getTime()
    );

  if (filteredJobs.length === 0) {
    return <p>No open jobs available.</p>;
  }

  return (

      filteredJobs.map((job) => (
        <Card key={job.id} className="shadow-none">
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <CalendarDays size={16} />
              Date: {formatDate(job.date)}
            </CardDescription>
          </CardHeader>
          <CardContent>{job.description}</CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex justify-end items-center gap-2 w-full">
              <Button variant="outline" className="cursor-pointer">
                <Eye />
                <a href={`/jobs/${job.id}`}>View Job</a>
              </Button>

              <JobActions job={job} userData={userData} />
            </div>
          </CardFooter>
        </Card>
      ))

  );
}
