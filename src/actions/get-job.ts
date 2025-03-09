import API_CONFIG from "@/config/api-config";

import { getErrorMessages } from "@/lib/utils";

export const getJob = async (jobId: string) => {
  const url = API_CONFIG.GET_JOB + jobId + "/";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const job = await response.json();

    return job;
  } catch (error) {
    return getErrorMessages(error);
  }
};
