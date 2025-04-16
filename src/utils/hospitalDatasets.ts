export const hospitalDatasets = {
  generalHospital: {
    name: "General Hospital",
    patients: [
      { age: 45, length_of_stay: 5, severity: "moderate", department: "Cardiology", outcome: "recovered" },
      { age: 62, length_of_stay: 8, severity: "severe", department: "Pulmonology", outcome: "recovered" },
      // Add more patient records
    ],
    resources: {
      icu_beds: { current: 18, capacity: 25 },
      staff: { current: 45, capacity: 55 },
      ventilators: { current: 12, capacity: 20 }
    }
  },
  specialtyClinic: {
    name: "Specialty Clinic",
    patients: [
      { age: 35, length_of_stay: 3, severity: "mild", department: "Orthopedics", outcome: "recovered" },
      { age: 58, length_of_stay: 6, severity: "moderate", department: "Neurology", outcome: "transferred" },
      // Add more patient records
    ],
    resources: {
      icu_beds: { current: 12, capacity: 15 },
      staff: { current: 30, capacity: 40 },
      ventilators: { current: 8, capacity: 10 }
    }
  },
  emergencyCenter: {
    name: "Emergency Center",
    patients: [
      { age: 28, length_of_stay: 2, severity: "severe", department: "ICU", outcome: "recovered" },
      { age: 75, length_of_stay: 10, severity: "severe", department: "Cardiology", outcome: "deceased" },
      // Add more patient records
    ],
    resources: {
      icu_beds: { current: 25, capacity: 30 },
      staff: { current: 60, capacity: 75 },
      ventilators: { current: 20, capacity: 25 }
    }
  }
};