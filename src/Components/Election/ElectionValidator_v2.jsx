import React, { useState } from "react";
import { Shield, CheckCircle, XCircle, AlertTriangle, User } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Student ID validation function / የተማሪ መለያ ማረጋገጫ ተግባር
const isValidStudentId = (id) => {
  // DBU followed by exactly 7 digits / DBU ከዚያ በኋላ በትክክል 7 ቁጥሮች
  return /^DBU\d{7}$/.test(id);
};

// Mock student database / ምሳሌ የተማሪዎች መረጃ ቋት
const STUDENT_DATABASE = [
  { id: "DBU2021001", name: "አበበ ተስፋዬ", department: "Computer Science", year: 3, status: "active" },
  { id: "DBU2021002", name: "ሄኖክ መኮንን", department: "Electrical Engineering", year: 2, status: "active" },
  { id: "DBU2021003", name: "ብርሃን አለሙ", department: "Civil Engineering", year: 4, status: "active" },
  { id: "DBU2020045", name: "ሳራ ገብሬ", department: "Information Systems", year: 4, status: "graduated" },
  { id: "DBU2022156", name: "ዳዊት አለሙ", department: "Mechanical Engineering", year: 1, status: "suspended" },
  // Add more students / ተጨማሪ ተማሪዎች ይጨምሩ
];

// Voting history / የመምረጫ ታሪክ
const VOTING_HISTORY = [
  { studentId: "DBU2021001", electionId: "ELECTION-2024-001", votedAt: new Date("2024-01-15T10:30:00") },
  // Add more voting records / ተጨማሪ የመምረጫ መዝገቦች ይጨምሩ
];

// Feature flags / የባህሪ ማብሪያ/ማጥፊያዎች
const FEATURES = {
  ELECTION_VALIDATOR: true,
  DUPLICATE_CHECK: true,
  STATUS_VERIFICATION: true
};

