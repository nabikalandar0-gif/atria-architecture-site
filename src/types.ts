export type Language = 'fa' | 'en';

export type ProjectCategory = 
  | 'all'
  | 'residential' 
  | 'villa' 
  | 'commercial' 
  | 'interior' 
  | 'cultural' 
  | 'renovation';

export interface ProjectMaterial {
  name: string;
  nameFa: string;
  origin: string;
  type: string;
}

export interface Project {
  id: string;
  title: string;
  titleFa: string;
  slug: string;
  category: ProjectCategory;
  categoryFa: string;
  categoryEn: string;
  location: string;
  locationFa: string;
  year: number | string;
  areaSqm: number;
  status: 'Completed' | 'Under Construction' | 'Concept / Proposal' | 'تکمیل شده' | 'در حال ساخت' | 'طراحی کانسپت';
  heroImage: string;
  gallery: string[];
  floorPlanImage?: string;
  tagline: string;
  taglineFa: string;
  description: string;
  descriptionFa: string;
  architecturalPhilosophy: string;
  architecturalPhilosophyFa: string;
  leadArchitect: string;
  leadArchitectFa: string;
  awards?: string[];
  awardsFa?: string[];
  materials: ProjectMaterial[];
  sustainabilityRating: string;
  climateApproach: string;
  climateApproachFa: string;
  keyFeatures: string[];
  keyFeaturesFa: string[];
  isFeatured?: boolean;
  coordinates?: { lat: number; lng: number };
  regionName?: string;
  regionNameFa?: string;
}

export interface RenovationComparison {
  id: string;
  title: string;
  titleFa: string;
  location: string;
  locationFa: string;
  beforeImage: string;
  afterImage: string;
  beforeDescriptionFa: string;
  afterDescriptionFa: string;
  beforeDescriptionEn: string;
  afterDescriptionEn: string;
  areaSqm: number;
  durationMonths: number;
}

export interface TeamMember {
  id: string;
  name: string;
  nameFa: string;
  role: string;
  roleFa: string;
  image: string;
  bio: string;
  bioFa: string;
  education: string;
  educationFa: string;
}

export interface StudioAward {
  year: string;
  title: string;
  titleFa: string;
  organization: string;
  projectName: string;
  projectNameFa: string;
  badge: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  clientNameFa: string;
  clientRole: string;
  clientRoleFa: string;
  projectTitle: string;
  projectTitleFa: string;
  projectLocation: string;
  projectLocationFa: string;
  projectYear: string;
  rating: number;
  avatar: string;
  quoteEn: string;
  quoteFa: string;
  outcomeEn: string;
  outcomeFa: string;
  projectImage: string;
}

export interface ArchitecturalArticle {
  id: string;
  slug: string;
  title: string;
  titleFa: string;
  category: 'construction-law' | 'materials-budget' | 'renovation' | 'villa-design' | 'smart-bms';
  categoryEn: string;
  categoryFa: string;
  readTimeMin: number;
  publishDate: string;
  heroImage: string;
  summaryEn: string;
  summaryFa: string;
  keyQuestionEn: string;
  keyQuestionFa: string;
  contentFa: {
    intro: string;
    sections: Array<{
      heading: string;
      body: string;
      takeaways?: string[];
    }>;
    faq: Array<{
      q: string;
      a: string;
    }>;
  };
  contentEn: {
    intro: string;
    sections: Array<{
      heading: string;
      body: string;
      takeaways?: string[];
    }>;
    faq: Array<{
      q: string;
      a: string;
    }>;
  };
  tags: string[];
}

export interface AIConsultationResponse {
  conceptTitle: string;
  designPhilosophy: string;
  spatialZoning: Array<{
    zoneName: string;
    areaSqm: number;
    description: string;
    daylightOrientation: string;
  }>;
  climateAndPassiveStrategies: string[];
  materialPalette: Array<{
    materialName: string;
    application: string;
    tactileQuality: string;
  }>;
  structuralApproach: string;
  estimatedDesignPhases: Array<{
    phase: string;
    durationWeeks: number;
    deliverables: string;
  }>;
  leadArchitectAdvice: string;
}
