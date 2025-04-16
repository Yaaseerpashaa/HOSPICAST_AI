export const patientData = [
  { id: 'P001', name: 'John Doe', age: 45, department: 'Cardiology', admission_date: '2024-01-15', length_of_stay: 5, severity: 'moderate', outcome: 'recovered' },
  { id: 'P002', name: 'Jane Smith', age: 62, department: 'Pulmonology', admission_date: '2024-01-16', length_of_stay: 8, severity: 'severe', outcome: 'recovered' },
  // ... add more patient records
];

export const staffData = [
  { id: 'S001', role: 'Doctor', department: 'Cardiology', experience: 10, shift_hours: 8, patients_handled: 15 },
  { id: 'S002', role: 'Nurse', department: 'ICU', experience: 5, shift_hours: 12, patients_handled: 8 },
  // ... add more staff records
];

export const wardData = [
  { id: 'W001', type: 'ICU', capacity: 25, current_occupancy: 18, equipment_count: 20 },
  { id: 'W002', type: 'General', capacity: 150, current_occupancy: 120, equipment_count: 45 },
  // ... add more ward records
];