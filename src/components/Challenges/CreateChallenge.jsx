import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import calender from "../../assets/icons/calender.svg";
import upload from "../../assets/icons/upload.svg";
import image from "../../assets/icons/image.svg";
import arrow from "../../assets/icons/arrow.svg";

const CreateChallenge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    status: "",
    description: "",
    level: "",
    image: "",
  });

  useEffect(() => {
    if (location.state && location.state.challengeData) {
      setFormData(location.state.challengeData);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const calculateStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
      return "Upcoming";
    } else if (now >= start && now <= end) {
      return "Active";
    } else {
      return "Past";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const status = calculateStatus(formData.startDate, formData.endDate);
    const updatedFormData = { ...formData, status };

    const storedHackathons = localStorage.getItem("hackathonsData");
    const hackathonsData = storedHackathons ? JSON.parse(storedHackathons) : [];
    if (updatedFormData.id) {
      const updatedHackathons = hackathonsData.map((hackathon) =>
        hackathon.id === updatedFormData.id ? updatedFormData : hackathon
      );
      localStorage.setItem("hackathonsData", JSON.stringify(updatedHackathons));
    } else {
      const newHackathon = { ...updatedFormData, id: Date.now() };
      hackathonsData.push(newHackathon);
      localStorage.setItem("hackathonsData", JSON.stringify(hackathonsData));
    }

    navigate("/");
  };

  const handleCalendarClick = (ref) => {
    ref.current.showPicker();
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        {formData.id ? "Edit Challenge" : "Create Challenge"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-1/2">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block mb-1">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded pr-10"
              required
              ref={startDateRef}
            />
            <img
              src={calender}
              alt="Calendar"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              onClick={() => handleCalendarClick(startDateRef)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-1">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded pr-10"
              required
              ref={endDateRef}
            />
            <img
              src={calender}
              alt="Calendar"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
              onClick={() => handleCalendarClick(endDateRef)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="bg-[#F8F9FD] p-4 rounded">
          <label htmlFor="image" className="block mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {!formData.image && (
            <label
              htmlFor="image"
              className="p-2 border rounded cursor-pointer inline-flex items-center"
            >
              <img src={upload} alt="Upload" className="w-4 h-4 inline mr-2" />
              Upload
            </label>
          )}
          {formData.image && (
            <div className="mt-4">
              <img
                src={formData.image}
                alt="Selected"
                className="w-1/2 h-auto rounded"
              />
              <label
                htmlFor="image"
                className="mt-4 flex gap-1 items-center cursor-pointer"
              >
                <img src={image} alt="Change image" className="w-4 h-4" />
                <span className="text-[#44924C]">Change image</span>
                <img src={arrow} alt="arrow" className="w-3 h-3" />
              </label>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="level" className="block mb-1">
            Level
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#44924C] text-white px-4 py-2 rounded"
        >
          {formData.id ? "Save Challenge" : "Create Challenge"}
        </button>
      </form>
    </div>
  );
};

export default CreateChallenge;
