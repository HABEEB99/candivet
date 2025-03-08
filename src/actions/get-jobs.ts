import API_CONFIG from "@/config/api-config";

import { getErrorMessages } from "@/lib/utils";

export const getJobs = async (
  search_term = "",
  job_type = "hybrid",
  location = "",
  skills = []
) => {
  const url = API_CONFIG.GET_JOBS;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        search_term,
        job_type,
        location,
        skills,
      }),
    });

    const jobs = await response.json();

    return jobs;
  } catch (error) {
    return getErrorMessages(error);
  }
};
