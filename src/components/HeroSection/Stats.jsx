import AiWhite from "../../assets/icons/AiWhite.svg";
import DataScientists from "../../assets/icons/DataScientists.svg";
import RobotWhite from "../../assets/icons/RobotWhite.svg";

const Stats = () => {
  return (
    <div className="bg-[#002A3B] py-8">
      <div className="container mx-auto max-sm:px-2 flex justify-center items-center">
        <StatItem icon={AiWhite} number="100K+" text="AI model submissions" />
        <Divider />
        <StatItem icon={DataScientists} number="50K+" text="Data Scientists" />
        <Divider />
        <StatItem icon={RobotWhite} number="100+" text="AI Challenges hosted" />
      </div>
    </div>
  );
};

const StatItem = ({ icon, number, text }) => (
  <div className="flex items-center text-white">
    <img
      src={icon}
      alt={text}
      className="w-8 h-8 mr-2 md:w-12 md:h-12 md:mr-4"
    />
    <div className="flex flex-col">
      <span className="text-lg md:text-2xl font-bold">{number}</span>
      <span className="text-xs md:text-sm">{text}</span>
    </div>
  </div>
);

const Divider = () => (
  <div className="h-12 w-px bg-white mx-4 md:h-16 md:mx-8" />
);

export default Stats;
