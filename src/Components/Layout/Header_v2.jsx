import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../App.css";

// Branch definitions / የቅርንጫፍ ትርጉሞች
const BRANCHES = [
  { value: "president", label: "President (ፕሬዝዳንት)" },
  { value: "student_din", label: "Student Din (የተማሪ ዲን)" },
  { value: "clubs", label: "Clubs & Associations (ክለቦች እና ማህበራት)" },
  { value: "academic", label: "Academic Affairs (የትምህርት ጉዳዮች)" },
  { value: "dining", label: "Dining Services (የምግብ አገልግሎት)" },
  { value: "general", label: "General Service (አጠቃላይ አገልግሎት)" },
  { value: "sports", label: "Sports & Culture (ስፖርት እና ባህል)" },
  { value: "housing", label: "Housing Services (የመኖሪያ አገልግሎት)" }
];

// Feature flags / የባህሪ ማብሪያ/ማጥፊያዎች
const FEATURES = {
  BRANCH_DROPDOWN: true,
  CLUB_UPLOAD: true,
  ELECTION_VALIDATOR: true,
  COMPLAINT_ROUTING: true
};

export function Header_v2() {
  const { user } = useAuth();
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isAmharic, setIsAmharic] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        const sticky = navbar.offsetTop;
        setIsFixed(window.pageYOffset > sticky);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setIsAmharic(!isAmharic);
  };

  // Handle branch selection / የቅርንጫፍ ምርጫ አያያዝ
  const handleBranchSelect = (branchValue) => {
    setSelectedBranch(branchValue);
    // Navigate to branch-specific dashboard
    // ወደ ቅርንጫፍ-ተኮር ዳሽቦርድ ይሂዱ
    if (branchValue && user) {
      window.location.href = `/dashboard?branch=${branchValue}`;
    }
  };

  return (
    <header className="header">
      <div className="add-info">
        <div className="add-info-loc col-lg-9 col-md-9 hide">
          <ul className="row">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>{isAmharic ? "ደብረ ብርሃን ዩኒቨርሲቲ ውስጥ" : "DBU inside left to cafe road"}</span>
            </li>
            <li>
              <i className="fa fa-envelope"></i>
              <span>studentunion@dbu.edu.et</span>
            </li>
            <li>
              <i className="fa fa-phone"></i>
              <span>+251940414243</span>
            </li>
          </ul>
        </div>
        <div className="add-info-soc col-lg-2 col-md-3 col-sm-12">
          <a href="#">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          {/* Language toggle / የቋንቋ መቀያየር */}
          <button 
            onClick={toggleLanguage}
            className="ml-2 px-2 py-1 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
            title={isAmharic ? "Switch to English" : "ወደ አማርኛ ቀይር"}
          >
            {isAmharic ? "EN" : "አማ"}
          </button>
        </div>
      </div>
      
      <div className="logo-section">
        <img src="/images/logo.png" alt="DBU Student Union Logo" />
      </div>
      
      <nav className={`navbar ${isFixed ? "fixed" : ""}`}>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "X" : "☰"}
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/">{isAmharic ? "መነሻ" : "Home"}</Link>
          </li>
          <li>
            <Link to="/about">{isAmharic ? "ስለ እኛ" : "About Us"}</Link>
          </li>
          <li>
            <Link to="/Club">{isAmharic ? "ክለቦች" : "Clubs"}</Link>
          </li>
          <li>
            <Link to="/elections">{isAmharic ? "ምርጫዎች" : "Elections"}</Link>
          </li>
          <li>
            <Link to="/services">{isAmharic ? "አገልግሎቶች" : "Services"}</Link>
          </li>
          <li>
            <Link to="/latest">{isAmharic ? "የቅርብ ጊዜ" : "Latest"}</Link>
          </li>
          <li>
            <Link to="/contact">{isAmharic ? "ያግኙን" : "Contact"}</Link>
          </li>
        </ul>

        {/* Branch Dropdown - Only visible before login / የቅርንጫፍ ዝርዝር - ከመግባት በፊት ብቻ ይታያል */}
        {FEATURES.BRANCH_DROPDOWN && !user && (
          <div className="branch-selector mr-4">
            <select
              value={selectedBranch}
              onChange={(e) => handleBranchSelect(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">
                {isAmharic ? "ቅርንጫፍ ይምረጡ" : "Select Branch"}
              </option>
              {BRANCHES.map((branch) => (
                <option key={branch.value} value={branch.value}>
                  {branch.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="login">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {isAmharic ? "እንኳን ደህና መጡ" : "Welcome"}, {user.name}
              </span>
              <Link to="/dashboard">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {isAmharic ? "ዳሽቦርድ" : "Dashboard"}
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {isAmharic ? "ግባ" : "Login"}
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}