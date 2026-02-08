export type CaseStatus = 'draft' | 'published';

export interface CaseStudy {
    id: string;
    clientName: string; // e.g., "Samsung Electronics"
    projectName: string; // e.g., "AI-driven Analytics Platform"
    period: string; // e.g., "2024.01 - 2024.06"
    tags: string[]; // e.g., ["AI", "React", "Data Visualization"]
    thumbnailUrl: string; // Path to image in public folder
    gallery?: string[]; // Additional images for the detail page
    summary: string; // Short description for list view
    description: string; // Full Markdown content for detail view
    outcome?: string; // e.g., "Increased efficiency by 200%"
    status: CaseStatus;
    order: number; // For sorting
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
}

export type CaseStudyFormData = Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>;
