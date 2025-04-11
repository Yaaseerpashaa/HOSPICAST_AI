/*
  # Create patients table and enable RLS

  1. New Tables
    - `patients`
      - `id` (uuid, primary key)
      - `name` (text)
      - `department` (text)
      - `admission_date` (timestamptz)
      - `discharge_date` (timestamptz, nullable)
      - `status` (text)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on patients table
    - Add policies for authenticated users to:
      - Read all patients
      - Insert their own patients
      - Update their own patients
*/

CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  department text NOT NULL,
  admission_date timestamptz NOT NULL DEFAULT now(),
  discharge_date timestamptz,
  status text NOT NULL DEFAULT 'Admitted',
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patients"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);