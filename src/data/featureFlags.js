// Feature flags for the university council system
// የዩኒቨርሲቲ ምክር ቤት ስርዓት የባህሪ ማብሪያ/ማጥፊያዎች

// Main feature flags / ዋና የባህሪ ማብሪያ/ማጥፊያዎች
export const FEATURES = {
  // Branch dropdown in header / በራስጌ ውስጥ የቅርንጫፍ ዝርዝር
  BRANCH_DROPDOWN: true,
  
  // Club representative features / የክለብ ተወካይ ባህሪዎች
  CLUB_UPLOAD: true,
  CLUB_APPROVAL: true,
  CLUB_VALIDATION: true,
  
  // Election system features / የምርጫ ስርዓት ባህሪዎች
  ELECTION_VALIDATOR: true,
  STUDENT_ID_VALIDATION: true,
  DUPLICATE_VOTE_CHECK: true,
  
  // Complaint system features / የቅሬታ ስርዓት ባህሪዎች
  COMPLAINT_ROUTING: true,
  ANONYMOUS_COMPLAINTS: true,
  FILE_ATTACHMENT: true,
  PRIORITY_SELECTION: true,
  
  // General features / አጠቃላይ ባህሪዎች
  MULTILINGUAL_SUPPORT: true,
  BULK_ACTIONS: true,
  DOCUMENT_PREVIEW: true,
  REAL_TIME_NOTIFICATIONS: false, // Disabled until backend ready
  
  // Security features / የደህንነት ባህሪዎች
  TWO_FACTOR_AUTH: false, // Future implementation
  AUDIT_LOGGING: true,
  ROLE_BASED_ACCESS: true,
  
  // Performance features / የአፈጻጸም ባህሪዎች
  LAZY_LOADING: true,
  CACHING: true,
  OFFLINE_SUPPORT: false // Future implementation
};

// Environment-specific feature overrides / የአካባቢ-ተኮር የባህሪ ለውጦች
export const getFeatureFlags = (environment = 'development') => {
  const baseFeatures = { ...FEATURES };
  
  switch (environment) {
    case 'production':
      return {
        ...baseFeatures,
        // Disable experimental features in production
        // በምርት ውስጥ የሙከራ ባህሪዎችን አሰናክል
        REAL_TIME_NOTIFICATIONS: false,
        OFFLINE_SUPPORT: false,
        TWO_FACTOR_AUTH: false
      };
      
    case 'staging':
      return {
        ...baseFeatures,
        // Enable more features in staging for testing
        // ለሙከራ በመድረክ ውስጥ ተጨማሪ ባህሪዎችን አንቃ
        REAL_TIME_NOTIFICATIONS: true,
        TWO_FACTOR_AUTH: true
      };
      
    case 'development':
    default:
      return baseFeatures;
  }
};

// Feature flag checker utility / የባህሪ ማብሪያ/ማጥፊያ መፈተሻ መገልገያ
export const isFeatureEnabled = (featureName, environment = 'development') => {
  const features = getFeatureFlags(environment);
  return features[featureName] || false;
};

// Branch-specific feature flags / የቅርንጫፍ-ተኮር የባህሪ ማብሪያ/ማጥፊያዎች
export const BRANCH_FEATURES = {
  president: {
    EMERGENCY_OVERRIDE: true,
    SYSTEM_ANNOUNCEMENTS: true,
    BULK_APPROVAL: true,
    ANALYTICS_ACCESS: true
  },
  
  student_din: {
    MEDIATION_CHANNEL: true,
    UNIVERSITY_LIAISON: true,
    PERFORMANCE_DASHBOARD: true,
    ESCALATION_RIGHTS: true
  },
  
  clubs_associations: {
    CLUB_APPROVAL: true,
    DOCUMENT_VALIDATION: true,
    BULK_ACTIONS: true,
    CLUB_ANALYTICS: true
  },
  
  academic_affairs: {
    ACADEMIC_COMPLAINTS: true,
    GRADE_DISPUTES: true,
    COURSE_FEEDBACK: true
  },
  
  dining_services: {
    MENU_MANAGEMENT: false, // Future implementation
    FEEDBACK_SYSTEM: true,
    QUALITY_REPORTS: true
  },
  
  general_service: {
    FACILITY_REQUESTS: true,
    MAINTENANCE_TRACKING: false, // Future implementation
    SERVICE_ANALYTICS: true
  },
  
  sports_culture: {
    EVENT_MANAGEMENT: false, // Future implementation
    FACILITY_BOOKING: false, // Future implementation
    SPORTS_ANALYTICS: true
  }
};

// Get branch-specific features / የቅርንጫፍ-ተኮር ባህሪዎች ያግኙ
export const getBranchFeatures = (branchRole) => {
  return BRANCH_FEATURES[branchRole] || {};
};

// Check if user has access to specific branch feature
// ተጠቃሚው ለተወሰነ የቅርንጫፍ ባህሪ መዳረሻ እንዳለው ያረጋግጡ
export const hasBranchFeature = (branchRole, featureName) => {
  const branchFeatures = getBranchFeatures(branchRole);
  return branchFeatures[featureName] || false;
};

// Feature rollout configuration / የባህሪ ማሰራጨት ውቅር
export const ROLLOUT_CONFIG = {
  // Percentage of users who get new features / አዲስ ባህሪዎች የሚያገኙ ተጠቃሚዎች መቶኛ
  BETA_USERS_PERCENTAGE: 10,
  
  // Feature rollout schedule / የባህሪ ማሰራጨት መርሃ ግብር
  ROLLOUT_SCHEDULE: {
    BRANCH_DROPDOWN: { enabled: true, rolloutDate: '2024-01-15' },
    CLUB_UPLOAD: { enabled: true, rolloutDate: '2024-01-20' },
    ELECTION_VALIDATOR: { enabled: true, rolloutDate: '2024-01-25' },
    COMPLAINT_ROUTING: { enabled: true, rolloutDate: '2024-02-01' },
    REAL_TIME_NOTIFICATIONS: { enabled: false, rolloutDate: '2024-03-01' }
  }
};

// Check if feature is in rollout / ባህሪው በማሰራጨት ላይ እንዳለ ያረጋግጡ
export const isFeatureInRollout = (featureName) => {
  const rolloutInfo = ROLLOUT_CONFIG.ROLLOUT_SCHEDULE[featureName];
  if (!rolloutInfo) return false;
  
  const rolloutDate = new Date(rolloutInfo.rolloutDate);
  const currentDate = new Date();
  
  return rolloutInfo.enabled && currentDate >= rolloutDate;
};

// Debug mode features / የማረም ሁነታ ባህሪዎች
export const DEBUG_FEATURES = {
  CONSOLE_LOGGING: process.env.NODE_ENV === 'development',
  PERFORMANCE_MONITORING: true,
  ERROR_BOUNDARY_DETAILS: process.env.NODE_ENV === 'development',
  FEATURE_FLAG_DISPLAY: process.env.NODE_ENV === 'development'
};

// Export all for easy access / ሁሉንም ለቀላል መዳረሻ ወደ ውጭ መላክ
export default {
  FEATURES,
  BRANCH_FEATURES,
  ROLLOUT_CONFIG,
  DEBUG_FEATURES,
  getFeatureFlags,
  isFeatureEnabled,
  getBranchFeatures,
  hasBranchFeature,
  isFeatureInRollout
};