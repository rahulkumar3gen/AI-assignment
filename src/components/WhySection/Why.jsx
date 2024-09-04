import Card from "./Card";
import SkillsIcon from "../../assets/icons/Skills.svg";
import CommunityIcon from "../../assets/icons/Community.svg";
import RobotIcon from "../../assets/icons/Robot.svg";
import RecognitionIcon from "../../assets/icons/Recognition.svg";

const Why = () => {
  const cards = [
    {
      icon: SkillsIcon,
      title: "Prove your skills",
      description:
        "Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.",
    },
    {
      icon: CommunityIcon,
      title: "Learn from community",
      description:
        "One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.",
    },
    {
      icon: RobotIcon,
      title: "Challenge yourself",
      description:
        "There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.",
    },
    {
      icon: RecognitionIcon,
      title: "Earn Recognition",
      description:
        "You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-medium mb-8 text-center">
        <span className="text-black">Why Participate in</span>
        <span className="text-[#44924C]"> AI Challenges?</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Why;
