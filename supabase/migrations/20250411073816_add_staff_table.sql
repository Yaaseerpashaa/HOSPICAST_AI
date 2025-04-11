/*
  # Create staff table and enable RLS

  1. New Tables
    - `staff`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `department` (text)
      - `shift` (text)
      - `status` (text)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on staff table
    - Add policies for authenticated users to:
      - Read all staff
      - Insert new staff records
      - Update staff records
*/

CREATE TABLE staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department text NOT NULL,
  shift text NOT NULL,
  status text NOT NULL DEFAULT 'Active',
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all staff"
  ON staff
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert staff records"
  ON staff
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update staff records"
  ON staff
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add a trigger to the staff table
CREATE TRIGGER update_staff_updated_at
BEFORE UPDATE ON staff
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 