export function ElectionValidator_v2({ electionId, onValidationComplete }) {
  const [isAmharic, setIsAmharic] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationHistory, setValidationHistory] = useState([]);

  // Validate student eligibility / የተማሪ ብቁነት ማረጋገጥ
  const validateStudent = async (id) => {
    setIsValidating(true);
    
    try {
      // Simulate API delay / API መዘግየት ማስመሰል
      await new Promise(resolve => setTimeout(resolve, 1000));

      const result = {
        studentId: id,
        timestamp: new Date(),
        checks: {
          formatValid: false,
          studentExists: false,
          isActive: false,
          hasNotVoted: false,
          isEligible: false
        },
        student: null,
        errors: []
      };

      // Check 1: ID format validation / ፍተሻ 1: የመለያ ቅርጸት ማረጋገጥ
      result.checks.formatValid = isValidStudentId(id);
      if (!result.checks.formatValid) {
        result.errors.push(
          isAmharic 
            ? "የተማሪ መለያ ቅርጸት ትክክል አይደለም (DBU + 7 ቁጥሮች)" 
            : "Invalid student ID format (DBU + 7 digits)"
        );
      }

      // Check 2: Student exists in database / ፍተሻ 2: ተማሪው በመረጃ ቋት ውስጥ መኖሩ
      const student = STUDENT_DATABASE.find(s => s.id === id);
      result.checks.studentExists = !!student;
      result.student = student;
      
      if (!student) {
        result.errors.push(
          isAmharic 
            ? "ተማሪው በመረጃ ቋት ውስጥ አልተገኘም" 
            : "Student not found in database"
        );
      }

      // Check 3: Student is active / ፍተሻ 3: ተማሪው ንቁ መሆኑ
      if (student) {
        result.checks.isActive = student.status === "active";
        if (!result.checks.isActive) {
          result.errors.push(
            isAmharic 
              ? `ተማሪው ንቁ አይደለም (ሁኔታ: ${student.status})` 
              : `Student is not active (status: ${student.status})`
          );
        }
      }

      // Check 4: Has not voted in this election / ፍተሻ 4: በዚህ ምርጫ ውስጥ አልመረጠም
      const hasVoted = VOTING_HISTORY.some(
        vote => vote.studentId === id && vote.electionId === electionId
      );
      result.checks.hasNotVoted = !hasVoted;
      
      if (hasVoted) {
        result.errors.push(
          isAmharic 
            ? "ተማሪው በዚህ ምርጫ ውስጥ አስቀድሞ መርጧል" 
            : "Student has already voted in this election"
        );
      }

      // Overall eligibility / አጠቃላይ ብቁነት
      result.checks.isEligible = 
        result.checks.formatValid && 
        result.checks.studentExists && 
        result.checks.isActive && 
        result.checks.hasNotVoted;

      setValidationResult(result);
      
      // Add to validation history / ወደ ማረጋገጫ ታሪክ ይጨምሩ
      setValidationHistory(prev => [result, ...prev.slice(0, 4)]); // Keep last 5

      // Call callback if provided / ከተሰጠ ጥሪ ተመላሽ
      if (onValidationComplete) {
        onValidationComplete(result);
      }

      // Show toast notification / የቶስት ማሳወቂያ ያሳዩ
      if (result.checks.isEligible) {
        toast.success(
          isAmharic 
            ? "ተማሪው ለመምረጥ ብቁ ነው" 
            : "Student is eligible to vote"
        );
      } else {
        toast.error(
          isAmharic 
            ? "ተማሪው ለመምረጥ ብቁ አይደለም" 
            : "Student is not eligible to vote"
        );
      }

    } catch (error) {
      toast.error(isAmharic ? "ማረጋገጫ ስህተት" : "Validation error");
    } finally {
      setIsValidating(false);
    }
  };

  // Handle form submission / የቅጽ አቅራቢያ አያያዝ
  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId.trim()) {
      validateStudent(studentId.trim().toUpperCase());
    }
  };

  // Get check icon / የፍተሻ አዶ ያግኙ
  const getCheckIcon = (passed) => {
    if (passed) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isAmharic ? "የተማሪ መለያ ማረጋገጫ" : "Student ID Validator"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isAmharic 
                ? "ተማሪዎች ለመምረጥ ብቁ መሆናቸውን ያረጋግጡ" 
                : "Verify student eligibility for voting"}
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

      {/* Validation Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isAmharic ? "የተማሪ መለያ" : "Student ID"}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={isAmharic ? "DBU2021001" : "DBU2021001"}
                maxLength={10}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {isAmharic 
                ? "ቅርጸት: DBU ከዚያ በኋላ 7 ቁጥሮች (ምሳሌ: DBU2021001)" 
                : "Format: DBU followed by 7 digits (e.g., DBU2021001)"}
            </p>
          </div>

          <button
            type="submit"
            disabled={isValidating || !studentId.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isValidating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{isAmharic ? "እያረጋገጠ..." : "Validating..."}</span>
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                <span>{isAmharic ? "አረጋግጥ" : "Validate"}</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Validation Result */}
      {validationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-6 shadow-sm border ${
            validationResult.checks.isEligible 
              ? "bg-green-50 border-green-200" 
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            {validationResult.checks.isEligible ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <div>
              <h3 className={`text-lg font-semibold ${
                validationResult.checks.isEligible ? "text-green-900" : "text-red-900"
              }`}>
                {validationResult.checks.isEligible 
                  ? (isAmharic ? "ብቁ ነው" : "Eligible") 
                  : (isAmharic ? "ብቁ አይደለም" : "Not Eligible")}
              </h3>
              <p className={`text-sm ${
                validationResult.checks.isEligible ? "text-green-700" : "text-red-700"
              }`}>
                {isAmharic ? "መለያ:" : "ID:"} {validationResult.studentId}
              </p>
            </div>
          </div>

          {/* Student Information */}
          {validationResult.student && (
            <div className="bg-white rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                {isAmharic ? "የተማሪ መረጃ" : "Student Information"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">
                    {isAmharic ? "ስም:" : "Name:"}
                  </span>
                  <span className="ml-2 text-gray-900">{validationResult.student.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    {isAmharic ? "ክፍል:" : "Department:"}
                  </span>
                  <span className="ml-2 text-gray-900">{validationResult.student.department}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    {isAmharic ? "ዓመት:" : "Year:"}
                  </span>
                  <span className="ml-2 text-gray-900">{validationResult.student.year}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    {isAmharic ? "ሁኔታ:" : "Status:"}
                  </span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                    validationResult.student.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {validationResult.student.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Validation Checks */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">
              {isAmharic ? "ማረጋገጫ ፍተሻዎች" : "Validation Checks"}
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                {getCheckIcon(validationResult.checks.formatValid)}
                <span className="text-sm text-gray-700">
                  {isAmharic ? "የመለያ ቅርጸት ትክክለኛነት" : "ID Format Validation"}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {getCheckIcon(validationResult.checks.studentExists)}
                <span className="text-sm text-gray-700">
                  {isAmharic ? "ተማሪው በመረጃ ቋት ውስጥ መኖር" : "Student Exists in Database"}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {getCheckIcon(validationResult.checks.isActive)}
                <span className="text-sm text-gray-700">
                  {isAmharic ? "ንቁ ተማሪ ሁኔታ" : "Active Student Status"}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                {getCheckIcon(validationResult.checks.hasNotVoted)}
                <span className="text-sm text-gray-700">
                  {isAmharic ? "በዚህ ምርጫ ውስጥ አልመረጠም" : "Has Not Voted in This Election"}
                </span>
              </div>
            </div>
          </div>

          {/* Errors */}
          {validationResult.errors.length > 0 && (
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-red-900 mb-1">
                    {isAmharic ? "ስህተቶች:" : "Errors:"}
                  </h5>
                  <ul className="text-sm text-red-800 space-y-1">
                    {validationResult.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Validation History */}
      {validationHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isAmharic ? "የቅርብ ጊዜ ማረጋገጫዎች" : "Recent Validations"}
          </h3>
          
          <div className="space-y-3">
            {validationHistory.map((validation, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {validation.checks.isEligible ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{validation.studentId}</p>
                    {validation.student && (
                      <p className="text-sm text-gray-600">{validation.student.name}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    validation.checks.isEligible ? "text-green-600" : "text-red-600"
                  }`}>
                    {validation.checks.isEligible 
                      ? (isAmharic ? "ብቁ" : "Eligible") 
                      : (isAmharic ? "ብቁ አይደለም" : "Not Eligible")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {validation.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}