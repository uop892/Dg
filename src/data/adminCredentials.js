export const adminCredentials = [
  { email: "president@dbu.edu.et", role: "president" },
  { email: "studentdin@dbu.edu.et", role: "student_din" },
  { email: "academic@dbu.edu.et", role: "academic_affairs" },
  // Add more credentials as needed
];

// Function to check if the user has a specific permission
export const hasPermission = (email, permission) => {
  const user = adminCredentials.find((cred) => cred.email === email);
  if (!user) return false;

  // Define permissions based on roles
  const permissions = {
    president: ["admin", "manage_users", "view_reports"],
    student_din: ["manage_students", "view_reports"],
    academic_affairs: ["view_reports"],
    // Add more roles and their permissions as needed
  };

  return permissions[user.role]?.includes(permission) || false;
};
