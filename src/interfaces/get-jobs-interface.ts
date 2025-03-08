export namespace IJobLists {
  export type Jobs = Job[];

  export interface Job {
    company_website: string;
    company_name: string;
    company_description: string;
    job_title: string;
    start_date: string;
    end_date: string;
    job_type: string;
    job_description: string;
    required_skills: string;
    educational_requirements: string;
    additional_benefits: string;
    languages: string;
    country_of_residence: string;
    years_of_experience_required: string;
    job_location_name: string;
    salary_currency?: string;
    salary_range_min: number;
    salary_range_max: number;
    filter_out_salary_range: boolean;
    require_cv: boolean;
    require_cover_letter: boolean;
    require_voicenote: boolean;
    visibility_public: boolean;
    visibility_private: boolean;
    tags: string;
    hide_personal_details_during_screening: boolean;
    minimum_fit_score: number;
    filter_minimum_fit_score: boolean;
    status: string;
    auto_send_interview_mail_on_close: boolean;
    candidate_interview_count: number;
    interview_link: any;
    company_id: any;
    recruiter_id: any;
    id: string;
    reference: string;
    created_at: string;
    updated_at: string;
    total_applicants: number;
    user: User;
    company_logo?: string;
    questions: Question[];
  }

  export interface User {
    id: string;
    reference?: string;
    created_at: string;
    updated_at: string;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
    channel: string;
    last_name?: string;
    country_code?: string;
    phone?: string;
    profile_picture: any;
    calendly_link: any;
    google_calender_link: any;
    username: any;
    location?: string;
    last_login?: string;
  }

  export interface Question {
    id: string;
    reference: any;
    created_at: string;
    updated_at: string;
    text: string;
  }
}
