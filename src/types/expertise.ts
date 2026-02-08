export interface TechnicalExpertise {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    keywords: string[];
    features: string[];
    iconType: 'semicon' | 'automation' | 'scada' | 'default'; // Simplified icon handling for now
    order: number;
    updatedAt: string;
}

export type ExpertiseFormData = Omit<TechnicalExpertise, 'updatedAt'>;
