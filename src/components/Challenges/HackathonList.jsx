import React, { useState, useEffect } from "react";
import HackathonCard from "./HackathonCard";
import search from "../../assets/icons/search.svg";
import image1 from "../../assets/cardimage/cardimage1.png";
import image2 from "../../assets/cardimage/cardimage2.png";
import image3 from "../../assets/cardimage/cardimage3.png";
import image4 from "../../assets/cardimage/cardimage4.png";
import image5 from "../../assets/cardimage/cardimage5.png";
import image6 from "../../assets/cardimage/cardimage6.png";

const initialHackathonsData = [
  {
    id: 1,
    title: "Data Science Bootcamp - Graded Datathon",
    startDate: "2024-09-03",
    endDate: "2024-09-05",
    level: "Easy",
    status: "Active",
    image: image1,
    description:
      "A beginner-friendly datathon designed to test your fundamental data science skills. Perfect for those who are just starting their data science journey.",
  },
  {
    id: 2,
    title: "Data Sprint 72 - Butterfly Identification",
    startDate: "2023-07-05",
    endDate: "2023-07-07",
    level: "Medium",
    status: "Active",
    image: image2,
    description:
      "An intermediate-level challenge focused on building machine learning models to identify different species of butterflies from images.",
  },
  {
    id: 3,
    title: "Data Sprint 71 - Weather Recognition",
    startDate: "2023-06-28",
    endDate: "2023-07-02",
    level: "Hard",
    status: "Upcoming",
    image: image3,
    description:
      "A challenging datathon that requires participants to analyze and predict weather conditions using advanced data science techniques.",
  },
  {
    id: 4,
    title: "Data Sprint 70 - Airline Passenger Satisfaction",
    startDate: "2023-06-30",
    endDate: "2023-07-04",
    level: "Easy",
    status: "Past",
    image: image4,
    description:
      "An entry-level datathon where you analyze passenger satisfaction data to predict and enhance the flying experience.",
  },
  {
    id: 5,
    title: "Engineering Graduates Employment Outcomes",
    startDate: "2023-05-14",
    endDate: "2023-05-16",
    level: "Medium",
    status: "Upcoming",
    image: image5,
    description:
      "An intermediate-level challenge focused on predicting the employment outcomes of engineering graduates based on academic and demographic data.",
  },
  {
    id: 6,
    title: "Travel Insurance Claim Prediction",
    startDate: "2023-05-10",
    endDate: "2023-05-16",
    level: "Hard",
    status: "Past",
    image: image6,
    description:
      "A high-difficulty datathon aimed at predicting the likelihood of travel insurance claims, requiring expertise in risk modeling and data analysis.",
  },
];

const HackathonList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: {
      All: true,
      Active: false,
      Upcoming: false,
      Past: false,
    },
    level: {
      All: true,
      Easy: false,
      Medium: false,
      Hard: false,
    },
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hackathonsData, setHackathonsData] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const storedHackathons = localStorage.getItem("hackathonsData");
    if (storedHackathons) {
      setHackathonsData(JSON.parse(storedHackathons));
    } else {
      setHackathonsData(initialHackathonsData);
      localStorage.setItem(
        "hackathonsData",
        JSON.stringify(initialHackathonsData)
      );
    }
  }, []);

  useEffect(() => {
    const newSelectedFilters = [];
    Object.entries(filters).forEach(([category, options]) => {
      Object.entries(options).forEach(([option, isSelected]) => {
        if (isSelected && option !== "All") {
          newSelectedFilters.push({ category, option });
        }
      });
    });
    setSelectedFilters(newSelectedFilters);
  }, [filters]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (category, option) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [category]: {
          ...prevFilters[category],
          [option]: !prevFilters[category][option],
        },
      };

      if (option === "All" && newFilters[category].All) {
        Object.keys(newFilters[category]).forEach((key) => {
          if (key !== "All") newFilters[category][key] = false;
        });
      } else if (option !== "All" && newFilters[category][option]) {
        newFilters[category].All = false;
      }

      if (Object.values(newFilters[category]).every((v) => !v)) {
        newFilters[category].All = true;
      }

      return newFilters;
    });
  };

  const removeFilter = (category, option) => {
    handleFilterChange(category, option);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredHackathons = hackathonsData.filter((hackathon) => {
    const statusFilter = filters.status.All || filters.status[hackathon.status];
    const levelFilter = filters.level.All || filters.level[hackathon.level];
    return statusFilter && levelFilter;
  });

  const sortedHackathons = filteredHackathons.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (sortOrder === "oldest") {
      return new Date(a.startDate) - new Date(b.startDate);
    } else {
      return 0;
    }
  });

  return (
    <div className="bg-[#002A3B]">
      <div className="p-6 md:p-8 lg:p-10">
        <h1 className="text-4xl font-medium mb-8 text-center text-white">
          Explore Challenges
        </h1>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-center items-center">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full p-2 pl-8 rounded-md"
                />
                <img
                  src={search}
                  alt="Search"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4"
                />
              </div>
              <div className="relative w-full md:w-1/4">
                <button
                  onClick={toggleFilter}
                  className="w-full p-2 rounded-md appearance-none bg-white text-left flex justify-between items-center"
                >
                  <span>Filter</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
                {isFilterOpen && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="p-2 border-b">
                      <p className="font-bold">Status</p>
                      {Object.keys(filters.status).map((option) => (
                        <label key={option} className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={filters.status[option]}
                            onChange={() =>
                              handleFilterChange("status", option)
                            }
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    <div className="p-2">
                      <p className="font-bold">Level</p>
                      {Object.keys(filters.level).map((option) => (
                        <label key={option} className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={filters.level[option]}
                            onChange={() => handleFilterChange("level", option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative w-full md:w-1/4">
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="w-full p-2 rounded-md appearance-none bg-white text-left"
                >
                  <option value="">Sort by</option>
                  <option value="newest">Newest First &#x25B2;</option>
                  <option value="oldest">Oldest First &#x25BC;</option>
                </select>
              </div>
            </div>

            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map(({ category, option }) => (
                  <div
                    key={`${category}-${option}`}
                    className="bg-[#7A8F9A] text-white rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    {option}
                    <button
                      onClick={() => removeFilter(category, option)}
                      className="ml-2 text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#003145] p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonList;
