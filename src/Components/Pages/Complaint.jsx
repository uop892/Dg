import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Send,
  Filter,
  Search,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockComplaints, generateCaseId } from "../../data/mockData";
import { branches } from "../../data/Branchis";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export function Complaints() {
  const { user } = useAuth();

  const [selectedTab, setSelectedTab] = useState("all");
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [responseMessage, setResponseMessage] = useState("");

  const [newComplaintForm, setNewComplaintForm] = useState({
    title: "",
    description: "",
    category: "",
    branch: "",
    priority: "medium",
    evidence: [],
    isGeneral: false,
  });

  const complaintCategories = [
    { value: "academic", label: "Academic Affairs" },
    { value: "dining", label: "Dining Services" },
    { value: "housing", label: "Housing" },
    { value: "facilities", label: "Facilities" },
    { value: "disciplinary", label: "Disciplinary" },
    { value: "general", label: "General" },
  ];

  const filteredComplaints = mockComplaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "my" && complaint.submittedBy === user?.id) ||
      (selectedTab === "pending" && complaint.status === "submitted");
    return matchesSearch && matchesStatus && matchesTab;
  });

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    if (!newComplaintForm.title || !newComplaintForm.description) {
      toast.error("Please fill all required fields");
      return;
    }

    const caseId = generateCaseId();
    toast.success(`Complaint submitted. Case ID: ${caseId}`);

    setShowNewComplaint(false);
    setNewComplaintForm({
      title: "",
      description: "",
      category: "",
      branch: "",
      priority: "medium",
      evidence: [],
      isGeneral: false,
    });
  };

  const handleSendResponse = (complaintId) => {
    if (!responseMessage.trim()) return;
    toast.success("Response sent");
    setResponseMessage("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "under_review":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "closed":
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Complaints & Appeals
          </h1>
          <p className="text-gray-600 mt-1">
            Submit complaints and track their status
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNewComplaint(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          New Complaint
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          {["all", "my", "pending"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab === "all"
                ? "All"
                : tab === "my"
                ? "My Complaints"
                : "Pending"}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {complaint.title}
                </h3>
                <p className="text-gray-600">{complaint.description}</p>
                <div className="flex gap-2 mt-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full ${getStatusColor(
                      complaint.status
                    )}`}
                  >
                    {getStatusIcon(complaint.status)}{" "}
                    {complaint.status.replace("_", " ")}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full ${getPriorityColor(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority} priority
                  </span>
                  <span className="text-gray-500">
                    {complaint.submittedAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                className="text-blue-600 hover:underline"
                onClick={() =>
                  setSelectedComplaint(
                    selectedComplaint === complaint.id ? null : complaint.id
                  )
                }
              >
                {selectedComplaint === complaint.id ? "Hide" : "Details"}
              </button>
            </div>

            {selectedComplaint === complaint.id && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Responses:</h4>
                {complaint.responses.map((r) => (
                  <div key={r.id} className="bg-gray-50 rounded p-3 mb-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{r.author}</span>
                      <span className="text-gray-500">
                        {r.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{r.message}</p>
                  </div>
                ))}

                {(user?.role === "president" ||
                  user?.role === "student_din") && (
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2"
                      placeholder="Write a response..."
                    />
                    <button
                      onClick={() => handleSendResponse(complaint.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
