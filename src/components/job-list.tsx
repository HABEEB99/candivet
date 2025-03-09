"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getJobs } from "@/actions/get-jobs";
import { IJobLists } from "@/interfaces/get-jobs-interface";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CirclePlus, Search } from "lucide-react";
import Image from "next/image";
import { JobCard } from "@/components";

const ITEMS_PER_PAGE = 8;

const JobList = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    search_term: "",
    job_type: "hybrid",
    location: "",
    skills: [],
  });

  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery<IJobLists.Jobs>({
    queryKey: ["fetch-jobs", filters],
    queryFn: async () => {
      const data = await getJobs(
        filters.search_term,
        filters.job_type,
        filters.location,
        filters.skills
      );
      return data;
    },
  });

  const filteredJobs = Array.isArray(jobs) ? jobs : [];
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  // Pagination Logic
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    // Reset pagination on filter change
    setCurrentPage(1);
  };

  return (
    <motion.div
      className="px-6 md:px-16 lg:px-32 my-6 overflow-x-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filters */}
      <div className="flex items-center justify-between border-b border-b-gray-200 py-4">
        <div className="flex flex-col md:flex-row items-center w-full md:w-80 h-10 rounded-full bg-[#F0F0F0] text-[#898989] overflow-hidden px-2">
          <Search />
          <Input
            placeholder="Search for jobs"
            className="flex-1 outline-0 bg-transparent border-0 ring-0"
            value={filters.search_term}
            onChange={(e) => handleFilterChange("search_term", e.target.value)}
          />
        </div>

        <Button className="bg-[#065844] text-white flex items-center rounded-md h-10 px-2 py-1">
          <CirclePlus />
          <span>Create New Job Post</span>
        </Button>
      </div>

      <h2 className="text-2xl font-semibold my-4">Job Board</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="w-full h-full bg-[#EBEBEB] text-[#000000]"
        />

        <Select
          onValueChange={(value) => handleFilterChange("job_type", value)}
          defaultValue={filters.job_type}
        >
          <SelectTrigger className="w-full h-full bg-[#EBEBEB] text-[#000000]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent className="w-full ">
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Skills"
          value={filters.skills}
          onChange={(e) => handleFilterChange("skills", e.target.value)}
          className="w-full h-full bg-[#EBEBEB] text-[#000000]"
        />

        <Select
          onValueChange={(value) => setViewMode(value as "table" | "grid")}
          defaultValue="table"
        >
          <SelectTrigger className="w-full h-full bg-[#EBEBEB] text-[#000000]">
            <SelectValue placeholder="Select View" />
          </SelectTrigger>
          <SelectContent className="w-full bg-[#EBEBEB]">
            <SelectItem value="table">Table View</SelectItem>
            <SelectItem value="grid">Grid View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-md" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-red-500 text-center">
          {error?.message || "Error fetching jobs"}
        </div>
      )}

      {!isLoading && paginatedJobs.length === 0 && (
        <div className="text-center text-gray-500">No jobs found.</div>
      )}

      {!isLoading && paginatedJobs.length > 0 && (
        <>
          {viewMode === "table" ? (
            <Table>
              <TableHeader className="bg-[#D6D6D6]">
                <TableRow className="text-[#898989]">
                  <TableHead>Job Title</TableHead>
                  <TableHead>Job Type</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Languages</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedJobs.map((job) => (
                  <motion.tr
                    key={job.id}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                    onClick={() => router.push(`/jobs/${job.id}`)}
                  >
                    <TableCell className="flex items-center space-x-2 capitalize">
                      {job.company_logo && (
                        <Image
                          src={job.company_logo}
                          alt={job.company_name}
                          width={20}
                          height={20}
                        />
                      )}
                      {job.job_title}
                    </TableCell>
                    <TableCell className="capitalize">{job.job_type}</TableCell>
                    <TableCell className="capitalize">
                      {job.required_skills}
                    </TableCell>
                    <TableCell className="capitalize">
                      {job.languages}
                    </TableCell>
                    <TableCell className="capitalize">{job.tags}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedJobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(`/jobs/${job.id}`)}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent className="my-6">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i} className="cursor-pointer">
                    <PaginationLink
                      isActive={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </motion.div>
  );
};

export default JobList;
