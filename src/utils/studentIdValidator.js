// Student ID validation utilities for DBU election system
// ለDBU ምርጫ ስርዓት የተማሪ መለያ ማረጋገጫ መገልገያዎች

/**
 * Validates DBU student ID format
 * የDBU ተማሪ መለያ ቅርጸት ያረጋግጣል
 * 
 * @param {string} id - Student ID to validate / ለማረጋገጥ የተማሪ መለያ
 * @returns {boolean} - True if valid format / ትክክለኛ ቅርጸት ከሆነ እውነት
 */
export const isValidStudentId = (id) => {
  if (!id || typeof id !== 'string') {
    return false;
  }
  
  // DBU followed by exactly 7 digits / DBU ከዚያ በኋላ በትክክል 7 ቁጥሮች
  const pattern = /^DBU\d{7}$/;
  return pattern.test(id.trim().toUpperCase());
};

/**
 * Extracts year from student ID
 * ከተማሪ መለያ ዓመት ያወጣል
 * 
 * @param {string} id - Student ID / የተማሪ መለያ
 * @returns {number|null} - Admission year or null if invalid / የመግቢያ ዓመት ወይም ትክክል ካልሆነ ባዶ
 */
export const extractYearFromId = (id) => {
  if (!isValidStudentId(id)) {
    return null;
  }
  
  // Extract first 4 digits after DBU / ከDBU በኋላ የመጀመሪያዎቹን 4 ቁጥሮች አውጣ
  const yearStr = id.substring(3, 7);
  const year = parseInt(yearStr, 10);
  
  // Validate year range (assuming DBU started in 2000) / የዓመት ክልል አረጋግጥ (DBU በ2000 እንደጀመረ በመገመት)
  if (year >= 2000 && year <= new Date().getFullYear()) {
    return year;
  }
  
  return null;
};

/**
 * Calculates current academic year for a student
 * ለተማሪ የአሁኑን የትምህርት ዓመት ያሰላል
 * 
 * @param {string} id - Student ID / የተማሪ መለያ
 * @returns {number|null} - Current academic year (1-7) or null / የአሁኑ የትምህርት ዓመት (1-7) ወይም ባዶ
 */
export const calculateAcademicYear = (id) => {
  const admissionYear = extractYearFromId(id);
  if (!admissionYear) {
    return null;
  }
  
  const currentYear = new Date().getFullYear();
  const academicYear = currentYear - admissionYear + 1;
  
  // Validate academic year range (1-7 for undergraduate + graduate)
  // የትምህርት ዓመት ክልል አረጋግጥ (1-7 ለመጀመሪያ ዲግሪ + ድህረ ምረቃ)
  if (academicYear >= 1 && academicYear <= 7) {
    return academicYear;
  }
  
  return null;
};

/**
 * Generates a random valid student ID for testing
 * ለሙከራ የዘፈቀደ ትክክለኛ የተማሪ መለያ ይፈጥራል
 * 
 * @param {number} year - Admission year / የመግቢያ ዓመት
 * @returns {string} - Generated student ID / የተፈጠረ የተማሪ መለያ
 */
export const generateStudentId = (year = new Date().getFullYear()) => {
  // Generate random 3-digit sequence number / የዘፈቀደ 3-አሃዝ ቅደም ተከተል ቁጥር ይፍጠሩ
  const sequenceNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `DBU${year}${sequenceNumber}`;
};

/**
 * Validates multiple student IDs
 * ብዙ የተማሪ መለያዎችን ያረጋግጣል
 * 
 * @param {string[]} ids - Array of student IDs / የተማሪ መለያዎች ድርድር
 * @returns {Object} - Validation results / የማረጋገጫ ውጤቶች
 */
export const validateMultipleIds = (ids) => {
  if (!Array.isArray(ids)) {
    return { valid: [], invalid: [], duplicates: [] };
  }
  
  const valid = [];
  const invalid = [];
  const seen = new Set();
  const duplicates = [];
  
  ids.forEach(id => {
    const cleanId = id?.trim().toUpperCase();
    
    if (!cleanId) {
      invalid.push({ id, reason: 'Empty or null ID' });
      return;
    }
    
    if (seen.has(cleanId)) {
      duplicates.push(cleanId);
      return;
    }
    
    seen.add(cleanId);
    
    if (isValidStudentId(cleanId)) {
      valid.push(cleanId);
    } else {
      invalid.push({ 
        id: cleanId, 
        reason: 'Invalid format (expected: DBU + 7 digits)' 
      });
    }
  });
  
  return { valid, invalid, duplicates };
};

/**
 * Formats student ID for display
 * የተማሪ መለያን ለማሳያ ይቀርጻል
 * 
 * @param {string} id - Student ID / የተማሪ መለያ
 * @returns {string} - Formatted ID / የተቀረጸ መለያ
 */
