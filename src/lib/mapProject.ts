import { Project, ProjectCategory } from '../types';

// شکل تقریبی داده در دیتابیس
type DbProjectRow = {
  id: string;
  slug: string | null;
  title_en: string | null;
  title_fa: string | null;
  category: string | null;
  category_en: string | null;
  category_fa: string | null;
  location_en: string | null;
  location_fa: string | null;
  year: number | null;
  area_sqm: number | null;
  status: string | null;
  tagline_en: string | null;
  tagline_fa: string | null;
  description_en: string | null;
  description_fa: string | null;
  architectural_philosophy_en: string | null;
  architectural_philosophy_fa: string | null;
  lead_architect_en: string | null;
  lead_architect_fa: string | null;
  hero_image: string | null;
  gallery_images: string[] | null;
  floor_plan_image: string | null;
  materials: any;
  key_features_en: string[] | null;
  key_features_fa: string[] | null;
  awards_en: string[] | null;
  awards_fa: string[] | null;
  sustainability_rating: string | null;
  climate_approach_en: string | null;
  climate_approach_fa: string | null;
  is_featured: boolean | null;
  coordinates: { lat?: number; lng?: number } | null;
  region_name_en: string | null;
  region_name_fa: string | null;
};

export function mapDbProjectToProject(row: DbProjectRow): Project {
  const category = (row.category || 'villa') as ProjectCategory;

  return {
    id: row.id,
    title: row.title_en || row.title_fa || 'Untitled',
    titleFa: row.title_fa || row.title_en || 'بدون عنوان',
    slug: row.slug || row.id,
    category,
    categoryEn: row.category_en || category,
    categoryFa: row.category_fa || category,
    location: row.location_en || row.location_fa || '',
    locationFa: row.location_fa || row.location_en || '',
    year: row.year ?? '',
    areaSqm: row.area_sqm ?? 0,
    status: (row.status as Project['status']) || 'Completed',
    heroImage: row.hero_image || '',
    gallery: row.gallery_images?.length
      ? row.gallery_images
      : row.hero_image
      ? [row.hero_image]
      : [],
    floorPlanImage: row.floor_plan_image || undefined,
    tagline: row.tagline_en || '',
    taglineFa: row.tagline_fa || '',
    description: row.description_en || '',
    descriptionFa: row.description_fa || '',
    architecturalPhilosophy: row.architectural_philosophy_en || '',
    architecturalPhilosophyFa: row.architectural_philosophy_fa || '',
    leadArchitect: row.lead_architect_en || 'Atria Studio',
    leadArchitectFa: row.lead_architect_fa || 'استودیو آتریا',
    awards: row.awards_en || [],
    awardsFa: row.awards_fa || [],
    materials: Array.isArray(row.materials) ? row.materials : [],
    sustainabilityRating: row.sustainability_rating || '',
    climateApproach: row.climate_approach_en || '',
    climateApproachFa: row.climate_approach_fa || '',
    keyFeatures: row.key_features_en || [],
    keyFeaturesFa: row.key_features_fa || [],
    isFeatured: row.is_featured ?? false,
    coordinates: row.coordinates?.lat && row.coordinates?.lng
      ? { lat: row.coordinates.lat, lng: row.coordinates.lng }
      : undefined,
    regionName: row.region_name_en || undefined,
    regionNameFa: row.region_name_fa || undefined,
  };
}