"use client";

import { useRouter } from "next/navigation";

import { IJobLists } from "@/interfaces/get-jobs-interface";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IJobCard {
  job: IJobLists.Job;
}

const JobCard: React.FC<IJobCard> = ({ job }) => {
  const router = useRouter();

  return (
    <Card
      key={job.id}
      onClick={() => router.push(`/jobs/${job.id}`)}
      className="cursor-pointer"
    >
      <CardHeader>
        <CardTitle>{job.job_title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Type:</strong> {job.job_type}
        </p>
        <p>
          <strong>Skills:</strong> {job.required_skills}
        </p>
        <p>
          <strong>Languages:</strong> {job.languages}
        </p>
        <p>
          <strong>Tags:</strong> {job.tags}
        </p>
      </CardContent>
    </Card>
  );
};

export default JobCard;
