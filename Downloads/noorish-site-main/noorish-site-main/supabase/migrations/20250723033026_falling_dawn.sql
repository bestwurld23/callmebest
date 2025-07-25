/*
  # Initial Schema Setup for Noorish Site

  1. New Tables
    - `solar_quotes`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text, customer name)
      - `email` (text, customer email)
      - `phone` (text, customer phone)
      - `address` (text, property address)
      - `property_type` (text, type of property)
      - `roof_type` (text, type of roof)
      - `energy_bill` (numeric, monthly energy bill)
      - `timeline` (text, installation timeline)
      - `additional_info` (text, optional additional information)
      - `status` (text, quote status)
    
    - `workshops`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text, workshop title)
      - `description` (text, workshop description)
      - `instructor` (text, instructor name)
      - `duration` (text, workshop duration)
      - `price` (numeric, workshop price)
      - `max_participants` (integer, maximum participants)
      - `start_date` (timestamp, workshop start date)
      - `end_date` (timestamp, workshop end date)
      - `image_url` (text, optional workshop image)
      - `status` (text, workshop status)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access to workshops
    - Add policies for authenticated users to create quotes
    - Add policies for admin users to manage all data
*/

-- Create solar_quotes table
CREATE TABLE IF NOT EXISTS solar_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  property_type text NOT NULL CHECK (property_type IN ('house', 'apartment', 'townhouse', 'commercial')),
  roof_type text NOT NULL CHECK (roof_type IN ('tile', 'metal', 'flat', 'slate', 'other')),
  energy_bill numeric NOT NULL CHECK (energy_bill >= 0),
  timeline text NOT NULL CHECK (timeline IN ('immediate', '3_months', '6_months', '12_months')),
  additional_info text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'quoted', 'converted', 'closed'))
);

-- Create workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  instructor text NOT NULL,
  duration text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  max_participants integer NOT NULL CHECK (max_participants > 0),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  image_url text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed', 'cancelled'))
);

-- Enable Row Level Security
ALTER TABLE solar_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

-- Policies for solar_quotes
CREATE POLICY "Anyone can create quotes"
  ON solar_quotes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read own quotes"
  ON solar_quotes
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Admin users can read all quotes"
  ON solar_quotes
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admin users can update quotes"
  ON solar_quotes
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin');

-- Policies for workshops
CREATE POLICY "Anyone can read active workshops"
  ON workshops
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Admin users can read all workshops"
  ON workshops
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admin users can manage workshops"
  ON workshops
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'user_metadata' ->> 'role' = 'admin');

-- Insert sample workshops
INSERT INTO workshops (title, description, instructor, duration, price, max_participants, start_date, end_date, image_url, status) VALUES
(
  'AI Fundamentals for Business',
  'Learn the basics of artificial intelligence and how it can transform your business operations. This comprehensive workshop covers machine learning concepts, practical applications, and implementation strategies.',
  'Dr. Sarah Chen',
  '2 days',
  299,
  20,
  '2024-02-15 09:00:00+00',
  '2024-02-16 17:00:00+00',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
  'active'
),
(
  'Machine Learning for Marketing',
  'Discover how to leverage machine learning algorithms to optimize your marketing campaigns, predict customer behavior, and increase ROI. Hands-on exercises with real datasets included.',
  'Michael Rodriguez',
  '1 day',
  199,
  15,
  '2024-02-22 09:00:00+00',
  '2024-02-22 17:00:00+00',
  'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
  'active'
),
(
  'ChatGPT & AI Tools Masterclass',
  'Master the art of prompt engineering and learn to integrate AI tools like ChatGPT, Claude, and others into your daily workflow. Perfect for professionals looking to boost productivity.',
  'Emma Thompson',
  '4 hours',
  149,
  25,
  '2024-03-01 13:00:00+00',
  '2024-03-01 17:00:00+00',
  'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
  'active'
);