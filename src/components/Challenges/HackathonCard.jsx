import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tick from "../../assets/icons/tick.svg";

const HackathonCard = ({ hackathon }) => {
  const { id, title, startDate, endDate, image, level, status } = hackathon;
  const [remainingTime, setRemainingTime] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const now = new Date();
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T23:59:59`);

    if (now <= end) {
      const calculateTimeLeft = () => {
        const targetDate = status === "Upcoming" ? start : end;
        const timeDifference = targetDate.getTime() - now.getTime();
        console.log("Time Difference:", timeDifference);

        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );

          setRemainingTime(
            `${days} : ${hours.toString().padStart(2, "0")} : ${minutes
              .toString()
              .padStart(2, "0")}`
          );
        } else {
          setRemainingTime("00 : 00 : 00");
        }
      };

      calculateTimeLeft();

      const timer = setInterval(calculateTimeLeft, 60000);

      return () => clearInterval(timer);
    }
  }, [startDate, endDate, status]);

  const formatTimeLeft = (timeString) => {
    const [days, hours, minutes] = timeString
      .split(":")
      .map((part) => part.trim());
    return (
      <div className="flex justify-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">{days}</span>
          <span className="text-xs">days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">{hours}</span>
          <span className="text-xs">hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">{minutes}</span>
          <span className="text-xs">mins</span>
        </div>
      </div>
    );
  };

  const handleParticipate = () => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="flex flex-col bg-white rounded-[15px] shadow-md overflow-hidden w-full max-w-xs mx-auto h-[400px]">
      <div className="w-full h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4 text-center w-full flex flex-col justify-between flex-grow">
        <div>
          <p
            className={`text-xs font-medium mb-1 px-2 py-1 rounded-md inline-block ${
              status === "Upcoming"
                ? "bg-[#FCF1D2]"
                : status === "Active"
                ? "bg-[#D2E5D4]"
                : "bg-[#FFDED4]"
            }`}
          >
            {status}
          </p>
          <h3 className="text-lg font-semibold mb-2 break-words">{title}</h3>
          <p className="text-xs text-gray-600 mb-1">
            {status === "Past"
              ? "Ended on"
              : status === "Active"
              ? "Ends in"
              : "Starts in"}
          </p>
          {status === "Past" ? (
            <p className="text-md font-bold">
              {new Date(endDate).toLocaleDateString()}
            </p>
          ) : (
            <div className="mb-1">{formatTimeLeft(remainingTime)}</div>
          )}
        </div>
        <button
          onClick={handleParticipate}
          disabled={status === "Past"}
          className={`
            px-2 py-2 text-xs rounded-md transition-colors flex items-center justify-center w-1/2 mx-auto
            ${
              status === "Past"
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-[#44924C] text-white hover:bg-[#367a3a]"
            }`}
        >
          {status === "Past" ? (
            "Completed"
          ) : (
            <>
              <img src={tick} alt="Tick" className="w-4 h-4 mr-2" />
              Participate Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HackathonCard;