export const formatStudentId = (id) => {
  if (!isValidStudentId(id)) {
    return id;
  }
  
  const cleanId = id.trim().toUpperCase();
  // Format as DBU-YYYY-XXX for better readability
  // ለተሻለ ንባብ እንደ DBU-YYYY-XXX ቅረጽ
  return `${cleanId.substring(0, 3)}-${cleanId.substring(3, 7)}-${cleanId.substring(7)}`;
};

/**
 * Parses formatted student ID back to standard format
 * የተቀረጸ የተማሪ መለያን ወደ መደበኛ ቅርጸት ይመልሳል
 * 
 * @param {string} formattedId - Formatted student ID / የተቀረጸ የተማሪ መለያ
 * @returns {string} - Standard format ID / መደበኛ ቅርጸት መለያ
 */
export const parseFormattedId = (formattedId) => {
  if (!formattedId) return '';
  
  // Remove hyphens and convert to uppercase / ሰረዞችን አስወግድ እና ወደ ላይኛ ፊደል ቀይር
  return formattedId.replace(/-/g, '').trim().toUpperCase();
};

/**
 * Gets student ID validation error message
 * የተማሪ መለያ ማረጋገጫ የስህተት መልዕክት ያገኛል
 * 
 * @param {string} id - Student ID / የተማሪ መለያ
 * @param {boolean} isAmharic - Return message in Amharic / መልዕክቱን በአማርኛ መመለስ
 * @returns {string|null} - Error message or null if valid / የስህተት መልዕክት ወይም ትክክል ከሆነ ባዶ
 */
export const getValidationError = (id, isAmharic = false) => {
  if (!id || typeof id !== 'string') {
    return isAmharic 
      ? 'የተማሪ መለያ ያስፈልጋል' 
      : 'Student ID is required';
  }
  
  const cleanId = id.trim();
  
  if (cleanId.length === 0) {
    return isAmharic 
      ? 'የተማሪ መለያ ባዶ ሊሆን አይችልም' 
      : 'Student ID cannot be empty';
  }
  
  if (cleanId.length !== 10) {
    return isAmharic 
      ? 'የተማሪ መለያ 10 ቁምፊዎች ሊሆን አለበት (DBU + 7 ቁጥሮች)' 
      : 'Student ID must be 10 characters (DBU + 7 digits)';
  }
  
  if (!cleanId.toUpperCase().startsWith('DBU')) {
    return isAmharic 
      ? 'የተማሪ መለያ በDBU መጀመር አለበት' 
      : 'Student ID must start with DBU';
  }
  
  const numberPart = cleanId.substring(3);
  if (!/^\d{7}$/.test(numberPart)) {
    return isAmharic 
      ? 'ከDBU በኋላ በትክክል 7 ቁጥሮች መሆን አለባቸው' 
      : 'Must have exactly 7 digits after DBU';
  }
  
  const year = parseInt(numberPart.substring(0, 4), 10);
  const currentYear = new Date().getFullYear();
  
  if (year < 2000 || year > currentYear) {
    return isAmharic 
      ? `ዓመት በ2000 እና ${currentYear} መካከል መሆን አለበት` 
      : `Year must be between 2000 and ${currentYear}`;
  }
  
  return null; // Valid ID / ትክክለኛ መለያ
};

/**
 * Student ID validation configuration
 * የተማሪ መለያ ማረጋገጫ ውቅር
 */
export const VALIDATION_CONFIG = {
  // ID format pattern / የመለያ ቅርጸት ንድፍ
  PATTERN: /^DBU\d{7}$/,
  
  // Minimum and maximum years / ዝቅተኛ እና ከፍተኛ ዓመቶች
  MIN_YEAR: 2000,
  MAX_YEAR: new Date().getFullYear(),
  
  // ID length / የመለያ ርዝመት
  TOTAL_LENGTH: 10,
  PREFIX_LENGTH: 3,
  NUMBER_LENGTH: 7,
  
  // Prefix / ቅድመ ቅጥያ
  PREFIX: 'DBU',
  
  // Error messages / የስህተት መልዕክቶች
  ERRORS: {
    REQUIRED: {
      en: 'Student ID is required',
      am: 'የተማሪ መለያ ያስፈልጋል'
    },
    INVALID_FORMAT: {
      en: 'Invalid student ID format (expected: DBU + 7 digits)',
      am: 'የተማሪ መለያ ቅርጸት ትክክል አይደለም (የሚጠበቀው: DBU + 7 ቁጥሮች)'
    },
    INVALID_YEAR: {
      en: 'Invalid admission year',
      am: 'ትክክል ያልሆነ የመግቢያ ዓመት'
    }
  }
};

// Export all utilities / ሁሉንም መገልገያዎች ወደ ውጭ መላክ
export default {
  isValidStudentId,
  extractYearFromId,
  calculateAcademicYear,
  generateStudentId,
  validateMultipleIds,
  formatStudentId,
  parseFormattedId,
  getValidationError,
  VALIDATION_CONFIG
};