import React, { useState, useEffect } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Download, 
  Clock, 
  FileText,
  Filter,
  Search
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Mock data for pending approvals / ለመጠበቅ ያሉ ማጽደቂያዎች ምሳሌ መረጃ
const PENDING_DOCUMENTS = [
  {
    id: "DOC-1704123456",
    title: "Monthly Activity Report - January 2024",
    titleAm: "ወርሃዊ የእንቅስቃሴ ሪፖርት - ጃንዋሪ 2024",
    clubName: "Drama Club",
    clubNameAm: "የድራማ ክለብ",
    representative: "አበበ ተስፋዬ",
    documentType: "monthly_report",
    priority: "medium",
    submittedAt: new Date("2024-01-15T10:30:00"),
    files: [
      { name: "January_Report.pdf", size: "2.3 MB", type: "application/pdf" },
      { name: "Activity_Photos.zip", size: "15.7 MB", type: "application/zip" }
    ],
    description: "Monthly report covering all activities, events, and member engagement for January 2024.",
    descriptionAm: "ለጃንዋሪ 2024 ሁሉንም እንቅስቃሴዎች፣ ዝግጅቶች እና የአባላት ተሳትፎ የሚሸፍን ወርሃዊ ሪፖርት።",
    status: "pending"
  },
  {
    id: "DOC-1704123457",
    title: "Budget Request for Cultural Festival",
    titleAm: "ለባህላዊ ፌስቲቫል የበጀት ጥያቄ",
    clubName: "Cultural Association",
    clubNameAm: "የባህል ማህበር",
    representative: "ሄኖክ መኮንን",
    documentType: "budget_request",
    priority: "high",
    submittedAt: new Date("2024-01-14T14:20:00"),
    files: [
      { name: "Budget_Proposal.docx", size: "1.8 MB", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
    ],
    description: "Detailed budget request for the upcoming cultural festival including venue, equipment, and performer costs.",
    descriptionAm: "ለሚመጣው የባህል ፌስቲቫል ዝርዝር የበጀት ጥያቄ፣ ቦታ፣ መሳሪያ እና የአርቲስቶች ወጪዎችን ጨምሮ።",
    status: "pending"
  },
  {
    id: "DOC-1704123458",
    title: "New Member Registration List",
    titleAm: "የአዲስ አባላት ምዝገባ ዝርዝር",
    clubName: "Environmental Club",
    clubNameAm: "የአካባቢ ጥበቃ ክለብ",
    representative: "ብርሃን አለሙ",
    documentType: "membership_list",
    priority: "low",
    submittedAt: new Date("2024-01-13T09:15:00"),
    files: [
      { name: "New_Members_2024.xlsx", size: "0.8 MB", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
    ],
    description: "List of new members who joined the Environmental Club in January 2024.",
    descriptionAm: "በጃንዋሪ 2024 የአካባቢ ጥበቃ ክለብን የተቀላቀሉ አዲስ አባላት ዝርዝር።",
    status: "pending"
  }
];

// Feature flags / የባህሪ ማብሪያ/ማጥፊያዎች
const FEATURES = {
  CLUB_APPROVAL: true,
  BULK_ACTIONS: true,
  DOCUMENT_PREVIEW: true
};

export function ClubApprovalList_v2() {
  const { user } = useAuth();
  const [isAmharic, setIsAmharic] = useState(false);
  const [documents, setDocuments] = useState(PENDING_DOCUMENTS);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Check if user has approval permissions / ተጠቃሚው የማጽደቅ ፈቃድ እንዳለው ያረጋግጡ
  const canApprove = () => {
    return user?.role === "clubs_associations" || user?.role === "president" || user?.role === "student_din";
  };

  // Filter documents / ሰነዶችን ያጣሩ
  const filteredDocuments = documents.filter(doc => {
    const matchesStatus = filterStatus === "all" || doc.status === filterStatus;
    const matchesPriority = filterPriority === "all" || doc.priority === filterPriority;
    const matchesSearch = searchTerm === "" || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.representative.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Handle document approval / የሰነድ ማጽደቅ አያያዝ
  const handleApprove = async (documentId, action) => {
    if (!canApprove()) {
      toast.error(isAmharic ? "የማጽደቅ ፈቃድ የለዎትም" : "You don't have approval permissions");
      return;
    }

    try {
      // Simulate API call / API ጥሪ ማስመሰል
      await new Promise(resolve => setTimeout(resolve, 1000));

      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, status: action, processedAt: new Date(), processedBy: user.name }
          : doc
      ));

      const actionText = action === "approved" 
        ? (isAmharic ? "ጸድቋል" : "approved")
        : (isAmharic ? "ተቀባይነት አላገኘም" : "rejected");

      toast.success(
        isAmharic 
          ? `ሰነድ ${actionText}` 
          : `Document ${actionText}`
      );

    } catch (error) {
      toast.error(isAmharic ? "ስህተት ተከስቷል" : "An error occurred");
    }
  };

  // Handle bulk actions / የጅምላ እርምጃዎች አያያዝ
  const handleBulkAction = async (action) => {
    if (selectedDocuments.length === 0) {
      toast.error(isAmharic ? "ሰነዶችን ይምረጡ" : "Please select documents");
      return;
    }

    if (!canApprove()) {
      toast.error(isAmharic ? "የማጽደቅ ፈቃድ የለዎትም" : "You don't have approval permissions");
      return;
    }

    try {
      // Simulate API call / API ጥሪ ማስመሰል
      await new Promise(resolve => setTimeout(resolve, 1500));

      setDocuments(prev => prev.map(doc => 
        selectedDocuments.includes(doc.id)
          ? { ...doc, status: action, processedAt: new Date(), processedBy: user.name }
          : doc
      ));

      setSelectedDocuments([]);

      const actionText = action === "approved" 
        ? (isAmharic ? "ጸድቋል" : "approved")
        : (isAmharic ? "ተቀባይነት አላገኘም" : "rejected");

      toast.success(
        isAmharic 
          ? `${selectedDocuments.length} ሰነዶች ${actionText}` 
          : `${selectedDocuments.length} documents ${actionText}`
      );

    } catch (error) {
      toast.error(isAmharic ? "ስህተት ተከስቷል" : "An error occurred");
    }
  };

  // Get priority color / የቅድሚያ ቀለም ያግኙ
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Get status color / የሁኔታ ቀለም ያግኙ
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Format file size / የፋይል መጠን ቅርጸት
  const formatFileSize = (size) => {
    return size;
  };

  // If user doesn't have permission, show access denied / ተጠቃሚው ፈቃድ ከሌለው መዳረሻ ተከልክሏል ያሳዩ
  if (!canApprove()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center max-w-md">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isAmharic ? "መዳረሻ ተከልክሏል" : "Access Denied"}
          </h2>
          <p className="text-gray-600">
            {isAmharic 
              ? "ይህ ገጽ የክለቦች እና ማህበራት ቅርንጫፍ አባላት ብቻ ነው የሚጠቀሙት" 
              : "This page is only accessible to Clubs & Associations branch members"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAmharic ? "የክለብ ሰነድ ማጽደቂያ" : "Club Document Approval"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isAmharic 
              ? "የክለብ ተወካዮች የላኩ ሰነዶችን ይገምግሙ እና ያጽድቁ" 
              : "Review and approve documents submitted by club representatives"}
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => setIsAmharic(!isAmharic)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {isAmharic ? "EN" : "አማ"}
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={isAmharic ? "ፈልግ..." : "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{isAmharic ? "ሁሉም ሁኔታዎች" : "All Status"}</option>
            <option value="pending">{isAmharic ? "በመጠባበቅ ላይ" : "Pending"}</option>
            <option value="approved">{isAmharic ? "ጸድቋል" : "Approved"}</option>
            <option value="rejected">{isAmharic ? "ተቀባይነት አላገኘም" : "Rejected"}</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">{isAmharic ? "ሁሉም ቅድሚያዎች" : "All Priorities"}</option>
            <option value="high">{isAmharic ? "ከፍተኛ" : "High"}</option>
            <option value="medium">{isAmharic ? "መካከለኛ" : "Medium"}</option>
            <option value="low">{isAmharic ? "ዝቅተኛ" : "Low"}</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">
            <Filter className="w-4 h-4 mr-2" />
            {filteredDocuments.length} {isAmharic ? "ሰነዶች" : "documents"}
          </div>
        </div>

        {/* Bulk Actions */}
        {FEATURES.BULK_ACTIONS && selectedDocuments.length > 0 && (
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-900">
              {selectedDocuments.length} {isAmharic ? "ተመርጠዋል" : "selected"}
            </span>
            <button
              onClick={() => handleBulkAction("approved")}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
            >
              {isAmharic ? "ሁሉንም አጽድቅ" : "Approve All"}
            </button>
            <button
              onClick={() => handleBulkAction("rejected")}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
            >
              {isAmharic ? "ሁሉንም ውድቅ አድርግ" : "Reject All"}
            </button>
          </div>
        )}
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                {/* Checkbox for bulk selection */}
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDocuments(prev => [...prev, doc.id]);
                    } else {
                      setSelectedDocuments(prev => prev.filter(id => id !== doc.id));
                    }
                  }}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isAmharic ? doc.titleAm : doc.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(doc.priority)}`}>
                      {isAmharic 
                        ? (doc.priority === "high" ? "ከፍተኛ" : doc.priority === "medium" ? "መካከለኛ" : "ዝቅተኛ")
                        : doc.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {isAmharic 
                        ? (doc.status === "pending" ? "በመጠባበቅ ላይ" : doc.status === "approved" ? "ጸድቋል" : "ተቀባይነት አላገኘም")
                        : doc.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>{isAmharic ? "ክለብ:" : "Club:"}</strong> {isAmharic ? doc.clubNameAm : doc.clubName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>{isAmharic ? "ተወካይ:" : "Representative:"}</strong> {doc.representative}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>{isAmharic ? "የተላከበት ቀን:" : "Submitted:"}</strong> {doc.submittedAt.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>{isAmharic ? "ፋይሎች:" : "Files:"}</strong> {doc.files.length}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {isAmharic ? doc.descriptionAm : doc.description}
                  </p>

                  {/* Files List */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      {isAmharic ? "ተያይዘው የመጡ ፋይሎች:" : "Attached Files:"}
                    </h4>
                    {doc.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="flex items-center space-x-3 bg-gray-50 p-2 rounded">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-xs">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => setSelectedDocument(doc)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isAmharic ? "ዝርዝር" : "Details"}</span>
                </button>

                {doc.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(doc.id, "approved")}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{isAmharic ? "አጽድቅ" : "Approve"}</span>
                    </button>
                    <button
                      onClick={() => handleApprove(doc.id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{isAmharic ? "ውድቅ አድርግ" : "Reject"}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isAmharic ? "ሰነድ አልተገኘም" : "No Documents Found"}
          </h3>
          <p className="text-gray-600">
            {isAmharic 
              ? "የተመረጡትን ማጣሪያዎች የሚያሟላ ሰነድ የለም" 
              : "No documents match the selected filters"}
          </p>
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {isAmharic ? "የሰነድ ዝርዝር" : "Document Details"}
                </h2>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isAmharic ? selectedDocument.titleAm : selectedDocument.title}
                  </h3>
                  <p className="text-gray-600">
                    {isAmharic ? selectedDocument.descriptionAm : selectedDocument.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {isAmharic ? "ክለብ" : "Club"}
                    </p>
                    <p className="text-gray-900">
                      {isAmharic ? selectedDocument.clubNameAm : selectedDocument.clubName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {isAmharic ? "ተወካይ" : "Representative"}
                    </p>
                    <p className="text-gray-900">{selectedDocument.representative}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {isAmharic ? "ተያይዘው የመጡ ፋይሎች" : "Attached Files"}
                  </h4>
                  <div className="space-y-2">
                    {selectedDocument.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedDocument.status === "pending" && (
                  <div className="flex space-x-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        handleApprove(selectedDocument.id, "approved");
                        setSelectedDocument(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>{isAmharic ? "አጽድቅ" : "Approve"}</span>
                    </button>
                    <button
                      onClick={() => {
                        handleApprove(selectedDocument.id, "rejected");
                        setSelectedDocument(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>{isAmharic ? "ውድቅ አድርግ" : "Reject"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}