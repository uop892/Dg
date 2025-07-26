import React, { useState } from "react";
import { Upload, FileText, Send, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Club representatives data / የክለብ ተወካዮች መረጃ
const CLUB_REPRESENTATIVES = [
  { id: "DBU2021001", name: "አበበ ተስፋዬ", club: "Drama Club" },
  { id: "DBU2021002", name: "ሄኖክ መኮንን", club: "Computer Science Society" },
  { id: "DBU2021003", name: "ብርሃን አለሙ", club: "Environmental Club" },
  // Add more representatives / ተጨማሪ ተወካዮች ይጨምሩ
];

// Target branches for document routing / ለሰነድ መላክ የታለሙ ቅርንጫፎች
const TARGET_BRANCHES = [
  { value: "clubs", label: "Clubs & Associations (ክለቦች እና ማህበራት)" },
  { value: "academic", label: "Academic Affairs (የትምህርት ጉዳዮች)" },
  { value: "student_din", label: "Student Din (የተማሪ ዲን)" },
  { value: "general", label: "General Service (አጠቃላይ አገልግሎት)" }
];

// Document types / የሰነድ ዓይነቶች
const DOCUMENT_TYPES = [
  { value: "monthly_report", label: "Monthly Report (ወርሃዊ ሪፖርት)" },
  { value: "event_proposal", label: "Event Proposal (የዝግጅት ሀሳብ)" },
  { value: "budget_request", label: "Budget Request (የበጀት ጥያቄ)" },
  { value: "membership_list", label: "Membership List (የአባላት ዝርዝር)" },
  { value: "other", label: "Other (ሌላ)" }
];

// Feature flags / የባህሪ ማብሪያ/ማጥፊያዎች
const FEATURES = {
  CLUB_UPLOAD: true,
  FILE_VALIDATION: true,
  BRANCH_ROUTING: true
};

export function ClubRepUpload_v2() {
  const { user } = useAuth();
  const [isAmharic, setIsAmharic] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    documentType: "",
    targetBranch: "",
    title: "",
    description: "",
    files: [],
    priority: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Check if user is club representative / ተጠቃሚው የክለብ ተወካይ መሆኑን ያረጋግጡ
  const isClubRep = (userId) => {
    if (!userId) return false;
    return CLUB_REPRESENTATIVES.some(rep => rep.id === userId);
  };

  // Get club representative info / የክለብ ተወካይ መረጃ ያግኙ
  const getClubRepInfo = (userId) => {
    return CLUB_REPRESENTATIVES.find(rep => rep.id === userId);
  };

  // Handle file selection / የፋይል ምርጫ አያያዝ
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file types and sizes / የፋይል ዓይነቶች እና መጠኖች ያረጋግጡ
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        toast.error(isAmharic ? `${file.name} ተቀባይነት የሌለው ፋይል ዓይነት ነው` : `${file.name} is not a valid file type`);
        return false;
      }
      
      if (file.size > maxSize) {
        toast.error(isAmharic ? `${file.name} በጣም ትልቅ ነው (ከ10MB በላይ)` : `${file.name} is too large (over 10MB)`);
        return false;
      }
      
      return true;
    });

    setUploadForm(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  // Remove file / ፋይል ያስወግዱ
  const removeFile = (index) => {
    setUploadForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission / የቅጽ አቅራቢያ አያያዝ
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isClubRep(user?.id)) {
      toast.error(isAmharic ? "የክለብ ተወካይ ብቻ ሰነዶችን መላክ ይችላል" : "Only club representatives can upload documents");
      return;
    }

    if (!uploadForm.documentType || !uploadForm.targetBranch || !uploadForm.title || uploadForm.files.length === 0) {
      toast.error(isAmharic ? "እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ" : "Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Simulate file upload progress / የፋይል መላክ ሂደት ማስመሰል
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call / API ጥሪ ማስመሰል
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadProgress(100);
      
      // Generate submission ID / የማቅረቢያ መለያ ይፍጠሩ
      const submissionId = `DOC-${Date.now()}`;
      
      toast.success(
        isAmharic 
          ? `ሰነዶች በተሳካ ሁኔታ ተልከዋል። መለያ: ${submissionId}` 
          : `Documents uploaded successfully. ID: ${submissionId}`
      );

      // Reset form / ቅጽ ዳግም ያስጀምሩ
      setUploadForm({
        documentType: "",
        targetBranch: "",
        title: "",
        description: "",
        files: [],
        priority: "medium"
      });
      setUploadProgress(0);

    } catch (error) {
      toast.error(isAmharic ? "ሰነዶች መላክ አልተሳካም" : "Failed to upload documents");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not a club representative, show access denied / የክለብ ተወካይ ካልሆነ መዳረሻ ተከልክሏል ያሳዩ
  if (!isClubRep(user?.id)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isAmharic ? "መዳረሻ ተከልክሏል" : "Access Denied"}
          </h2>
          <p className="text-gray-600">
            {isAmharic 
              ? "ይህ ገጽ የክለብ ተወካዮች ብቻ ነው የሚጠቀሙት" 
              : "This page is only accessible to club representatives"}
          </p>
        </div>
      </div>
    );
  }

  const repInfo = getClubRepInfo(user?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {isAmharic ? "የክለብ ሰነድ መላኪያ" : "Club Document Upload"}
              </h1>
              <p className="text-blue-100">
                {isAmharic 
                  ? `እንኳን ደህና መጡ ${repInfo?.name} - ${repInfo?.club}` 
                  : `Welcome ${repInfo?.name} - ${repInfo?.club}`}
              </p>
            </div>
            <button 
              onClick={() => setIsAmharic(!isAmharic)}
              className="px-3 py-1 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
            >
              {isAmharic ? "EN" : "አማ"}
            </button>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Type and Target Branch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isAmharic ? "የሰነድ ዓይነት" : "Document Type"} *
                </label>
                <select
                  value={uploadForm.documentType}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, documentType: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">
                    {isAmharic ? "ዓይነት ይምረጡ" : "Select Type"}
                  </option>
                  {DOCUMENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isAmharic ? "የታለመ ቅርንጫፍ" : "Target Branch"} *
                </label>
                <select
                  value={uploadForm.targetBranch}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, targetBranch: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">
                    {isAmharic ? "ቅርንጫፍ ይምረጡ" : "Select Branch"}
                  </option>
                  {TARGET_BRANCHES.map(branch => (
                    <option key={branch.value} value={branch.value}>
                      {branch.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAmharic ? "ርዕስ" : "Title"} *
              </label>
              <input
                type="text"
                value={uploadForm.title}
                onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={isAmharic ? "የሰነድ ርዕስ ያስገቡ" : "Enter document title"}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAmharic ? "መግለጫ" : "Description"}
              </label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={isAmharic ? "የሰነድ መግለጫ ያስገቡ" : "Enter document description"}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAmharic ? "ቅድሚያ" : "Priority"}
              </label>
              <div className="flex space-x-4">
                {[
                  { value: "low", label: isAmharic ? "ዝቅተኛ" : "Low", color: "green" },
                  { value: "medium", label: isAmharic ? "መካከለኛ" : "Medium", color: "yellow" },
                  { value: "high", label: isAmharic ? "ከፍተኛ" : "High", color: "red" }
                ].map(priority => (
                  <label key={priority.value} className="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      value={priority.value}
                      checked={uploadForm.priority === priority.value}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, priority: e.target.value }))}
                      className={`h-4 w-4 text-${priority.color}-600 focus:ring-${priority.color}-500`}
                    />
                    <span className="ml-2 text-sm text-gray-700">{priority.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isAmharic ? "ፋይሎች" : "Files"} *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  {isAmharic 
                    ? "ፋይሎችን ለመላክ እዚህ ይጎትቱ ወይም ይጫኑ" 
                    : "Drag and drop files here or click to upload"}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {isAmharic 
                    ? "PDF, Word, JPG, PNG (ከ10MB በታች)" 
                    : "PDF, Word, JPG, PNG (under 10MB)"}
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                >
                  {isAmharic ? "ፋይሎች ይምረጡ" : "Select Files"}
                </label>
              </div>

              {/* Selected Files */}
              {uploadForm.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    {isAmharic ? "የተመረጡ ፋይሎች:" : "Selected Files:"}
                  </h4>
                  {uploadForm.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
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

            {/* Upload Progress */}
            {isSubmitting && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    {isAmharic ? "እየተላከ..." : "Uploading..."}
                  </span>
                  <span className="text-sm text-blue-700">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

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
                disabled={isSubmitting || uploadForm.files.length === 0}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>
                  {isSubmitting 
                    ? (isAmharic ? "እየተላከ..." : "Uploading...") 
                    : (isAmharic ? "መላክ" : "Submit")}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}