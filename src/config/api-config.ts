const API_CONFIG = {
  GET_JOBS: `https://${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/job/get-jobs-open/`,
  GET_JOB: `https://${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/job/get-job-item/`,
};

export default API_CONFIG;
