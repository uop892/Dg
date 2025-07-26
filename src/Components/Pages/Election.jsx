import React, { useState } from "react";
import {
  Vote,
  Users,
  Clock,
  CheckCircle,
  Calendar,
  Eye,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

const mockElections = [
  {
    id: "1",
    title: "Student Union President Election 2024",
    description:
      "Vote for the next Student Union President who will represent all students",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-02-07",
    totalVotes: 8547,
    eligibleVoters: 12547,
    candidates: [
      {
        id: "1",
        name: "Hewan Tadesse",
        position: "President",
        votes: 4523,
        profileImage:
          "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
        platform: [
          "Student Welfare",
          "Academic Excellence",
          "Campus Infrastructure",
        ],
      },
      {
        id: "2",
        name: "Dawit Mekonnen",
        position: "President",
        votes: 4024,
        profileImage:
          "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
        platform: [
          "Innovation Hub",
          "Student Rights",
          "Environmental Sustainability",
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Branch Leader Elections",
    description: "Elections for various branch leadership positions",
    status: "upcoming",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    totalVotes: 0,
    eligibleVoters: 12547,
    candidates: [],
  },
];

export function Elections() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedElection, setSelectedElection] = useState(null);

  const filteredElections = mockElections.filter(
    (election) => selectedTab === "all" || election.status === selectedTab
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <Vote className="w-4 h-4" />;
      case "upcoming":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const handleVote = (candidateId) => {
    console.log("Voted for candidate:", candidateId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-bc text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {" "}
              Student Elections
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              Vote for your future student union leaders for Debre Birhen
              Universty
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["all", "active", "upcoming", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Elections List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredElections.map((election, index) => (
          <motion.div
            key={election.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {election.title}
                </h3>
                <p className="text-gray-600 text-sm">{election.description}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  election.status
                )}`}
              >
                {getStatusIcon(election.status)}
                <span className="ml-1 capitalize">{election.status}</span>
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    Votes
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {election.totalVotes.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  of {election.eligibleVoters.toLocaleString()} eligible
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    Ends
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {new Date(election.endDate).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  {election.status === "active" ? "3 days left" : ""}
                </p>
              </div>
            </div>

            {/* Candidates Preview */}
            {election.candidates.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Candidates
                </h4>
                <div className="flex -space-x-2">
                  {election.candidates.slice(0, 3).map((candidate) => (
                    <img
                      key={candidate.id}
                      src={candidate.profileImage}
                      alt={candidate.name}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              {election.status === "active" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedElection(election)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Vote className="w-4 h-4 inline mr-2" />
                  Vote Now
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-4 h-4 inline mr-2" />
                View Details
              </motion.button>

              {election.status === "completed" && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors"
                >
                  <BarChart3 className="w-4 h-4 inline mr-2" />
                  Results
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Voting Modal */}
      {selectedElection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedElection.title}
                </h2>
                <button
                  onClick={() => setSelectedElection(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {selectedElection.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={candidate.profileImage}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <p className="text-gray-600">{candidate.position}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Platform:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.platform.map((item, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {candidate.votes.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">votes</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVote(candidate.id)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Vote for {candidate.name}
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
