export interface InnovationIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  submitter_name: string;
  submitter_email: string;
  submitter_organization: string;
  submitter_area: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'qi_project' | 'case_study' | 'change_package';
  file_url?: string;
  created_at: string;
}

export interface LearningContent {
  id: string;
  title: string;
  description: string;
  type: 'change_package' | 'webinar' | 'documentary' | 'research';
  video_url?: string;
  document_url?: string;
  created_at: string;
}
