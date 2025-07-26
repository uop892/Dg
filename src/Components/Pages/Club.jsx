import { useState } from "react";
import { Users, Calendar, Award, Search, Filter, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function Clubs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Academic",
    "Sports",
    "Cultural",
    "Technology",
    "Service",
    "Arts",
  ];

  const clubs = [
    {
      name: "Debate Society",
      category: "Academic",
      members: 45,
      description:
        "Developing critical thinking and public speaking skills through competitive debates",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 12,
      founded: "2015",
    },
    {
      name: "Football Club",
      category: "Sports",
      members: 60,
      description:
        "University football team competing in inter-university tournaments",
      image:
        "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 8,
      founded: "2012",
    },
    {
      name: "Drama Club",
      category: "Cultural",
      members: 32,
      description:
        "Theatrical performances and creative expression through drama and arts",
      image:
        "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 15,
      founded: "2016",
    },
    {
      name: "Computer Science Society",
      category: "Technology",
      members: 78,
      description:
        "Programming workshops, hackathons, and tech innovation projects",
      image:
        "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 20,
      founded: "2014",
    },
    {
      name: "Volunteer Corps",
      category: "Service",
      members: 55,
      description: "Community service and volunteer work in local communities",
      image:
        "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 25,
      founded: "2013",
    },
    {
      name: "Photography Club",
      category: "Arts",
      members: 28,
      description:
        "Capturing university life and developing photography skills",
      image:
        "https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 10,
      founded: "2017",
    },
    {
      name: "Environmental Club",
      category: "Service",
      members: 42,
      description:
        "Environmental conservation and sustainability initiatives on campus",
      image:
        "https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 18,
      founded: "2018",
    },
    {
      name: "Music Society",
      category: "Arts",
      members: 35,
      description:
        "Musical performances, concerts, and music education programs",
      image:
        "https://images.pexels.com/photos/3693120/pexels-photo-3693120.jpeg?auto=compress&cs=tinysrgb&w=400",
      events: 14,
      founded: "2016",
    },
  ];

  const filteredClubs = clubs.filter((club) => {
    const matchesCategory =
      selectedCategory === "All" || club.category === selectedCategory;
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <section className="bg-bc text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Student Clubs
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
                Join one of our many student clubs and organizations to pursue
                your interests, develop new skills, and connect with like-minded
                peers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <div className="mb-8 lg:mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">
              Filter by category:
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredClubs.length} of {clubs.length} clubs
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {filteredClubs.map((club, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {club.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {club.name}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    Est. {club.founded}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {club.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{club.members} members</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{club.events} events/year</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Join Club
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No clubs found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Create Club CTA */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-400  p-6 lg:p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Want to Start a New Club?
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Have an idea for a new club or organization? We support student
              initiatives and can help you get started with the registration
              process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start a Club
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
