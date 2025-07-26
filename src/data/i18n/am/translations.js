// Amharic translations for the university council system
// የዩኒቨርሲቲ ምክር ቤት ስርዓት አማርኛ ትርጉሞች

export const amharicTranslations = {
  // Common terms / የተለመዱ ቃላት
  common: {
    // Actions / እርምጃዎች
    approve: "አጽድቅ",
    reject: "ውድቅ አድርግ",
    submit: "መላክ",
    cancel: "ተመለስ",
    save: "አስቀምጥ",
    delete: "ሰርዝ",
    edit: "አርም",
    view: "ዝርዝር",
    search: "ፈልግ",
    filter: "አጣራ",
    select: "ይምረጡ",
    upload: "ላክ",
    download: "አውርድ",
    
    // Status / ሁኔታ
    pending: "በመጠባበቅ ላይ",
    approved: "ጸድቋል",
    rejected: "ተቀባይነት አላገኘም",
    active: "ንቁ",
    inactive: "ንቁ ያልሆነ",
    completed: "ተጠናቋል",
    
    // Priority / ቅድሚያ
    high: "ከፍተኛ",
    medium: "መካከለኛ",
    low: "ዝቅተኛ",
    
    // Time / ጊዜ
    today: "ዛሬ",
    yesterday: "ትናንት",
    tomorrow: "ነገ",
    thisWeek: "በዚህ ሳምንት",
    thisMonth: "በዚህ ወር",
    
    // Messages / መልዕክቶች
    success: "በተሳካ ሁኔታ",
    error: "ስህተት",
    warning: "ማስጠንቀቂያ",
    info: "መረጃ",
    loading: "እየተጫነ...",
    noData: "መረጃ የለም",
    accessDenied: "መዳረሻ ተከልክሏል"
  },

  // Navigation / አሰሳ
  navigation: {
    home: "መነሻ",
    dashboard: "ዳሽቦርድ",
    elections: "ምርጫዎች",
    clubs: "ክለቦች",
    complaints: "ቅሬታዎች",
    services: "አገልግሎቶች",
    about: "ስለ እኛ",
    contact: "ያግኙን",
    latest: "የቅርብ ጊዜ",
    login: "ግባ",
    logout: "ውጣ",
    profile: "መገለጫ"
  },

  // Branches / ቅርንጫፎች
  branches: {
    president: "ፕሬዝዳንት",
    studentDin: "የተማሪ ዲን",
    vicePresident: "ምክትል ፕሬዝዳንት",
    secretary: "ፀሐፊ",
    speaker: "ተናጋሪ",
    academicAffairs: "የትምህርት ጉዳዮች",
    generalService: "አጠቃላይ አገልግሎት",
    diningServices: "የምግብ አገልግሎት",
    sportsCulture: "ስፖርት እና ባህል",
    clubsAssociations: "ክለቦች እና ማህበራት",
    housingServices: "የመኖሪያ አገልግሎት",
    healthWelfare: "ጤና እና ደህንነት"
  },

  // Club system / የክለብ ስርዓት
  clubs: {
    // General / አጠቃላይ
    title: "ክለቦች እና ማህበራት",
    myClubs: "የእኔ ክለቦች",
    allClubs: "ሁሉም ክለቦች",
    joinClub: "ክለብ ተቀላቀል",
    createClub: "አዲስ ክለብ ፍጠር",
    
    // Club representative upload / የክለብ ተወካይ መላኪያ
    uploadTitle: "የክለብ ሰነድ መላኪያ",
    uploadDescription: "ሰነዶችን ወደ ተገቢው ቅርንጫፍ ይላኩ",
    documentType: "የሰነድ ዓይነት",
    targetBranch: "የታለመ ቅርንጫፍ",
    selectType: "ዓይነት ይምረጡ",
    selectBranch: "ቅርንጫፍ ይምረጡ",
    selectFiles: "ፋይሎች ይምረጡ",
    
    // Document types / የሰነድ ዓይነቶች
    monthlyReport: "ወርሃዊ ሪፖርት",
    eventProposal: "የዝግጅት ሀሳብ",
    budgetRequest: "የበጀት ጥያቄ",
    membershipList: "የአባላት ዝርዝር",
    other: "ሌላ",
    
    // Approval system / የማጽደቂያ ስርዓት
    approvalTitle: "የክለብ ሰነድ ማጽደቂያ",
    approvalDescription: "የክለብ ተወካዮች የላኩ ሰነዶችን ይገምግሙ እና ያጽድቁ",
    pendingDocuments: "በመጠባበቅ ላይ ያሉ ሰነዶች",
    approveAll: "ሁሉንም አጽድቅ",
    rejectAll: "ሁሉንም ውድቅ አድርግ",
    documentDetails: "የሰነድ ዝርዝር",
    attachedFiles: "ተያይዘው የመጡ ፋይሎች",
    
    // Messages / መልዕክቶች
    uploadSuccess: "ሰነዶች በተሳካ ሁኔታ ተልከዋል",
    uploadError: "ሰነዶች መላክ አልተሳካም",
    approvalSuccess: "ሰነድ ጸድቋል",
    rejectionSuccess: "ሰነድ ተቀባይነት አላገኘም",
    invalidFileType: "ተቀባይነት የሌለው ፋይል ዓይነት ነው",
    fileTooLarge: "ፋይል በጣም ትልቅ ነው",
    fillAllFields: "እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ",
    accessDeniedClubRep: "የክለብ ተወካይ ብቻ ሰነዶችን መላክ ይችላል",
    accessDeniedApproval: "የማጽደቅ ፈቃድ የለዎትም"
  },

  // Election system / የምርጫ ስርዓት
  elections: {
    // General / አጠቃላይ
    title: "የተማሪ ምርጫዎች",
    upcomingElections: "የሚመጡ ምርጫዎች",
    activeElections: "ንቁ ምርጫዎች",
    completedElections: "የተጠናቀቁ ምርጫዎች",
    vote: "ምረጥ",
    voteNow: "አሁን ምረጥ",
    viewResults: "ውጤቶች ይመልከቱ",
    candidates: "እጩዎች",
    
    // Validation / ማረጋገጥ
    validatorTitle: "የተማሪ መለያ ማረጋገጫ",
    validatorDescription: "ተማሪዎች ለመምረጥ ብቁ መሆናቸውን ያረጋግጡ",
    studentId: "የተማሪ መለያ",
    validate: "አረጋግጥ",
    validating: "እያረጋገጠ...",
    eligible: "ብቁ ነው",
    notEligible: "ብቁ አይደለም",
    
    // Validation checks / የማረጋገጫ ፍተሻዎች
    validationChecks: "ማረጋገጫ ፍተሻዎች",
    formatValidation: "የመለያ ቅርጸት ትክክለኛነት",
    studentExists: "ተማሪው በመረጃ ቋት ውስጥ መኖር",
    activeStatus: "ንቁ ተማሪ ሁኔታ",
    hasNotVoted: "በዚህ ምርጫ ውስጥ አልመረጠም",
    
    // Student information / የተማሪ መረጃ
    studentInfo: "የተማሪ መረጃ",
    name: "ስም",
    department: "ክፍል",
    year: "ዓመት",
    status: "ሁኔታ",
    
    // Messages / መልዕክቶች
    eligibleToVote: "ተማሪው ለመምረጥ ብቁ ነው",
    notEligibleToVote: "ተማሪው ለመምረጥ ብቁ አይደለም",
    invalidIdFormat: "የተማሪ መለያ ቅርጸት ትክክል አይደለም (DBU + 7 ቁጥሮች)",
    studentNotFound: "ተማሪው በመረጃ ቋት ውስጥ አልተገኘም",
    studentNotActive: "ተማሪው ንቁ አይደለም",
    alreadyVoted: "ተማሪው በዚህ ምርጫ ውስጥ አስቀድሞ መርጧል",
    validationError: "ማረጋገጫ ስህተት",
    recentValidations: "የቅርብ ጊዜ ማረጋገጫዎች"
  },

  // Complaint system / የቅሬታ ስርዓት
  complaints: {
    // General / አጠቃላይ
    title: "ቅሬታዎች እና ይግባኞች",
    submitComplaint: "ቅሬታ ማቅረቢያ ቅጽ",
    myComplaints: "የእኔ ቅሬታዎች",
    allComplaints: "ሁሉም ቅሬታዎች",
    
    // Form fields / የቅጽ መስኮች
    complaintTitle: "ርዕስ",
    description: "ዝርዝር መግለጫ",
    category: "ምድብ",
    targetBranch: "የታለመ ቅርንጫፍ",
    priority: "ቅድሚያ",
    contactEmail: "የመገናኛ ኢሜይል",
    evidenceFiles: "ማስረጃ ፋይሎች",
    submitAnonymously: "ስም ሳይገለጽ ላክ",
    
    // Categories / ምድቦች
    serviceQuality: "የአገልግሎት ጥራት",
    facilityIssue: "የመገልገያ ችግር",
    staffBehavior: "የሰራተኞች ባህሪ",
    policyConcern: "የፖሊሲ ጉዳይ",
    discrimination: "አድልዎ",
    safetySecurity: "ደህንነት እና ጸጥታ",
    
    // Priority descriptions / የቅድሚያ መግለጫዎች
    lowPriority: "አስቸኳይ ያልሆነ፣ ለመፍትሄ መጠበቅ ይችላል",
    mediumPriority: "መካከለኛ አስቸኳይነት፣ በቅርቡ መታየት አለበት",
    highPriority: "አስቸኳይ፣ ፈጣን ትኩረት ይፈልጋል",
    
    // Messages / መልዕክቶች
    submitSuccess: "ቅሬታዎ በተሳካ ሁኔታ ተልኳል",
    submitError: "ቅሬታ መላክ አልተሳካም",
    complaintId: "የቅሬታ መለያ",
    sentToBranch: "የተላከበት ቅርንጫፍ",
    expectedResponse: "የሚጠበቅ ምላሽ ጊዜ",
    anonymousNote: "ስም ሳይገለጽ ከላኩ ምላሽ ማግኘት አይችሉም",
    importantNotice: "አስፈላጊ ማስታወሻ",
    confidentialHandling: "ሁሉም ቅሬታዎች በሚስጥር ይያዛሉ",
    falseInfoConsequence: "የተሳሳተ መረጃ መስጠት ተጠያቂነትን ያስከትላል",
    responseTime: "ምላሽ በ2-3 የስራ ቀናት ውስጥ ይጠበቃል",
    
    // Placeholders / ቦታ ያዢዎች
    titlePlaceholder: "የቅሬታዎ አጭር ርዕስ",
    descriptionPlaceholder: "ቅሬታዎን በዝርዝር ይግለጹ። ምን ሆነ? መቼ ሆነ? የት ሆነ? ማን ተሳተፈ?",
    emailPlaceholder: "your.email@dbu.edu.et",
    filesPlaceholder: "ማስረጃ ፋይሎችን ለመላክ እዚህ ይጎትቱ ወይም ይጫኑ"
  },

  // User interface / የተጠቃሚ በይነገጽ
  ui: {
    // Language / ቋንቋ
    switchToEnglish: "Switch to English",
    switchToAmharic: "ወደ አማርኛ ቀይር",
    
    // Welcome messages / የእንኳን ደህና መጡ መልዕክቶች
    welcome: "እንኳን ደህና መጡ",
    goodMorning: "እንደምን አደሩ",
    goodAfternoon: "እንደምን ዋሉ",
    goodEvening: "እንደምን አመሹ",
    
    // Form validation / የቅጽ ማረጋገጥ
    required: "አስፈላጊ",
    optional: "አማራጭ",
    pleaseSelect: "እባክዎ ይምረጡ",
    pleaseEnter: "እባክዎ ያስገቡ",
    invalidFormat: "ትክክል ያልሆነ ቅርጸት",
    
    // File handling / የፋይል አያያዝ
    selectFiles: "ፋይሎች ይምረጡ",
    selectedFiles: "የተመረጡ ፋይሎች",
    removeFile: "ፋይል አስወግድ",
    fileSize: "የፋይል መጠን",
    supportedFormats: "የሚደገፉ ቅርጸቶች",
    
    // Buttons / ቁልፎች
    continue: "ቀጥል",
    back: "ተመለስ",
    next: "ቀጣይ",
    previous: "ቀዳሚ",
    close: "ዝጋ",
    open: "ክፈት",
    refresh: "አድስ",
    
    // Status indicators / የሁኔታ አመላካቾች
    online: "መስመር ላይ",
    offline: "መስመር ውጭ",
    connected: "ተገናኝቷል",
    disconnected: "ተቋርጧል",
    
    // Time indicators / የጊዜ አመላካቾች
    justNow: "አሁን ብቻ",
    minutesAgo: "ደቂቃዎች በፊት",
    hoursAgo: "ሰዓቶች በፊት",
    daysAgo: "ቀናት በፊት",
    
    // Pagination / ገጽ አሰላለፍ
    page: "ገጽ",
    of: "ከ",
    showing: "እያሳየ",
    results: "ውጤቶች",
    noResults: "ውጤት አልተገኘም"
  },

  // Error messages / የስህተት መልዕክቶች
  errors: {
    general: "አንድ ስህተት ተከስቷል",
    networkError: "የኔትወርክ ስህተት",
    serverError: "የአገልጋይ ስህተት",
    notFound: "አልተገኘም",
    unauthorized: "ፈቃድ የለም",
    forbidden: "ተከልክሏል",
    timeout: "ጊዜ አልፏል",
    invalidInput: "ትክክል ያልሆነ ግቤት",
    fileUploadError: "የፋይል መላክ ስህተት",
    validationError: "የማረጋገጥ ስህተት"
  },

  // Success messages / የስኬት መልዕክቶች
  success: {
    saved: "ተቀምጧል",
    updated: "ተዘምኗል",
    deleted: "ተሰርዟል",
    sent: "ተልኳል",
    uploaded: "ተላክቷል",
    approved: "ጸድቋል",
    rejected: "ተቀባይነት አላገኘም",
    completed: "ተጠናቋል"
  }
};

// Export default for easy importing / ለቀላል ማስመጣት ነባሪ ወደ ውጭ መላክ
export default amharicTranslations;