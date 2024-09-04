import HeroImage from "../../assets/icons/HeroImage.svg";
import { Link } from "react-router-dom";

const HeroContent = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0 relative pl-4">
        <div className="absolute -left-2 top-0 w-1 bg-[#FFCE5C] h-[4.5rem]"></div>
        <h1 className="text-4xl md:text-4xl font-medium mb-4 text-white">
          Accelerate Innovation
          <br />
          with Global AI Challenges
        </h1>
        <p className="text-lg mb-6 text-gray-300">
          AI Challenges at DPhi simulate real-world problems. It is a great
          place to put your AI/Data Science skills to test on diverse datasets
          allowing you to foster learning through competitions.
        </p>
        <Link
          to="/createChallenge"
          className="bg-white text-[#003145] font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Create Challenge
        </Link>
      </div>
      <div className="md:w-1/2">
        <img
          src={HeroImage}
          alt="Hero"
          className="w-full h-auto max-w-[80%] mx-auto"
        />
      </div>
    </div>
  );
};

export default HeroContent;
