// src/data/mockData.js
export const mockComplaints = [
  {
    id: "1",
    title: "Broken Chair",
    description: "The chair in the lab is broken.",
    status: "submitted",
    priority: "medium",
    submittedBy: "user123",
    submittedAt: new Date(),
    responses: [],
  },
];

export const generateCaseId = () => {
  return Math.floor(Math.random() * 100000).toString();
};
