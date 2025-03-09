"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { getJob } from "@/actions/get-job";
import { IJobLists } from "@/interfaces/get-jobs-interface";
import Link from "next/link";

const JobDetailsPage = ({ params }: { params: Promise<{ jobId: string }> }) => {
  const { jobId } = use(params);

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery<IJobLists.Job>({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId as string),
  });

  if (isLoading)
    return (
      <div className="flex flex-col space-y-4 p-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-52 w-full rounded-lg" />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">Error loading job details.</p>
    );

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md md:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Go Back Home Button */}
      <Link href="/">
        <motion.button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all mb-4 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} />
          <span>Go Back Home</span>
        </motion.button>
      </Link>

      <motion.img
        src={job?.company_logo || "/placeholder-company-logo.png"}
        alt={job?.company_name}
        className="w-24 h-24 mx-auto rounded-full shadow-sm mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />

      <h1 className="text-2xl font-bold text-center text-gray-900">
        {job?.job_title}
      </h1>
      <p className="text-center text-gray-600">{job?.company_name}</p>

      <motion.div
        className="mt-4 space-y-4 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p>
          <span className="font-semibold">📍 Location:</span>{" "}
          {job?.job_location_name}
        </p>
        <p>
          <span className="font-semibold">💰 Salary:</span>{" "}
          {job?.salary_currency} {job?.salary_range_min} -{" "}
          {job?.salary_range_max}
        </p>
        <p>
          <span className="font-semibold">📅 Duration:</span> {job?.start_date}{" "}
          - {job?.end_date}
        </p>
        <p>
          <span className="font-semibold">📜 Job Type:</span> {job?.job_type}
        </p>
      </motion.div>

      <motion.div
        className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold">📝 Job Description</h2>
        <p className="text-gray-700">{job?.job_description}</p>
      </motion.div>

      <motion.button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Apply Now
      </motion.button>
    </motion.div>
  );
};

export default JobDetailsPage;
