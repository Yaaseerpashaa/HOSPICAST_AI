/*
  # Fix patients table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Create new, corrected RLS policies for patients table
    - Ensure proper user_id handling in policies

  2. Security
    - Maintain RLS enabled
    - Fix policies for proper access control
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all patients" ON patients;
DROP POLICY IF EXISTS "Users can insert their own patients" ON patients;
DROP POLICY IF EXISTS "Users can update their own patients" ON patients;

-- Create new policies with correct conditions
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
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);