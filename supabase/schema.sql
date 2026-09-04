-- ============================================================
-- Atria Architecture — Supabase Schema (Production Ready)
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_fa TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'villa', 'residential', 'commercial', 'interior', 'cultural', 'renovation', 'adaptive-reuse'
  )),
  category_en TEXT,
  category_fa TEXT,
  location_en TEXT,
  location_fa TEXT,
  year INT,
  area_sqm INT,
  status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'Under Construction', 'Concept')),
  tagline_en TEXT,
  tagline_fa TEXT,
  description_en TEXT,
  description_fa TEXT,
  architectural_philosophy_en TEXT,
  architectural_philosophy_fa TEXT,
  lead_architect_en TEXT,
  lead_architect_fa TEXT,
  hero_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  floor_plan_image TEXT,
  materials JSONB DEFAULT '[]',
  key_features_en TEXT[] DEFAULT '{}',
  key_features_fa TEXT[] DEFAULT '{}',
  awards_en TEXT[] DEFAULT '{}',
  awards_fa TEXT[] DEFAULT '{}',
  sustainability_rating TEXT,
  climate_approach_en TEXT,
  climate_approach_fa TEXT,
  is_featured BOOLEAN DEFAULT false,
  coordinates JSONB,
  region_name_en TEXT,
  region_name_fa TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Consultation Requests (from website forms)
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name VARCHAR NOT NULL,
  phone_email VARCHAR NOT NULL,
  project_type VARCHAR,
  estimated_budget VARCHAR,
  location VARCHAR,
  notes TEXT,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. AI Consultation Logs
CREATE TABLE IF NOT EXISTS ai_consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_type VARCHAR,
  land_area INT,
  budget_level VARCHAR,
  generated_concept JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Profiles (for admin role check)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger for projects
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Projects: public can READ, only admins can WRITE
CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Consultation requests: anyone can INSERT (form), only admins can READ/UPDATE
CREATE POLICY "Anyone can submit consultation"
  ON consultation_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view consultation requests"
  ON consultation_requests FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update consultation requests"
  ON consultation_requests FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete consultation requests"
  ON consultation_requests FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- AI logs: anyone can INSERT, only admins can READ
CREATE POLICY "Anyone can log AI consultation"
  ON ai_consultations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view AI logs"
  ON ai_consultations FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Profiles: users can read own profile, admins can read all
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_consultation_status ON consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_created ON consultation_requests(created_at DESC);

-- ============================================================
-- IMPORTANT: After creating the first admin user via Supabase Auth,
-- run this (replace the email):
--
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
-- ============================================================
