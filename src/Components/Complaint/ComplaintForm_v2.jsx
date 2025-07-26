import React, { useState } from "react";
import { 
  Send, 
  Paperclip, 
  AlertCircle, 
  CheckCircle, 
  Building,
  MessageSquare,
  User,
  Mail
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Target branches for complaint routing / ለቅሬታ መላክ የታለሙ ቅርንጫፎች
const COMPLAINT_BRANCHES = [
  { 
    value: "dining", 
    label: "Dining Services (ምግብ ቤት አገልግሎት)",
    description: "Food quality, service, hygiene issues",
    descriptionAm: "የምግብ ጥራት፣ አገልግሎት፣ የንፅህና ጉዳዮች"
  },
  { 
    value: "general", 
    label: "General Service (አጠቃላይ አገልግሎት)",
    description: "Administrative, general campus services",
    descriptionAm: "አስተዳደራዊ፣ አጠቃላይ የካምፓስ አገልግሎቶች"
  },
  { 
    value: "academic", 
    label: "Academic Affairs (የትምህርት ጉዳዮች)",
    description: "Academic issues, course problems, grading",
    descriptionAm: "የትምህርት ጉዳዮች፣ የኮርስ ችግሮች፣ ውጤት"
  },
  { 
    value: "housing", 
    label: "Housing Services (የመኖሪያ አገልግሎት)",
    description: "Dormitory, accommodation issues",
    descriptionAm: "የመኖሪያ ቤት፣ የመጠለያ ጉዳዮች"
  },
  { 
    value: "sports", 
    label: "Sports & Culture (ስፖርት እና ባህል)",
    description: "Sports facilities, cultural events",
    descriptionAm: "የስፖርት መገልገያዎች፣ የባህል ዝግጅቶች"
  },
  { 
    value: "clubs", 
    label: "Clubs & Associations (ክለቦች እና ማህበራት)",
    description: "Club activities, membership issues",
    descriptionAm: "የክለብ እንቅስቃሴዎች፣ የአባልነት ጉዳዮች"
  },
  { 
    value: "student_din", 
    label: "Student Din (የተማሪ ዲን)",
    description: "Student welfare, disciplinary matters",
    descriptionAm: "የተማሪዎች ደህንነት፣ የዲሲፕሊን ጉዳዮች"
  }
];

// Complaint categories / የቅሬታ ምድቦች
const COMPLAINT_CATEGORIES = [
  { value: "service_quality", label: "Service Quality (የአገልግሎት ጥራት)" },
  { value: "facility_issue", label: "Facility Issue (የመገልገያ ችግር)" },
  { value: "staff_behavior", label: "Staff Behavior (የሰራተኞች ባህሪ)" },
  { value: "policy_concern", label: "Policy Concern (የፖሊሲ ጉዳይ)" },
  { value: "discrimination", label: "Discrimination (አድልዎ)" },
  { value: "safety_security", label: "Safety & Security (ደህንነት እና ጸጥታ)" },
  { value: "other", label: "Other (ሌላ)" }
];

// Priority levels / የቅድሚያ ደረጃዎች
const PRIORITY_LEVELS = [
  { 
    value: "low", 
    label: "Low (ዝቅተኛ)", 
    color: "green",
    description: "Non-urgent, can wait for resolution",
    descriptionAm: "አስቸኳይ ያልሆነ፣ ለመፍትሄ መጠበቅ ይችላል"
  },
  { 
    value: "medium", 
    label: "Medium (መካከለኛ)", 
    color: "yellow",
    description: "Moderate urgency, should be addressed soon",
    descriptionAm: "መካከለኛ አስቸኳይነት፣ በቅርቡ መታየት አለበት"
  },
  { 
    value: "high", 
    label: "High (ከፍተኛ)", 
    color: "red",
    description: "Urgent, requires immediate attention",
    descriptionAm: "አስቸኳይ፣ ፈጣን ትኩረት ይፈልጋል"
  }
];

// Feature flags / የባህሪ ማብሪያ/ማጥፊያዎች
const FEATURES = {
  COMPLAINT_ROUTING: true,
  FILE_ATTACHMENT: true,
  PRIORITY_SELECTION: true,
  ANONYMOUS_COMPLAINTS: true
};

export function ComplaintForm_v2() {
  const { user } = useAuth();
  const [isAmharic, setIsAmharic] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    title: "",
    description: "",
    category: "",
    targetBranch: "",
    priority: "medium",
    isAnonymous: false,
    contactEmail: user?.email || "",
    files: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Handle form input changes / የቅጽ ግቤት ለውጦች አያያዝ
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComplaintForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Handle file selection / የፋይል ምርጫ አያያዝ
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file types and sizes / የፋይል ዓይነቶች እና መጠኖች ያረጋግጡ
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        toast.error(
          isAmharic 
            ? `${file.name} ተቀባይነት የሌለው ፋይል ዓይነት ነው` 
            : `${file.name} is not a valid file type`
        );
        return false;
      }
      
      if (file.size > maxSize) {
        toast.error(
          isAmharic 
            ? `${file.name} በጣም ትልቅ ነው (ከ5MB በላይ)` 
            : `${file.name} is too large (over 5MB)`
        );
        return false;
      }
      
      return true;
    });

    setComplaintForm(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  // Remove file / ፋይል ያስወግዱ
  const removeFile = (index) => {
    setComplaintForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Generate complaint ID / የቅሬታ መለያ ይፍጠሩ
  const generateComplaintId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `COMP-${timestamp}-${random}`;
  };

  // Handle form submission / የቅጽ አቅራቢያ አያያዝ
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation / ማረጋገጥ
    if (!complaintForm.title.trim() || !complaintForm.description.trim() || !complaintForm.targetBranch || !complaintForm.category) {
      toast.error(
        isAmharic 
          ? "እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ" 
          : "Please fill all required fields"
      );
      return;
    }

    if (!complaintForm.isAnonymous && !complaintForm.contactEmail.trim()) {
      toast.error(
        isAmharic 
          ? "እባክዎ የመገናኛ ኢሜይል ያስገቡ" 
          : "Please provide contact email"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call / API ጥሪ ማስመሰል
      await new Promise(resolve => setTimeout(resolve, 2000));

      const complaintId = generateComplaintId();
      const targetBranch = COMPLAINT_BRANCHES.find(b => b.value === complaintForm.targetBranch);

      const result = {
        id: complaintId,
        submittedAt: new Date(),
        targetBranch: targetBranch?.label,
        estimatedResponse: "2-3 business days"
      };

      setSubmitResult(result);

      toast.success(
        isAmharic 
          ? `ቅሬታዎ በተሳካ ሁኔታ ተልኳል። መለያ: ${complaintId}` 
          : `Complaint submitted successfully. ID: ${complaintId}`
      );

      // Reset form / ቅጽ ዳግም ያስጀምሩ
      setComplaintForm({
        title: "",
        description: "",
        category: "",
        targetBranch: "",
        priority: "medium",
        isAnonymous: false,
        contactEmail: user?.email || "",
        files: []
      });

    } catch (error) {
      toast.error(
        isAmharic 
          ? "ቅሬታ መላክ አልተሳካም" 
          : "Failed to submit complaint"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get priority color / የቅድሚያ ቀለም ያግኙ
  const getPriorityColor = (priority) => {
    const level = PRIORITY_LEVELS.find(p => p.value === priority);
    return level ? level.color : "gray";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isAmharic ? "ቅሬታ ማቅረቢያ ቅጽ" : "Complaint Submission Form"}
            </h1>
            <p className="text-gray-600">
              {isAmharic 
                ? "ቅሬታዎን ወደ ተገቢው ቅርንጫፍ ይላኩ" 
                : "Submit your complaint to the appropriate branch"}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsAmharic(!isAmharic)}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
        >
          {isAmharic ? "EN" : "አማ"}
        </button>
      </div>

      {/* Success Message */}
      {submitResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                {isAmharic ? "ቅሬታ በተሳካ ሁኔታ ተልኳል!" : "Complaint Submitted Successfully!"}
              </h3>
              <div className="space-y-2 text-sm text-green-800">
                <p>
                  <strong>{isAmharic ? "የቅሬታ መለያ:" : "Complaint ID:"}</strong> {submitResult.id}
                </p>
                <p>
                  <strong>{isAmharic ? "የተላከበት ቅርንጫፍ:" : "Sent to Branch:"}</strong> {submitResult.targetBranch}
                </p>
                <p>
                  <strong>{isAmharic ? "የሚጠበቅ ምላሽ ጊዜ:" : "Expected Response Time:"}</strong> {submitResult.estimatedResponse}
                </p>
              </div>
              <p className="text-green-700 mt-3">
                {isAmharic 
                  ? "የቅሬታ መለያዎን ይያዙ እና ሁኔታውን በዳሽቦርድዎ ውስጥ መከታተል ይችላሉ።" 
                  : "Please keep your complaint ID and track the status in your dashboard."}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Complaint Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Target Branch Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isAmharic ? "የታለመ ቅርንጫፍ" : "Target Branch"} *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select
                name="targetBranch"
                value={complaintForm.targetBranch}
                onChange={handleInputChange}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">
                  {isAmharic ? "ቅርንጫፍ ይምረጡ" : "Select Branch"}
                </option>
                {COMPLAINT_BRANCHES.map(branch => (
                  <option key={branch.value} value={branch.value}>
                    {branch.label}
                  </option>
                ))}
              </select>
            </div>
            {complaintForm.targetBranch && (
              <p className="text-sm text-gray-600 mt-2">
                {isAmharic 
                  ? COMPLAINT_BRANCHES.find(b => b.value === complaintForm.targetBranch)?.descriptionAm
                  : COMPLAINT_BRANCHES.find(b => b.value === complaintForm.targetBranch)?.description}
              </p>
            )}
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAmharic ? "ምድብ" : "Category"} *
              </label>
              <select
                name="category"
                value={complaintForm.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">
                  {isAmharic ? "ምድብ ይምረጡ" : "Select Category"}
                </option>
                {COMPLAINT_CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAmharic ? "ቅድሚያ" : "Priority"} *
              </label>
              <div className="space-y-2">
                {PRIORITY_LEVELS.map(priority => (
                  <label key={priority.value} className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={complaintForm.priority === priority.value}
                      onChange={handleInputChange}
                      className={`mt-1 h-4 w-4 text-${priority.color}-600 focus:ring-${priority.color}-500`}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{priority.label}</div>
                      <div className="text-sm text-gray-600">
                        {isAmharic ? priority.descriptionAm : priority.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isAmharic ? "ርዕስ" : "Title"} *
            </label>
            <input
              type="text"
              name="title"
              value={complaintForm.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={isAmharic ? "የቅሬታዎ አጭር ርዕስ" : "Brief title of your complaint"}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isAmharic ? "ዝርዝር መግለጫ" : "Detailed Description"} *
            </label>
            <textarea
              name="description"
              value={complaintForm.description}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={isAmharic 
                ? "ቅሬታዎን በዝርዝር ይግለጹ። ምን ሆነ? መቼ ሆነ? የት ሆነ? ማን ተሳተፈ?" 
                : "Describe your complaint in detail. What happened? When? Where? Who was involved?"}
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={complaintForm.isAnonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  {isAmharic ? "ስም ሳይገለጽ ላክ" : "Submit Anonymously"}
                </label>
              </div>
              <p className="text-xs text-gray-500">
                {isAmharic 
                  ? "ስም ሳይገለጽ ከላኩ ምላሽ ማግኘት አይችሉም" 
                  : "Anonymous complaints cannot receive direct responses"}
              </p>
            </div>

            {!complaintForm.isAnonymous && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isAmharic ? "የመገናኛ ኢሜይል" : "Contact Email"} *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="contactEmail"
                    value={complaintForm.contactEmail}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={isAmharic ? "your.email@dbu.edu.et" : "your.email@dbu.edu.et"}
                    required={!complaintForm.isAnonymous}
                  />
                </div>
              </div>
            )}
          </div>

          {/* File Attachments */}
          {FEATURES.FILE_ATTACHMENT && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAmharic ? "ማስረጃ ፋይሎች" : "Evidence Files"}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  {isAmharic 
                    ? "ማስረጃ ፋይሎችን ለመላክ እዚህ ይጎትቱ ወይም ይጫኑ" 
                    : "Drag and drop evidence files here or click to upload"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {isAmharic 
                    ? "JPG, PNG, PDF, Word (ከ5MB በታች)" 
                    : "JPG, PNG, PDF, Word (under 5MB)"}
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="evidence-upload"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />
                <label
                  htmlFor="evidence-upload"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer inline-block"
                >
                  {isAmharic ? "ፋይሎች ይምረጡ" : "Select Files"}
                </label>
              </div>

              {/* Selected Files */}
              {complaintForm.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    {isAmharic ? "የተመረጡ ፋይሎች:" : "Selected Files:"}
                  </h4>
                  {complaintForm.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Paperclip className="w-4 h-4 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">
                  {isAmharic ? "አስፈላጊ ማስታወሻ:" : "Important Notice:"}
                </p>
                <ul className="space-y-1 text-blue-700">
                  <li>
                    • {isAmharic 
                      ? "ሁሉም ቅሬታዎች በሚስጥር ይያዛሉ" 
                      : "All complaints are handled confidentially"}
                  </li>
                  <li>
                    • {isAmharic 
                      ? "የተሳሳተ መረጃ መስጠት ተጠያቂነትን ያስከትላል" 
                      : "Providing false information may result in consequences"}
                  </li>
                  <li>
                    • {isAmharic 
                      ? "ምላሽ በ2-3 የስራ ቀናት ውስጥ ይጠበቃል" 
                      : "Response expected within 2-3 business days"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {isAmharic ? "ተመለስ" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isAmharic ? "እየተላከ..." : "Submitting..."}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{isAmharic ? "ቅሬታ ላክ" : "Submit Complaint"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}