import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import timerIcon from "../../assets/icons/Timer.svg";
import levelIcon from "../../assets/icons/Level.svg";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChallengeData = () => {
      const storedHackathons = localStorage.getItem("hackathonsData");
      if (storedHackathons) {
        const hackathons = JSON.parse(storedHackathons);
        const challenge = hackathons.find((h) => h.id.toString() === id);
        if (challenge) {
          setChallengeData(challenge);
        } else {
          console.error("Challenge not found");
        }
      } else {
        console.error("No hackathons data found in localStorage");
      }
    };

    fetchChallengeData();
  }, [id, navigate]);

  const handleEdit = () => {
    if (challengeData) {
      navigate("/createChallenge", { state: { challengeData } });
    }
  };

  const handleDelete = () => {
    const storedHackathons = localStorage.getItem("hackathonsData");
    if (storedHackathons) {
      const hackathons = JSON.parse(storedHackathons);
      const updatedHackathons = hackathons.filter(
        (h) => h.id.toString() !== id
      );
      localStorage.setItem("hackathonsData", JSON.stringify(updatedHackathons));
      navigate("/");
    }
  };

  if (!challengeData) {
    return (
      <div className="bg-white min-h-screen text-black p-8">Loading...</div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-white">
      <div className="bg-[#003145] p-8">
        <div className="inline-flex items-center bg-[#FFCE5C] text-black px-3 py-1 rounded-md mb-4">
          <img src={timerIcon} alt="Timer" className="mr-2 w-4 h-4" />
          <span className="text-sm">
            Starts on {new Date(challengeData.startDate).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">
          {challengeData.title}
        </h1>

        <div className="flex items-center bg-white text-black p-2 rounded-md mb-4 inline-flex">
          <img src={levelIcon} alt="Level" className="mr-2" />
          <span>{challengeData.level}</span>
        </div>
      </div>

      <div className="bg-white text-black">
        <div className="shadow-lg rounded-lg p-6 mb-4 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="w-20 h-1 bg-[#44924C] mb-4"></div>
          </div>
          <div className="space-x-2">
            <button
              onClick={handleEdit}
              className="bg-[#44924C] text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-[#DC1414] text-[#DC1414] px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>

        <p className="rounded-lg p-6">{challengeData.description}</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this challenge?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#DC1414] text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
